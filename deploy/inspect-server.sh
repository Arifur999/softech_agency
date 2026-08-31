#!/usr/bin/env bash
# Read-only survey of the VPS. Changes nothing — run this first so we know
# exactly what furnify.softech.agency is using before adding anything.
set -uo pipefail

line() { printf '\n\033[1m== %s\033[0m\n' "$1"; }

line "OS / resources"
. /etc/os-release 2>/dev/null && echo "$PRETTY_NAME"
echo "RAM: $(free -h | awk '/Mem:/ {print $2" total, "$7" available"}')"
echo "Disk: $(df -h / | awk 'NR==2 {print $4" free of "$2}')"

line "Docker"
if command -v docker >/dev/null 2>&1; then
  docker --version
  docker compose version 2>/dev/null || echo "compose plugin: MISSING"
  echo "--- running containers ---"
  docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
else
  echo "docker: NOT INSTALLED"
fi

line "Nginx"
if command -v nginx >/dev/null 2>&1; then
  nginx -v 2>&1
  echo "host nginx service: $(systemctl is-active nginx 2>/dev/null || echo inactive)"
  echo "--- enabled sites ---"
  ls -l /etc/nginx/sites-enabled/ 2>/dev/null || echo "(no sites-enabled dir)"
  echo "--- server_name / listen directives found ---"
  grep -rhE '^\s*(server_name|listen)' /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null \
    | sed 's/^\s*/  /' | sort -u
  echo "--- is anything a default_server? ---"
  grep -rn 'default_server' /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null || echo "  none"
else
  echo "host nginx: NOT INSTALLED"
  echo "(if a container is publishing :80/:443 below, nginx is dockerised)"
fi

line "What holds :80 and :443"
ss -ltnp 2>/dev/null | grep -E ':(80|443)\s' || echo "  nothing listening"

line "Is our intended app port free?"
for p in 3000 3100; do
  if ss -ltn 2>/dev/null | grep -q ":$p\s"; then
    echo "  $p: IN USE"
  else
    echo "  $p: free"
  fi
done

line "TLS certificates"
if command -v certbot >/dev/null 2>&1; then
  certbot certificates 2>/dev/null | grep -E 'Certificate Name|Domains|Expiry' || echo "  none"
else
  echo "certbot: NOT INSTALLED"
  ls -1 /etc/letsencrypt/live 2>/dev/null || echo "  no /etc/letsencrypt/live"
fi

line "DNS as this server sees it"
for h in softech.agency www.softech.agency furnify.softech.agency; do
  printf '  %-28s %s\n' "$h" "$(getent hosts "$h" | awk '{print $1}' | paste -sd, - || echo 'no record')"
done

line "Firewall"
ufw status 2>/dev/null || echo "ufw: not installed / not active"

printf '\n\033[1mDone — nothing was modified.\033[0m\n'
