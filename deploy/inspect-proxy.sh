#!/usr/bin/env bash
# Read-only. Identifies the dockerised reverse proxy holding :80/:443 so the
# new site can be attached the same way furnify already is. Changes nothing.
set -uo pipefail

line() { printf '\n\033[1m== %s\033[0m\n' "$1"; }

line "All containers"
docker ps -a --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'

line "Which container publishes :80 / :443"
PROXY=$(docker ps --format '{{.Names}}\t{{.Ports}}' | grep -E ':(80|443)->' | awk '{print $1}' | head -1)
if [ -n "$PROXY" ]; then
  echo "  -> $PROXY"
  echo "  image: $(docker inspect -f '{{.Config.Image}}' "$PROXY")"
else
  echo "  could not match by published ports; listing all images instead:"
  docker ps --format '  {{.Names}}  {{.Image}}'
fi

line "Proxy volumes (where its config lives)"
if [ -n "$PROXY" ]; then
  docker inspect -f '{{range .Mounts}}  {{.Type}}  {{.Source}} -> {{.Destination}}{{"\n"}}{{end}}' "$PROXY"
  echo "  --- command ---"
  docker inspect -f '  {{join .Config.Cmd " "}}' "$PROXY"; echo
  echo "  --- env (proxy-related only) ---"
  docker inspect -f '{{range .Config.Env}}  {{.}}{{"\n"}}{{end}}' "$PROXY" \
    | grep -iE 'acme|email|domain|traefik|npm|caddy|le_|db_|admin' | head -20
fi

line "Networks"
docker network ls
if [ -n "$PROXY" ]; then
  echo "  proxy is attached to:"
  docker inspect -f '{{range $k,$v := .NetworkSettings.Networks}}    {{$k}}{{"\n"}}{{end}}' "$PROXY"
fi

line "Proxy type detection"
IMG=$(docker ps --format '{{.Image}}' | tr '[:upper:]' '[:lower:]')
echo "$IMG" | grep -q 'traefik'                  && echo "  TRAEFIK detected — we attach via container labels"
echo "$IMG" | grep -qE 'nginx-proxy-manager|jc21' && echo "  NGINX PROXY MANAGER detected — add a Proxy Host in its UI (:81)"
echo "$IMG" | grep -q 'caddy'                    && echo "  CADDY detected — add a block to the Caddyfile"
echo "$IMG" | grep -qE 'nginxproxy/nginx-proxy'  && echo "  NGINX-PROXY (jwilder) detected — we set VIRTUAL_HOST env"
echo "$IMG" | grep -qE 'coolify|dokploy|caprover' && echo "  A PaaS is managing this box — deploy through its UI"
echo "$IMG" | grep -qE '^nginx:|/nginx:'         && echo "  PLAIN NGINX container — we add a conf file to its mounted volume"

line "Traefik labels already in use (if any)"
docker ps -q | while read -r c; do
  L=$(docker inspect -f '{{range $k,$v := .Config.Labels}}{{if or (hasPrefix $k "traefik") (hasPrefix $k "virtual")}}    {{$k}}={{$v}}{{"\n"}}{{end}}{{end}}' "$c" 2>/dev/null)
  [ -n "$L" ] && { echo "  $(docker inspect -f '{{.Name}}' "$c"):"; echo "$L"; }
done

line "Which container serves furnify"
docker ps --format '{{.Names}}' | while read -r c; do
  if docker inspect "$c" 2>/dev/null | grep -qi 'furnify'; then echo "  $c"; fi
done

line "Compose / config files on disk"
for d in /root /opt /srv /home /var/www; do
  find "$d" -maxdepth 3 \( -name 'docker-compose*.y*ml' -o -name 'compose.y*ml' -o -name 'Caddyfile' \) \
    2>/dev/null | head -20
done

printf '\n\033[1mDone — nothing was modified.\033[0m\n'
