#!/usr/bin/env bash
# Stage 2 — add the softech.agency server block and issue its certificate.
#
# Only ever ADDS files named softech.agency. Existing configs (including
# whatever serves furnify.softech.agency) are backed up and never edited. If
# `nginx -t` fails at any point the change is reverted and nginx is left on
# the config it already had.
#
#   sudo bash setup-nginx.sh you@example.com
set -euo pipefail

EMAIL="${1:-}"
DOMAIN=softech.agency
WWW=www.softech.agency
APP_PORT="${APP_PORT:-3100}"
SITE=/etc/nginx/sites-available/${DOMAIN}
LINK=/etc/nginx/sites-enabled/${DOMAIN}
BACKUP=/root/nginx-backup-$(date +%Y%m%d-%H%M%S).tar.gz

ok()   { printf '\033[32m  ok\033[0m  %s\n' "$1"; }
info() { printf '\033[36m  ..\033[0m  %s\n' "$1"; }
die()  { printf '\033[31m FAIL\033[0m  %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root"
[ -n "$EMAIL" ] || die "usage: sudo bash setup-nginx.sh you@example.com"
command -v nginx >/dev/null 2>&1 || die "nginx is not installed on the host.
  Your furnify site may be served by a container instead — send me the output
  of inspect-server.sh and I will adjust this script."

printf '\n\033[1m1. Backing up the whole nginx config\033[0m\n'
tar czf "$BACKUP" /etc/nginx 2>/dev/null || true
ok "$BACKUP"

printf '\n\033[1m2. Recording what currently works\033[0m\n'
BEFORE=$(curl -sS -o /dev/null -w '%{http_code}' https://furnify.softech.agency/ || echo 000)
info "furnify.softech.agency -> $BEFORE"
[ -e "$SITE" ] && die "$SITE already exists — remove or rename it first"

printf '\n\033[1m3. Temporary HTTP block so certbot can verify\033[0m\n'
cat > "$SITE" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${WWW};
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 404; }
}
EOF
ln -sfn "$SITE" "$LINK"

if ! nginx -t 2>/dev/null; then
  rm -f "$LINK" "$SITE"
  nginx -t && systemctl reload nginx
  die "config test failed — reverted, nothing changed"
fi
systemctl reload nginx
ok "nginx reloaded (existing sites untouched)"

printf '\n\033[1m4. Certificate\033[0m\n'
if [ -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
  ok "certificate already present"
else
  command -v certbot >/dev/null 2>&1 || { apt-get update -qq && apt-get install -y -qq certbot; }
  mkdir -p /var/www/certbot
  # --cert-name keeps this separate from any existing certificate.
  certbot certonly --webroot -w /var/www/certbot \
    -d "${DOMAIN}" -d "${WWW}" \
    --cert-name "${DOMAIN}" \
    --email "${EMAIL}" --agree-tos --no-eff-email --non-interactive \
    || die "certbot failed — check that ${DOMAIN} and ${WWW} both point to this server"
  ok "certificate issued"
fi

[ -f /etc/letsencrypt/options-ssl-nginx.conf ] || \
  curl -fsSL https://raw.githubusercontent.com/certbot/certbot/main/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
    -o /etc/letsencrypt/options-ssl-nginx.conf
[ -f /etc/letsencrypt/ssl-dhparams.pem ] || \
  openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048

printf '\n\033[1m5. Installing the real config\033[0m\n'
cp "$SITE" "${SITE}.http-only.bak"
cp "$(dirname "$0")/nginx/${DOMAIN}.conf" "$SITE"
sed -i "s|server 127.0.0.1:3100;|server 127.0.0.1:${APP_PORT};|" "$SITE"

if ! nginx -t 2>/dev/null; then
  cp "${SITE}.http-only.bak" "$SITE"
  nginx -t && systemctl reload nginx
  die "config test failed — reverted to the HTTP-only block"
fi
systemctl reload nginx
ok "nginx reloaded"

printf '\n\033[1m6. Verifying\033[0m\n'
sleep 2
SELF=$(curl -sS -o /dev/null -w '%{http_code}' "https://${DOMAIN}/" || echo 000)
AFTER=$(curl -sS -o /dev/null -w '%{http_code}' https://furnify.softech.agency/ || echo 000)
info "${DOMAIN} -> $SELF   (502 just means the container is not running yet)"
info "furnify.softech.agency -> $AFTER  (was $BEFORE)"

if [ "$BEFORE" != "$AFTER" ] && [ "$BEFORE" != "000" ]; then
  die "furnify changed status. Restore with:
       tar xzf $BACKUP -C / && nginx -t && systemctl reload nginx"
fi
ok "furnify.softech.agency unaffected"

cat <<EOF

$(printf '\033[1mDone.\033[0m') Rollback if ever needed:
  tar xzf $BACKUP -C / && nginx -t && systemctl reload nginx
EOF
