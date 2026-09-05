# Deploying softech.agency

Target: `softech.agency` + `www.softech.agency` on the Hostinger VPS
(Ubuntu 24.04, KVM 2, 8 GB). `furnify.softech.agency` runs on the same box and
must keep running.

## Setup

On the VPS, once:

```bash
apt-get update -qq && apt-get install -y -qq git
git clone https://github.com/Arifur999/softech_agency.git /root/softech-src
bash /root/softech-src/deploy/bootstrap.sh
cp /root/softech-src/deploy/docker-compose.yml /opt/softech-agency/
bash /root/softech-src/deploy/install.sh
```

That is all. `install.sh` is safe to re-run at any time.

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

The site container publishes no host port. nginx reaches it over the compose
network by container name, so it cannot be hit directly from the internet,
cannot collide with a port in use, and sidesteps Docker's habit of punching
published ports past `ufw`.

## Why the site kept losing its certificate

`/srv/hatim/hatim_Backend/` belongs to the furnify deploy. Its `nginx.conf` is
rewritten on every furnify release, and its `docker-compose.yml` can be too.

The first approach appended the vhost to that `nginx.conf`. A furnify release
erased it, `softech.agency` fell through to furnify's `listen 443` block, and
visitors got furnify's certificate, furnify's content and a browser warning.

Now the vhost lives in `/opt/softech-agency/nginx/softech.agency.conf`, bind
mounted into the nginx container, and `softech-vhost.timer` re-checks every two
minutes. If a furnify release removes the mount it is put back automatically.
The check costs one `docker exec test -f` plus a certificate probe; nothing is
restarted unless the vhost is genuinely missing, and it refuses to act at all
unless furnify is answering 200 first.

To make it permanent on the furnify side too, add this line to the nginx
service's `volumes:` in the furnify repo's compose file, under the
`./nginx.conf` line:

```yaml
- /opt/softech-agency/nginx/softech.agency.conf:/etc/nginx/conf.d/softech.agency.conf:ro
```

## How releases work

Push to `main`. The workflow runs lint, typecheck and build, and on green
publishes an image to GHCR. `softech-deploy.timer` notices the new digest
within two minutes, pulls it, recreates the container, waits for the
healthcheck, and rolls back to the previous image if it never turns healthy.

There is no SSH step. GitHub's runners cannot reach this host on port 22 —
twelve attempts across three minutes all timed out, while the same port answers
on every try from the open internet. The release is pulled rather than pushed,
so no SSH private key needs to exist in the repository secrets.

## Two things the nginx config does deliberately

**The upstream host is a variable.** With a literal hostname nginx resolves it
while *loading* the config, so a stopped site container would fail `nginx -t`
and break a restart of the container furnify depends on. Behind
`set $softech_host` plus a `resolver`, resolution happens per request: a stopped
site is a 502 on its own hostname and nothing else.

**An ACME block went in before the certificate.** furnify's
`listen 80 default_server` returns 444, which closes the challenge connection,
so certbot could not have issued a certificate for softech.agency otherwise.

## Operations

```bash
# timers
systemctl list-timers 'softech-*'
journalctl -u softech-vhost -u softech-deploy --since '1 hour ago'

# force a release now
systemctl start softech-deploy

# repair the vhost by hand
bash /root/softech-src/deploy/ensure-site.sh

# roll back to a specific commit
cd /opt/softech-agency
systemctl stop softech-deploy.timer
sed -i 's|^IMAGE=.*|IMAGE=ghcr.io/arifur999/softech_agency:<sha>|' .env
docker compose up -d web

# renew certificates (both domains share the furnify certbot volumes)
cd /srv/hatim/hatim_Backend
docker compose run --rm certbot renew
docker exec hatim_backend-nginx-1 nginx -s reload

# logs
docker logs -f softech-agency
docker logs -f hatim_backend-nginx-1
```

## Never do these on this box

- hPanel, OS & Panel, reinstall or change OS — wipes everything.
- Bring the furnify stack down in `/srv/hatim/hatim_Backend` — that stops
  furnify. This site's stack lives in `/opt/softech-agency`.
- Edit furnify's server blocks. Nothing here writes to their `nginx.conf`.
