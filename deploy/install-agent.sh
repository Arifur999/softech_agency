#!/usr/bin/env bash
# Installs the pull-based release agent. Run once, as root.
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
APP_DIR=/opt/softech-agency

ok() { printf '\033[32m  ok\033[0m  %s\n' "$1"; }
die() { printf '\033[31m FAIL\033[0m  %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root"
[ -f "$APP_DIR/docker-compose.yml" ] || die "$APP_DIR/docker-compose.yml not found"

# The agent tracks :latest, so .env must point at the moving tag.
if grep -q '^IMAGE=' "$APP_DIR/.env" 2>/dev/null; then
  sed -i 's|^IMAGE=.*|IMAGE=ghcr.io/arifur999/softech_agency:latest|' "$APP_DIR/.env"
else
  echo 'IMAGE=ghcr.io/arifur999/softech_agency:latest' >> "$APP_DIR/.env"
fi
ok "IMAGE pinned to :latest"

install -m 0755 "$SRC/agent/softech-deploy.sh" /usr/local/bin/softech-deploy
install -m 0644 "$SRC/agent/softech-deploy.service" /etc/systemd/system/
install -m 0644 "$SRC/agent/softech-deploy.timer" /etc/systemd/system/
ok "installed the unit and timer"

systemctl daemon-reload
systemctl enable --now softech-deploy.timer
ok "timer enabled"

echo
systemctl list-timers softech-deploy.timer --no-pager | head -3
echo
echo "Running once now:"
systemctl start softech-deploy.service || true
journalctl -u softech-deploy.service -n 15 --no-pager | sed 's/^/  /'
