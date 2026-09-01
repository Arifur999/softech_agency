#!/usr/bin/env bash
# Stage 1 — prepare the server. Touches NOTHING that serves traffic:
# no nginx config is read or written here, no existing container or service is
# stopped. Safe to run while furnify.softech.agency is live.
#
#   sudo bash bootstrap.sh
set -euo pipefail

APP_DIR=/opt/softech-agency
PROXY_NET=hatim_backend_default

ok()   { printf '\033[32m  ok\033[0m  %s\n' "$1"; }
info() { printf '\033[36m  ..\033[0m  %s\n' "$1"; }
die()  { printf '\033[31m FAIL\033[0m  %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root (sudo bash bootstrap.sh)"

printf '\n\033[1m1. Ports\033[0m\n'
info "nothing to reserve — the compose file publishes no host port at all"
info "nginx reaches the container by name over ${PROXY_NET}"

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
# IMAGE is rewritten by the deploy workflow on every release.
IMAGE=ghcr.io/arifur999/softech_agency:latest
EOF
  ok "wrote .env"
else
  ok ".env already exists — left as is"
fi

printf '\n\033[1m4. Proxy network\033[0m\n'
if docker network inspect "$PROXY_NET" >/dev/null 2>&1; then
  ok "${PROXY_NET} exists — the compose file joins it as external"
else
  die "network ${PROXY_NET} not found. It belongs to the hatim stack; start
       that first, or update the networks block in docker-compose.yml."
fi
# The TLS webroot is a docker volume owned by the hatim stack, not a host path,
# so there is nothing to create here.

printf '\n\033[1m5. Confirming nothing else changed\033[0m\n'
info "nginx service: $(systemctl is-active nginx 2>/dev/null || echo 'not running / not installed')"
info "containers now running:"
docker ps --format '     {{.Names}}  {{.Image}}  {{.Status}}' || true

cat <<EOF

$(printf '\033[1mStage 1 done.\033[0m') Nothing serving traffic was modified.

Next:
  1. cp docker-compose.yml ${APP_DIR}/
  2. Add the GitHub secrets, then push to main so Actions builds the first image
  3. bash attach-site.sh you@example.com   — adds the nginx blocks and gets TLS
EOF
