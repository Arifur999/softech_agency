#!/usr/bin/env bash
# One-shot setup for softech.agency on this VPS. Safe to re-run.
#
# Installs two systemd timers, both of which do nothing in the common case:
#   softech-vhost   every 2 min — re-attaches the nginx vhost if a furnify
#                   deploy wiped it, which is what kept taking the site down
#   softech-deploy  every 2 min — pulls a new image when one is published,
#                   since GitHub's runners cannot reach this host over SSH
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
APP_DIR=/opt/softech-agency

ok()  { printf '\033[32m  ok\033[0m  %s\n' "$1"; }
die() { printf '\033[31m FAIL\033[0m  %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root"
[ -f "$APP_DIR/docker-compose.yml" ] || die "$APP_DIR/docker-compose.yml not found — run bootstrap.sh first"

printf '\n\033[1m1. Attaching the vhost\033[0m\n'
bash "$SRC/ensure-site.sh"

printf '\n\033[1m2. Release agent\033[0m\n'
if grep -q '^IMAGE=' "$APP_DIR/.env" 2>/dev/null; then
  sed -i 's|^IMAGE=.*|IMAGE=ghcr.io/arifur999/softech_agency:latest|' "$APP_DIR/.env"
else
  echo 'IMAGE=ghcr.io/arifur999/softech_agency:latest' >> "$APP_DIR/.env"
fi
ok "IMAGE pinned to :latest"

install -m 0755 "$SRC/agent/softech-deploy.sh" /usr/local/bin/softech-deploy
install -m 0755 "$SRC/ensure-site.sh"          /usr/local/bin/softech-vhost
mkdir -p /usr/local/lib/softech
cp -r "$SRC/nginx" /usr/local/lib/softech/
# softech-vhost resolves its config relative to its own path, so give it a copy
# that does not depend on the git clone still being there.
sed -i 's|^SRC="\$(cd "\$(dirname "\$0")" && pwd)"|SRC=/usr/local/lib/softech|' /usr/local/bin/softech-vhost
ok "installed /usr/local/bin/softech-deploy and softech-vhost"

for u in softech-deploy softech-vhost; do
  install -m 0644 "$SRC/agent/$u.service" /etc/systemd/system/
  install -m 0644 "$SRC/agent/$u.timer"   /etc/systemd/system/
done
systemctl daemon-reload
systemctl enable --now softech-deploy.timer softech-vhost.timer
ok "both timers enabled"

printf '\n\033[1m3. Status\033[0m\n'
systemctl list-timers 'softech-*' --no-pager | head -4
echo
curl -s -o /dev/null -w '  softech.agency -> %{http_code}\n' https://softech.agency/ || true
curl -s -o /dev/null -w '  furnify        -> %{http_code}\n' https://furnify.softech.agency/ || true
