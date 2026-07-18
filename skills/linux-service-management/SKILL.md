---
name: linux-service-management
description: Configure, deploy, and operate known Linux services through systemd, reverse proxies, sockets, environment files, service accounts, logs, health checks, and safe lifecycle actions. Activate when the service objective and cause are established. Do not activate for unresolved diagnosis, unrelated host administration, or application-only work.
---

# Linux Service Management

## Purpose

Apply the smallest safe service change while preserving availability, access, data, secrets, health, and rollback.

## Activate when

- creating or changing units, drop-ins, proxies, sockets, environment files, accounts, ports, logs, health checks, or restart policy;
- deploying or operating a known long-running process;
- applying a confirmed service correction.

## Do not activate when

- the cause is still unknown;
- the task is broad host administration or application-only implementation;
- no service lifecycle decision is required.

## Required context

Confirm the process and working directory, lifecycle mechanism, account and environment, ports and dependencies, data and permissions, secrets, logs and health, availability requirements, production status, recovery, approvals, and native validation commands.

## Workflow

1. Reuse the established objective, diagnosis, approvals, and service facts.
2. Inspect existing units, proxies, sockets, environment, logs, health checks, and deployment conventions.
3. Back up hand-maintained configuration.
4. Keep secrets outside units and repositories.
5. Define ordering, restart behavior, limits, and writable paths only when required.
6. Validate before daemon reload, reload, restart, or enablement.
7. Prefer reload when safe and verify affected state, logs, sockets, dependencies, and health.
8. Preserve prior configuration and provide rollback.

## Stop conditions

Stop when the action is proportionally verified, production availability or exposure changes lack approval, diagnosis must resume, recovery or privilege context is insufficient, or remaining work belongs elsewhere.

## Guardrails

- Do not expose ports, enable boot startup, or change firewall or proxy exposure without approval.
- Do not run services as root without necessity.
- Do not overwrite maintained configuration without inspection and backup.
- Do not restart critical or production services casually.
- Do not place secrets in units, arguments, logs, or repositories.
- Do not create competing lifecycle mechanisms.

## Validation

- Check the change against the requested service behavior.
- Use native configuration tests before lifecycle actions.
- Validate only the affected unit, proxy, socket, port, dependency, logs, and health.
- State availability, restart, failover, production, or recovery behavior not verified.

## Output

Report the service topology, files and settings, lifecycle actions, affected boundaries, validation, rollback, and unverified availability or production risks.