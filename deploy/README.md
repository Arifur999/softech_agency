# Deploying softech.agency

Target: `softech.agency` + `www.softech.agency` on the Hostinger VPS
(Ubuntu 24.04, `187.127.124.251`).

`furnify.softech.agency` already runs on this server and **must keep running**.
Everything here is additive: a container bound to `127.0.0.1`, and one new
nginx file named `softech.agency`. No existing config is edited.

---

## Do not use hPanel → Docker Manager → Install

Install Docker over SSH instead (`bootstrap.sh` does it, from Docker's official
apt repo). Panel-driven installs on Hostinger can be tied to OS/template
actions, and an OS re-template wipes the server. The apt install is a plain
package install: it adds `dockerd`, the `docker0` bridge and Docker's own
iptables chains. It does not read or write nginx config and does not stop
anything that is running.

The one real interaction to know about: Docker inserts its own iptables rules,
which can make published container ports bypass `ufw`. This setup publishes to
`127.0.0.1` only, so nothing new is reachable from the internet.

Take a snapshot from hPanel first anyway (Snapshots & backups) — a minute of
work for a free undo.

---

## Order of operations

### 1. Survey the server (changes nothing)

From the VPS (the Hostinger browser console works fine — there is no scp there):

```bash
apt-get update -qq && apt-get install -y -qq git
git clone https://github.com/Arifur999/softech_agency.git /root/softech-src
bash /root/softech-src/deploy/inspect-server.sh
```

Read the output before continuing. What matters:

- **What holds :80 and :443** — a host `nginx` process, or a container. These
  instructions assume host nginx; if it is a container, stop and say so.
- **Enabled sites** — confirm a `furnify` config exists and note its filename.
- **`default_server`** — if some other block is the default, ours still will
  not shadow it, because ours names its hosts explicitly.
- **Port 3100** — must be free. If not, pick another and pass `APP_PORT`.

### 2. DNS

Point both records at the VPS, then wait for them to resolve:

| Type | Name  | Value             |
| ---- | ----- | ----------------- |
| A    | `@`   | `187.127.124.251` |
| A    | `www` | `187.127.124.251` |

Leave the existing `furnify` record alone. Verify:

```bash
dig +short softech.agency www.softech.agency
```

Certbot fails if these do not resolve yet, so do this before step 4.

### 3. Prepare the server

```bash
cd /root/softech-src/deploy
bash bootstrap.sh                     # APP_PORT=3200 bash bootstrap.sh if 3100 was taken
cp docker-compose.yml /opt/softech-agency/
```

Installs Docker if absent, creates `/opt/softech-agency` and its `.env`.
It touches no web server config.

### 4. GitHub secrets

Repo → Settings → Secrets and variables → Actions:

| Secret         | Value                                                       |
| -------------- | ----------------------------------------------------------- |
| `VPS_HOST`     | `187.127.124.251`                                           |
| `VPS_USER`     | `root`                                                      |
| `VPS_SSH_KEY`  | Private key whose public half is in the VPS `authorized_keys` |
| `GHCR_TOKEN`   | GitHub PAT (classic) with `read:packages`                    |

Generate a deploy-only key rather than reusing a personal one:

```bash
ssh-keygen -t ed25519 -C "github-actions-softech" -f ~/.ssh/softech_deploy -N ""
ssh-copy-id -i ~/.ssh/softech_deploy.pub root@187.127.124.251
cat ~/.ssh/softech_deploy          # paste all of this into VPS_SSH_KEY
```

Also create the `production` environment (Settings → Environments) if you want
a manual approval gate before each release.

### 5. First image

Push to `main`. CI runs lint → typecheck → build; only if all three pass does
the image get built and pushed to GHCR. The deploy step will fail at this
point because nginx is not configured yet — that is expected.

Make the package readable by the VPS: GitHub → Packages → `softech_agency` →
Package settings → change visibility to **public**, or keep it private and rely
on `GHCR_TOKEN`.

### 6. nginx + TLS

```bash
cd /root/softech-src && git pull
bash deploy/setup-nginx.sh you@example.com
```

The script tars `/etc/nginx` to `/root/` first, records furnify's HTTP status
before and after, runs `nginx -t` before every reload, and reverts on any
failure. It ends by confirming furnify still answers the same as before.

### 7. Release

Re-run the deploy workflow (Actions → Deploy → Re-run). It pulls the image,
starts the container, waits for the healthcheck, then checks both
`softech.agency` **and** `furnify.softech.agency` respond. If the new container
never turns healthy it puts the previous image back automatically.

---

## Afterwards

**Every push to `main`** now runs the gate and, on green, releases. A failing
lint, type error or build stops the pipeline before anything is pushed or
pulled.

**Rollback to any earlier commit:**

```bash
ssh root@187.127.124.251
cd /opt/softech-agency
sed -i 's|^IMAGE=.*|IMAGE=ghcr.io/arifur999/softech_agency:<sha>|' .env
docker compose up -d web
```

**Certificate renewal** is handled by the `certbot.timer` systemd unit. It
renews via the webroot, so no reload is needed to serve the challenge. Confirm
with `certbot renew --dry-run`.

**Logs:**

```bash
docker compose -f /opt/softech-agency/docker-compose.yml logs -f web
tail -f /var/log/nginx/softech.agency.error.log
```

**If anything at all looks wrong with furnify**, restore instantly:

```bash
tar xzf /root/nginx-backup-<timestamp>.tar.gz -C /
nginx -t && systemctl reload nginx
```
