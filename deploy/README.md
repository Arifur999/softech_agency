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

## Setup

On the VPS, once:

    apt-get update -qq && apt-get install -y -qq git
    git clone https://github.com/Arifur999/softech_agency.git /root/softech-src
    bash /root/softech-src/deploy/bootstrap.sh
    cp /root/softech-src/deploy/docker-compose.yml /opt/softech-agency/
    bash /root/softech-src/deploy/install.sh

That is all.  is safe to re-run at any time.

## How releases work

 to main. The workflow runs lint, typecheck and build, and on green
publishes an image to GHCR. A systemd timer on the VPS notices the new digest
within two minutes, pulls it, recreates the container, waits for the
healthcheck, and rolls back to the previous image if it never turns healthy.

There is no SSH step. GitHub's runners cannot reach this host on port 22 —
twelve attempts over three minutes all timed out, while the same port answers
on every try from the open internet — so the release is pulled rather than
pushed. No SSH private key needs to exist in the repository secrets.

## Why the site kept losing its certificate

 belongs to the furnify deploy. Its  is
rewritten on every furnify release, and its  can be too.
The first approach appended the vhost to that , so a furnify
release erased it and softech.agency fell through to furnify's block — furnify's certificate, furnify's content, a browser warning.

Now the vhost lives in , bind
mounted into the nginx container, and  re-checks every
two minutes. If a furnify release removes the mount, it is put back
automatically. Nothing is restarted unless the vhost is actually missing.

To make it permanent on the furnify side too, add this line to the nginx
service's  in the furnify repo's compose file, under the
 line:

    - /opt/softech-agency/nginx/softech.agency.conf:/etc/nginx/conf.d/softech.agency.conf:ro

## Operations

Check both timers:

    systemctl list-timers 'softech-*'
    journalctl -u softech-vhost -u softech-deploy --since '1 hour ago'

Force a release now:

    systemctl start softech-deploy

Roll back to a specific commit:

    cd /opt/softech-agency
    systemctl stop softech-deploy.timer
    sed -i 's|^IMAGE=.*|IMAGE=ghcr.io/arifur999/softech_agency:<sha>|' .env
    docker compose up -d web

Renew certificates (both domains share the furnify stack's certbot volumes):

    cd /srv/hatim/hatim_Backend
    docker compose run --rm certbot renew
    docker exec hatim_backend-nginx-1 nginx -s reload

Logs:

    docker logs -f softech-agency
    docker logs -f hatim_backend-nginx-1

## Never do these on this box

- hPanel, OS & Panel, reinstall or change OS — wipes everything.
- Usage:  docker compose [OPTIONS] COMMAND

Define and run multi-container applications with Docker

Options:
      --all-resources              Include all resources, even those not
                                   used by services
      --ansi string                Control when to print ANSI control
                                   characters ("never"|"always"|"auto")
                                   (default "auto")
      --compatibility              Run compose in backward compatibility mode
      --dry-run                    Execute command in dry run mode
      --env-file stringArray       Specify an alternate environment file
  -f, --file stringArray           Compose configuration files
      --parallel int               Control max parallelism, -1 for
                                   unlimited (default -1)
      --profile stringArray        Specify a profile to enable
      --progress string            Set type of progress output (auto,
                                   tty, plain, json, quiet)
      --project-directory string   Specify an alternate working directory
                                   (default: the path of the, first
                                   specified, Compose file)
  -p, --project-name string        Project name

Management Commands:
  bridge                  Convert compose files into another model

Commands:
  attach                  Attach local standard input, output, and error streams to a service's running container
  build                   Build or rebuild services
  commit                  Create a new image from a service container's changes
  config                  Parse, resolve and render compose file in canonical format
  cp                      Copy files/folders between a service container and the local filesystem
  create                  Creates containers for a service
  down                    Stop and remove containers, networks
  events                  Receive real time events from containers
  exec                    Execute a command in a running container
  export                  Export a service container's filesystem as a tar archive
  images                  List images used by the created containers
  kill                    Force stop service containers
  logs                    View output from containers
  ls                      List running compose projects
  pause                   Pause services
  port                    Print the public port for a port binding
  ps                      List containers
  publish                 Publish compose application
  pull                    Pull service images
  push                    Push service images
  restart                 Restart service containers
  rm                      Removes stopped service containers
  run                     Run a one-off command on a service
  scale                   Scale services 
  start                   Start services
  stats                   Display a live stream of container(s) resource usage statistics
  stop                    Stop services
  top                     Display the running processes
  unpause                 Unpause services
  up                      Create and start containers
  version                 Show the Docker Compose version information
  volumes                 List volumes
  wait                    Block until containers of all (or specified) services stop.
  watch                   Watch build context for service and rebuild/refresh containers when files are updated

Run 'docker compose COMMAND --help' for more information on a command. in  — stops furnify.
- Edit furnify's server blocks. Nothing here writes to their nginx.conf.
