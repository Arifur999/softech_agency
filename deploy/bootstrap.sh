#!/usr/bin/env bash
# Stage 1 — prepare the server. Touches NOTHING that serves traffic:
# no nginx config is read or written here, no existing container or service is
# stopped. Safe to run while furnify.softech.agency is live.
#
#   sudo bash bootstrap.sh
set -euo pipefail

APP_DIR=/opt/softech-agency
APP_PORT="${APP_PORT:-3100}"

ok()   { printf '\033[32m  ok\033[0m  %s\n' "$1"; }
info() { printf '\033[36m  ..\033[0m  %s\n' "$1"; }
die()  { printf '\033[31m FAIL\033[0m  %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root (sudo bash bootstrap.sh)"

printf '\n\033[1m1. Checking the port is free\033[0m\n'
if ss -ltn | grep -q ":${APP_PORT}\s"; then
  die "port ${APP_PORT} is already in use. Re-run with a different one:
       APP_PORT=3200 sudo -E bash bootstrap.sh"
fi
ok "port ${APP_PORT} is free"

printf '\n\033[1m2. Docker\033[0m\n'
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  ok "already installed — $(docker --version)"
else
  info "installing Docker Engine from Docker's official apt repository"
  info "this adds packages only; it does not touch nginx or any running site"
  apt-get update -qq
  apt-get install -y -qq ca-certificates curl gnupg
  install -m 0755 -d /etc/apt/keyrings
  if [ ! -f /etc/apt/keyrings/docker.asc ]; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
      -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc
  fi
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -qq
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io \
    docker-buildx-plugin docker-compose-plugin
  systemctl enable --now docker
  ok "installed — $(docker --version)"
fi

printf '\n\033[1m3. Application directory\033[0m\n'
mkdir -p "$APP_DIR"
ok "$APP_DIR"

if [ ! -f "$APP_DIR/.env" ]; then
  cat > "$APP_DIR/.env" <<EOF
# Rewritten by the deploy workflow on every release.
IMAGE=ghcr.io/arifur999/softech_agency:latest
APP_PORT=${APP_PORT}
EOF
  ok "wrote .env (APP_PORT=${APP_PORT})"
else
  ok ".env already exists — left as is"
fi

printf '\n\033[1m4. Webroot for TLS renewals\033[0m\n'
mkdir -p /var/www/certbot
ok "/var/www/certbot"

printf '\n\033[1m5. Confirming nothing else changed\033[0m\n'
info "nginx service: $(systemctl is-active nginx 2>/dev/null || echo 'not running / not installed')"
info "containers now running:"
docker ps --format '     {{.Names}}  {{.Image}}  {{.Status}}' || true

cat <<EOF

$(printf '\033[1mStage 1 done.\033[0m') Nothing serving traffic was modified.

Next:
  1. Copy docker-compose.yml to ${APP_DIR}/
  2. Push to main so GitHub Actions builds and pushes the first image
  3. Run setup-nginx.sh to add the softech.agency server block and get TLS
EOF
