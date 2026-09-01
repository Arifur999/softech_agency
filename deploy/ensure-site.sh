#!/usr/bin/env bash
# Keeps softech.agency attached to the nginx container that serves furnify.
#
# WHY THIS EXISTS, AND WHY IT IS NOT attach-site.sh:
#   attach-site.sh appended to /srv/hatim/hatim_Backend/nginx.conf. That file
#   is owned and rewritten by the furnify deploy (observed: rewritten by user
#   `deploy` at 14:03, wiping the blocks added at 12:19), so anything appended
#   there survives only until the next furnify release.
#
#   This installs the config as its OWN file instead, mounted into the nginx
#   container at /etc/nginx/conf.d/softech.agency.conf. nginx's default
#   `include /etc/nginx/conf.d/*.conf` picks it up, and a furnify deploy
#   rewriting nginx.conf cannot touch it.
#
# Idempotent: safe to run repeatedly, and safe to run from a timer.
set -euo pipefail

DOMAIN=softech.agency
STACK=/srv/hatim/hatim_Backend
NGINX_CTR=hatim_backend-nginx-1
OUR_DIR=/opt/softech-agency/nginx
OUR_CONF="$OUR_DIR/${DOMAIN}.conf"
TARGET="/etc/nginx/conf.d/${DOMAIN}.conf"
SRC="$(cd "$(dirname "$0")" && pwd)"

ok()   { printf '\033[32m  ok\033[0m  %s\n' "$1"; }
info() { printf '\033[36m  ..\033[0m  %s\n' "$1"; }
die()  { printf '\033[31m FAIL\033[0m  %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root"
docker inspect "$NGINX_CTR" >/dev/null 2>&1 || die "container $NGINX_CTR not found"

printf '\n\033[1m1. Baseline\033[0m\n'
BEFORE=$(curl -sS -o /dev/null -w '%{http_code}' https://furnify.softech.agency/ 2>/dev/null || true)
info "furnify.softech.agency -> $BEFORE"
[ "$BEFORE" = "200" ] || die "furnify is not healthy right now — not touching anything"

printf '\n\033[1m2. Installing our config in our own directory\033[0m\n'
mkdir -p "$OUR_DIR"
cat "$SRC/nginx/${DOMAIN}.container.conf" > "$OUR_CONF"
ok "$OUR_CONF"

printf '\n\033[1m3. Making sure the nginx container mounts it\033[0m\n'
if docker exec "$NGINX_CTR" test -f "$TARGET" 2>/dev/null; then
  ok "already mounted"
else
  info "not mounted yet — adding the bind to the hatim compose file"

  COMPOSE="$STACK/docker-compose.yml"
  [ -f "$COMPOSE" ] || die "$COMPOSE not found"

  if grep -qF "$OUR_CONF" "$COMPOSE"; then
    info "the compose file already declares it; the container just needs recreating"
  else
    cp "$COMPOSE" "$COMPOSE.bak-$(date +%Y%m%d-%H%M%S)"
    # Insert directly after nginx's own conf mount, so it lands inside the
    # nginx service's volumes list and nowhere else.
    python3 - "$COMPOSE" "$OUR_CONF" "$TARGET" <<'PY'
import sys, re
path, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(path).read()
anchor = "- ./nginx.conf:/etc/nginx/conf.d/default.conf:ro"
if anchor not in text:
    sys.exit("anchor volume line not found in compose file")
indent = re.search(r"^(\s*)" + re.escape(anchor), text, re.M).group(1)
text = text.replace(anchor, f"{anchor}\n{indent}- {src}:{dst}:ro", 1)
open(path, "w").write(text)
print("  added the bind mount")
PY
  fi

  info "recreating only the nginx service (furnify's backend is untouched)"
  ( cd "$STACK" && docker compose up -d nginx )
  sleep 4
fi

printf '\n\033[1m4. Validating\033[0m\n'
docker exec "$NGINX_CTR" test -f "$TARGET" || die "the container still does not see $TARGET"
if ! docker exec "$NGINX_CTR" nginx -t 2>&1; then
  die "nginx -t failed — check $OUR_CONF"
fi
docker exec "$NGINX_CTR" nginx -s reload
ok "reloaded gracefully"

printf '\n\033[1m5. Result\033[0m\n'
sleep 2
AFTER=$(curl -sS -o /dev/null -w '%{http_code}' https://furnify.softech.agency/ 2>/dev/null || true)
SELF=$(curl -sS -o /dev/null -w '%{http_code}' "https://$DOMAIN/" 2>/dev/null || true)
info "furnify.softech.agency -> $AFTER  (was $BEFORE)"
info "$DOMAIN -> $SELF"

[ "$AFTER" = "$BEFORE" ] || die "furnify changed — restore with the compose .bak beside it"
ok "furnify unaffected"
[ "$SELF" = "200" ] && ok "$DOMAIN is live" || info "expected 200; check: docker logs $NGINX_CTR --tail 30"
