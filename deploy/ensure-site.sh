#!/usr/bin/env bash
# Keeps softech.agency attached to the nginx container that serves furnify.
#
# WHY THIS KEEPS COMING UNDONE:
#   /srv/hatim/hatim_Backend/ belongs to the furnify deploy. Its nginx.conf is
#   rewritten on every furnify release (observed: replaced by user `deploy` at
#   14:03, wiping blocks added at 12:19), and its docker-compose.yml can be too.
#   So the vhost is installed as OUR OWN file and re-checked on a timer rather
#   than trusted to stay put.
#
# Idempotent and cheap: the common case is a single `docker exec test -f` and
# an exit. Nothing is restarted unless the vhost has actually gone missing.
#
#   bash ensure-site.sh            verbose, for running by hand
#   bash ensure-site.sh --quiet    silent unless it had to repair something
set -euo pipefail

QUIET=0
[ "${1:-}" = "--quiet" ] && QUIET=1

DOMAIN=softech.agency
STACK=/srv/hatim/hatim_Backend
COMPOSE="$STACK/docker-compose.yml"
NGINX_CTR=hatim_backend-nginx-1
OUR_DIR=/opt/softech-agency/nginx
OUR_CONF="$OUR_DIR/${DOMAIN}.conf"
TARGET="/etc/nginx/conf.d/${DOMAIN}.conf"
SRC="$(cd "$(dirname "$0")" && pwd)"

say()  { [ "$QUIET" = 1 ] || printf '\033[36m  ..\033[0m  %s\n' "$1"; }
ok()   { [ "$QUIET" = 1 ] || printf '\033[32m  ok\033[0m  %s\n' "$1"; }
loud() { printf '%s\n' "$1"; }
die()  { printf '\033[31m FAIL\033[0m  %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root"
docker inspect "$NGINX_CTR" >/dev/null 2>&1 || die "container $NGINX_CTR not found"

# ---------------------------------------------------------------------------
# Fast path: already attached and serving our own certificate.
# ---------------------------------------------------------------------------
if docker exec "$NGINX_CTR" test -f "$TARGET" 2>/dev/null; then
  SERVED=$(echo | timeout 10 openssl s_client -connect 127.0.0.1:443 \
    -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -subject 2>/dev/null || true)
  case "$SERVED" in
    *"$DOMAIN"*) ok "already attached and serving the right certificate"; exit 0 ;;
  esac
  say "config is mounted but nginx is not using it — reloading"
  docker exec "$NGINX_CTR" nginx -t >/dev/null 2>&1 && docker exec "$NGINX_CTR" nginx -s reload
  ok "reloaded"
  exit 0
fi

# ---------------------------------------------------------------------------
# Repair.
# ---------------------------------------------------------------------------
loud "softech.agency vhost is missing from $NGINX_CTR — repairing"

BEFORE=$(curl -sS -o /dev/null -w '%{http_code}' https://furnify.softech.agency/ 2>/dev/null || true)
[ "$BEFORE" = "200" ] || die "furnify is not healthy right now ($BEFORE) — not touching anything"

mkdir -p "$OUR_DIR"
cat "$SRC/nginx/${DOMAIN}.container.conf" > "$OUR_CONF"
ok "wrote $OUR_CONF"

[ -f "$COMPOSE" ] || die "$COMPOSE not found"

if grep -qF "$OUR_CONF" "$COMPOSE"; then
  say "compose already declares the mount; the container just needs recreating"
else
  cp "$COMPOSE" "$COMPOSE.bak-$(date +%Y%m%d-%H%M%S)"
  python3 - "$COMPOSE" "$OUR_CONF" "$TARGET" <<'PY'
import re, sys
path, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(path).read()
anchor = "- ./nginx.conf:/etc/nginx/conf.d/default.conf:ro"
if anchor not in text:
    sys.exit("anchor volume line not found in the compose file")
indent = re.search(r"^(\s*)" + re.escape(anchor), text, re.M).group(1)
open(path, "w").write(text.replace(anchor, f"{anchor}\n{indent}- {src}:{dst}:ro", 1))
print("  added the bind mount to the nginx service")
PY
fi

say "recreating only the nginx service"
( cd "$STACK" && docker compose up -d nginx )
sleep 4

docker exec "$NGINX_CTR" test -f "$TARGET" || die "container still cannot see $TARGET"
docker exec "$NGINX_CTR" nginx -t >/dev/null 2>&1 || die "nginx -t failed — check $OUR_CONF"
docker exec "$NGINX_CTR" nginx -s reload
ok "reloaded"

sleep 2
AFTER=$(curl -sS -o /dev/null -w '%{http_code}' https://furnify.softech.agency/ 2>/dev/null || true)
SELF=$(curl -sS -o /dev/null -w '%{http_code}' "https://$DOMAIN/" 2>/dev/null || true)
[ "$AFTER" = "$BEFORE" ] || die "furnify changed ($BEFORE -> $AFTER) — restore from $COMPOSE.bak-*"

loud "repaired: $DOMAIN -> ${SELF:-no response}, furnify -> $AFTER"
