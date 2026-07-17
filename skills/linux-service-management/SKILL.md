---
name: linux-service-management
description: Configure, deploy, and operate known Linux services using systemd, reverse proxies, sockets, environment files, service accounts, logs, health checks, and safe reload procedures. Activate for long-running applications and server processes when the service objective is established. Do not activate while the failure cause is still unknown, for unrelated host-wide administration, or when no Linux service lifecycle decision is required.
---

# Linux Service Management

## Purpose

Apply the smallest safe service configuration or lifecycle change while preserving availability, remote access, persistent data, secrets, health checks, and rollback.

## Activate when

- creating, editing, deploying, enabling, disabling, reloading, restarting, or operating a known Linux service;
- changing systemd units, drop-ins, reverse proxies, sockets, environment files, service accounts, logs, ports, health checks, startup ordering, or restart policy;
- applying a confirmed service correction after troubleshooting is complete;
- deploying or operating a long-running application or server process;
- a bounded service configuration edit still requires lifecycle, availability, privilege, or rollback judgment.

## Do not activate when

- the symptom or cause is still unknown and `linux-troubleshooting` must distinguish failure modes first;
- the task is broad host administration unrelated to a specific service lifecycle;
- the task is only application source-code implementation with no service configuration or operation;
- the requested outcome is purely informational or read-only;
- the target is not a Linux service or Linux-hosted long-running process.

An exact unit, proxy, environment, or configuration path is not by itself a reason to skip this skill when service behavior or lifecycle is affected.

## Required context

Use facts already available in the prompt and conversation. Establish only missing service-specific context:

- process, executable, arguments, working directory, service account, and environment;
- systemd unit, drop-ins, reverse proxy, socket, process manager, or other authoritative lifecycle mechanism;
- ports, protocols, dependencies, startup ordering, timeouts, restart behavior, and resource limits;
- persistent data, writable paths, ownership, permissions, and secret locations;
- log destinations, health checks, readiness, graceful reload, and zero-downtime requirements;
- production status, public exposure, maintenance window, active users, and recovery path;
- existing deployment conventions and previous configuration;
- native validation, daemon reload, service reload or restart, health, and rollback commands.

## Workflow

1. Check the prompt and conversation for the established objective, prior diagnosis, approvals, and known service facts.
2. Identify the process, executable, working directory, service account, environment, ports, dependencies, data paths, and expected lifecycle.
3. Inspect existing units, drop-ins, reverse-proxy configuration, sockets, log destinations, health checks, and deployment conventions before creating alternatives.
4. Back up hand-maintained unit, proxy, environment, and service configuration before editing.
5. Keep secrets outside unit files and repositories, using existing secret stores or protected environment files with minimal permissions.
6. Define startup ordering, restart behavior, timeouts, resource limits, and writable paths only when required.
7. Validate configuration with native test commands before daemon reload, service reload, restart, or enablement.
8. Prefer reload over restart when supported and safe.
9. When availability matters, confirm the new process is healthy before ending the old one where the platform supports it.
10. Verify service state, logs, listening sockets, ownership, health endpoints, dependencies, and restart behavior.
11. Preserve the previous unit or configuration and provide rollback.

## Stop conditions

Stop when:

- the requested service configuration or lifecycle action is applied and proportionally verified;
- the next step changes production availability, public exposure, access, persistent data, firewall rules, or critical infrastructure without explicit approval;
- the cause is still uncertain and troubleshooting must resume;
- backup, recovery, privilege, maintenance, or secret-handling information is insufficient for a safe change;
- remaining work belongs to host administration, application implementation, or another narrower skill.

## Guardrails

- Do not bind a new public port, enable a service at boot, or change firewall and reverse-proxy exposure without explicit approval.
- Do not run application services as root unless the requirement and platform make it unavoidable.
- Do not overwrite hand-maintained units, drop-ins, proxy configuration, environment files, or service scripts without inspection and backup.
- Do not restart SSH, networking, firewall, database, or production-facing services casually.
- Do not place secrets directly in unit files, command arguments, logs, or repositories.
- Do not create competing startup mechanisms when systemd or another service manager is already authoritative.
- Do not claim zero-downtime, health, restart safety, or rollback success without verification.

## Validation

- Use native configuration tests before daemon reload, proxy reload, service reload, restart, or enablement.
- Validate only the affected unit, proxy, socket, port, dependency, health endpoint, and log boundary.
- Prefer reload over restart when supported and safe.
- Do not perform production reloads, restarts, enablement, public exposure changes, or destructive service actions unless explicitly requested and authorized.
- After an approved change, verify service state, logs, listening sockets, ownership, dependencies, and health.
- State clearly which availability, restart, failover, production, or recovery behavior remains unverified.

## Output

Report only:

- service topology and authoritative lifecycle mechanism;
- files and settings changed or proposed;
- lifecycle commands used or requiring approval;
- affected ports, dependencies, users, secrets, logs, health checks, and persistent data;
- validation performed;
- rollback procedure;
- important unverified availability or production risks.
