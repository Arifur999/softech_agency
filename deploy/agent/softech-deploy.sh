#!/usr/bin/env bash
# Pull-based release. Runs on the VPS from a systemd timer.
#
# GitHub's runners cannot reach this host on port 22 — every attempt times out,
# while the same port answers fine from the open internet — so the release
# cannot be pushed in. The VPS polls the registry instead, which also means no
# SSH key has to live in GitHub at all.
#
# Does nothing unless the image digest actually changed.
set -euo pipefail

APP_DIR=/opt/softech-agency
IMAGE=ghcr.io/arifur999/softech_agency:latest
CONTAINER=softech-agency

log() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$1"; }

cd "$APP_DIR"

BEFORE=$(docker image inspect --format '{{.Id}}' "$IMAGE" 2>/dev/null || echo none)

if ! docker pull -q "$IMAGE" >/dev/null 2>&1; then
  log "pull failed (registry unreachable?) — leaving the running version alone"
  exit 0
fi

AFTER=$(docker image inspect --format '{{.Id}}' "$IMAGE")

if [ "$BEFORE" = "$AFTER" ]; then
  exit 0
fi

log "new image: ${AFTER:7:12} (was ${BEFORE:7:12})"
docker compose up -d --remove-orphans web

for i in $(seq 1 30); do
  STATE=$(docker inspect -f '{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo starting)
  if [ "$STATE" = "healthy" ]; then
    log "healthy — release complete"
    docker image prune -f --filter "until=168h" >/dev/null 2>&1 || true
    exit 0
  fi
  sleep 10
done

log "ERROR: never became healthy, rolling back to ${BEFORE:7:12}"
if [ "$BEFORE" != "none" ]; then
  docker tag "$BEFORE" "$IMAGE"
  docker compose up -d web
fi
docker compose logs --tail=60 web
exit 1
