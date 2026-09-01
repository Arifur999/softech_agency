#!/usr/bin/env bash
# Attaches softech.agency to the nginx container that already serves furnify.
#
# Safety model, because furnify is live on the same nginx:
#   * nginx.conf is copied to a timestamped backup before any edit
#   * only ever APPENDS; nothing above the marker is read or rewritten
#   * every change is validated with `nginx -t` INSIDE the container, and the
#     backup is restored if it fails — the bad config is never loaded
#   * reloads use `nginx -s reload`, which is graceful: furnify does not drop
#     a single in-flight request, and the container is never restarted
#   * furnify's HTTP status is recorded before and after, and the script fails
#     loudly if it changed
#
#   bash attach-site.sh you@example.com
set -euo pipefail

EMAIL="${1:-}"
DOMAIN=softech.agency
WWW=www.softech.agency
STACK=/srv/hatim/hatim_Backend
CONF="$STACK/nginx.conf"
NGINX_CTR=hatim_backend-nginx-1
MARKER="# >>> softech.agency (managed by attach-site.sh) >>>"
SRC="$(cd "$(dirname "$0")" && pwd)"
STAMP=$(date +%Y%m%d-%H%M%S)
BACKUP="$STACK/nginx.conf.bak-$STAMP"

ok()   { printf '\033[32m  ok\033[0m  %s\n' "$1"; }
info() { printf '\033[36m  ..\033[0m  %s\n' "$1"; }
die()  { printf '\033[31m FAIL\033[0m  %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root"
[ -n "$EMAIL" ] || die "usage: bash attach-site.sh you@example.com"
[ -f "$CONF" ] || die "$CONF not found"
docker inspect "$NGINX_CTR" >/dev/null 2>&1 || die "container $NGINX_CTR not found"

restore() {
  cp "$BACKUP" "$CONF"
  docker exec "$NGINX_CTR" nginx -t >/dev/null 2>&1 \
    && docker exec "$NGINX_CTR" nginx -s reload >/dev/null 2>&1 || true
}

printf '\n\033[1m1. Backup and baseline\033[0m\n'
cp "$CONF" "$BACKUP"
ok "$BACKUP"
BEFORE=$(curl -sS -o /dev/null -w '%{http_code}' https://furnify.softech.agency/ 2>/dev/null || true)
info "furnify.softech.agency -> $BEFORE"
[ "$BEFORE" = "000" ] && die "furnify is not answering already — fix that first"

if grep -qF "$MARKER" "$CONF"; then
  die "$CONF already contains the softech.agency block.
  Remove it (everything from '$MARKER' down) and re-run, or skip to step 4."
fi

printf '\n\033[1m2. Claiming :80 so the ACME challenge can be answered\033[0m\n'
info "the existing 'listen 80 default_server' returns 444, which would kill it"
{ printf '\n%s\n' "$MARKER"; cat "$SRC/nginx/${DOMAIN}.acme.conf"; } >> "$CONF"

if ! docker exec "$NGINX_CTR" nginx -t 2>&1 | tail -2; then
  restore
  die "nginx -t rejected the ACME block — restored, nothing was loaded"
fi
docker exec "$NGINX_CTR" nginx -s reload
ok "reloaded gracefully (furnify untouched)"

printf '\n\033[1m3. Certificate\033[0m\n'
if docker exec "$NGINX_CTR" test -d "/etc/letsencrypt/live/$DOMAIN" 2>/dev/null; then
  ok "certificate already exists"
else
  info "requesting via the certbot service in the hatim compose project"
  ( cd "$STACK" && docker compose run --rm certbot certonly \
      --webroot -w /var/www/certbot \
      -d "$DOMAIN" -d "$WWW" \
      --email "$EMAIL" --agree-tos --no-eff-email --non-interactive ) \
    || { restore; die "certbot failed — config restored. Check that $DOMAIN and $WWW resolve here."; }
  ok "certificate issued"
fi

printf '\n\033[1m4. Installing the real config\033[0m\n'
# Drop the ACME-only block, append the full one.
sed -i "/$(printf '%s' "$MARKER" | sed 's/[][\.*^$/]/\\&/g')/,\$d" "$CONF"
{ printf '\n%s\n' "$MARKER"; cat "$SRC/nginx/${DOMAIN}.container.conf"; } >> "$CONF"

# Full output, not tail -2: "conflicting server name" arrives as a warning, and
# hiding it made a duplicated block look like a clean apply.
if ! docker exec "$NGINX_CTR" nginx -t 2>&1; then
  restore
  die "nginx -t rejected the full config — restored, nothing was loaded"
fi
docker exec "$NGINX_CTR" nginx -s reload
ok "reloaded gracefully"

printf '\n\033[1m5. Verifying\033[0m\n'
sleep 2
AFTER=$(curl -sS -o /dev/null -w '%{http_code}' https://furnify.softech.agency/ 2>/dev/null || true)
SELF=$(curl -sS -o /dev/null -w '%{http_code}' "https://$DOMAIN/" 2>/dev/null || true)
info "furnify.softech.agency -> $AFTER  (was $BEFORE)"
info "$DOMAIN -> $SELF"

if [ "$AFTER" != "$BEFORE" ]; then
  restore
  die "furnify changed status — config restored and reloaded"
fi
ok "furnify unaffected"

case "$SELF" in
  200) ok "$DOMAIN is live" ;;
  502) info "502 is expected until the site container is running — deploy from GitHub Actions next" ;;
  *)   info "unexpected status $SELF; check: docker logs $NGINX_CTR --tail 30" ;;
esac

cat <<EOF

$(printf '\033[1mDone.\033[0m') Undo at any time:
  cp $BACKUP $CONF
  docker exec $NGINX_CTR nginx -t && docker exec $NGINX_CTR nginx -s reload
EOF
