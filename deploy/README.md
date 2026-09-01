# Deploying softech.agency

Target: `softech.agency` + `www.softech.agency` on the Hostinger VPS
(Ubuntu 24.04, KVM 2, 8 GB).

`furnify.softech.agency` already runs on this server and **must keep running**.

> **This server runs no host nginx.** `:80`/`:443` belong to the
> `hatim_backend-nginx-1` container (nginx:1.29-alpine), which also serves
> furnify and holds the Let's Encrypt volumes. Its config is a single bind
> mount — `/srv/hatim/hatim_Backend/nginx.conf` — not a `conf.d` directory, so
> a new file cannot simply be dropped in. This site is attached by **appending**
> server blocks to that file: backed up first, validated with `nginx -t` inside
> the container, applied with a graceful `nginx -s reload`, and rolled back
> automatically if furnify's status changes.

## How it fits together

```
                    :80 / :443
                        |
          hatim_backend-nginx-1  (nginx:1.29-alpine)
            |                              |
   server_name furnify...          server_name softech.agency
            |                              |
   backend_app (hatim)            softech-agency:3000  <- this repo
            |                              |
       postgres                    (no host port at all)
                    hatim_backend_default
```

The site container publishes **no host port**. nginx reaches it over the
compose network by container name, so it is unreachable from the internet
directly, cannot collide with any port in use, and sidesteps Docker's habit of
punching published ports past `ufw`.

## Two things this setup does deliberately

**The upstream host is a variable.** With a literal hostname, nginx resolves it
while *loading* the config — so if the `softech-agency` container were stopped,
`nginx -t` would fail and a restart of that container would fail outright,
**taking furnify down**. Through `set $softech_host` plus a `resolver`,
resolution happens per request: a stopped site is a 502 on its own hostname and
nothing else.

**An ACME block goes in before the certificate.** The existing
`listen 80 default_server` returns 444, which would close the challenge
connection, so certbot could never issue a cert for softech.agency. Stage 1
claims port 80 for the two names, stage 2 gets the cert, stage 3 installs the
real config — because nginx refuses to start when `ssl_certificate` points at a
file that does not exist yet.

---

## Order of operations

### 1. Survey — changes nothing

```bash
apt-get update -qq && apt-get install -y -qq git
git clone https://github.com/Arifur999/softech_agency.git /root/softech-src
bash /root/softech-src/deploy/inspect-server.sh
bash /root/softech-src/deploy/inspect-proxy.sh
```

### 2. DNS

`softech.agency`, `www.softech.agency` and `furnify.softech.agency` already
resolve to the VPS. Nothing to do.

### 3. Prepare

```bash
bash /root/softech-src/deploy/bootstrap.sh
cp /root/softech-src/deploy/docker-compose.yml /opt/softech-agency/
```

Docker is already installed here (it runs the hatim stack), so this only
creates `/opt/softech-agency` and its `.env`. It touches no web server config.

### 4. GitHub secrets

Repo, then Settings, Secrets and variables, Actions:

| Secret        | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| `VPS_HOST`    | the VPS IPv4                                                  |
| `VPS_USER`    | `root`                                                        |
| `VPS_SSH_KEY` | private key whose public half is in the VPS `authorized_keys` |
| `GHCR_TOKEN`  | only if the GHCR package stays private                        |

Generate a deploy-only key on the VPS:

```bash
ssh-keygen -t ed25519 -C "gh-actions" -f /root/.ssh/softech_deploy -N ""
cat /root/.ssh/softech_deploy.pub >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
cat /root/.ssh/softech_deploy
```

Paste that last output — `BEGIN` line through `END` line — into `VPS_SSH_KEY`.

### 5. First image

Push to `main`. CI runs lint, typecheck and build, then pushes the image. The
deploy job fails at the health wait because nginx is not attached yet — that is
expected.

Then make the package pullable: GitHub, Packages, `softech_agency`, Package
settings, Visibility, **Public**. Or keep it private and set `GHCR_TOKEN`.

### 6. Attach to the existing nginx

```bash
cd /root/softech-src && git pull
bash deploy/attach-site.sh you@example.com
```

### 7. Release

Actions, Deploy, Re-run.

---

## Afterwards

Every push to `main` runs the gate and, on green, releases. A failing lint,
type error or build stops the pipeline before anything reaches the server.

**Roll back the site:**

```bash
cd /opt/softech-agency
sed -i 's|^IMAGE=.*|IMAGE=ghcr.io/arifur999/softech_agency:<sha>|' .env
docker compose up -d web
```

**Undo the nginx change** — `attach-site.sh` prints the exact backup path:

```bash
cp /srv/hatim/hatim_Backend/nginx.conf.bak-<stamp> /srv/hatim/hatim_Backend/nginx.conf
docker exec hatim_backend-nginx-1 nginx -t
docker exec hatim_backend-nginx-1 nginx -s reload
```

**Certificate renewal** — the hatim stack's certbot service shares the same
volumes, so both domains renew together:

```bash
cd /srv/hatim/hatim_Backend
docker compose run --rm certbot renew
docker exec hatim_backend-nginx-1 nginx -s reload
```

Worth putting on a cron or systemd timer if it is not already.

**Logs:**

```bash
docker logs -f softech-agency
docker logs -f hatim_backend-nginx-1
```

---

## Never do these on this box

- **hPanel, OS & Panel, reinstall or change OS** — wipes everything.
- **hPanel, Docker Manager, Install** — panel-driven, and Docker is already
  installed anyway.
- **`docker compose down` in `/srv/hatim/hatim_Backend`** — stops furnify. This
  site's stack lives in `/opt/softech-agency` and is managed separately.
- **Editing furnify's server blocks.** `attach-site.sh` only ever appends below
  its own marker.
