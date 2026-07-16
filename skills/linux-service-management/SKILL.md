---
name: linux-service-management
description: Configure, deploy, and operate Linux services using systemd, reverse proxies, sockets, environment files, service accounts, logs, health checks, and safe reload procedures. Use for long-running applications and server processes.
---

# Linux Service Management

Treat service availability, remote access, persistent data, and rollback as first-class requirements.

## Workflow

1. Identify the process, executable, working directory, service account, environment, ports, dependencies, data paths, and expected lifecycle.
2. Inspect existing units, drop-ins, reverse-proxy configuration, log destinations, health checks, and deployment conventions before creating alternatives.
3. Keep secrets outside unit files and repositories. Use existing secret stores or protected environment files with minimal permissions.
4. Define explicit startup ordering, restart behavior, timeouts, resource limits, and writable paths only when the requirement needs them.
5. Validate configuration with native test commands before daemon reload or service reload.
6. Prefer reload over restart when supported and safe. Confirm that the new process is healthy before ending the old one when zero-downtime behavior matters.
7. Verify service state, logs, listening sockets, ownership, health endpoints, and restart behavior.
8. Preserve the previous unit or configuration and document rollback.

## Guardrails

- Do not bind a new public port, enable a service at boot, or change firewall and reverse-proxy exposure without explicit approval.
- Do not run application services as root unless the requirement and platform make it unavoidable.
- Do not overwrite hand-maintained units or proxy configuration without inspection and backup.
- Do not restart SSH, networking, firewall, database, or production-facing services casually.

## Output

Include service topology, files changed, lifecycle commands, validation, observed health, and rollback.
