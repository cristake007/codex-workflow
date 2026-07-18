---
name: server-security
description: Assess or harden authorized Linux servers while preserving access, service availability, data, evidence, and rollback. Activate for explicit server-security work involving SSH, sudo, firewall, exposure, patching, TLS, permissions, secrets, logging, backups, containers, or recovery. Do not activate for ordinary administration, application-only security, unresolved troubleshooting, or unauthorized scanning.
---

# Server Security

## Purpose

Reduce realistic host exposure through evidence-based hardening without losing access, availability, data, or recovery.

## Activate when

- reviewing or changing administrative access, SSH, sudo, authentication, permissions, or secrets;
- assessing firewall, sockets, exposed services, TLS, patches, logs, backups, containers, or recovery;
- the user explicitly requests server hardening or security remediation.

## Do not activate when

- the task is ordinary administration or service operation with no security objective;
- the work is application-only security;
- an unexplained failure requires troubleshooting first;
- the target or testing is unauthorized.

## Required context

Confirm authorization, host role and environment, production and public exposure, access and recovery paths, users and privileges, sockets and firewall, services and TLS, patches and containers, secrets and logs, backups and security controls, testing limits, maintenance window, and rollback.

## Workflow

1. Establish authorization, environment, exposure, access, privileges, recovery, and testing limits.
2. Inventory only the relevant access, service, network, patch, TLS, container, secret, log, and backup boundaries.
3. Identify attack surface, trust boundaries, privileged actions, and recovery dependencies.
4. Prioritize remotely reachable weaknesses, excessive privilege, weak authentication, exposed management, unsupported software, insecure secrets, and missing recovery controls.
5. Separate urgent exposure, confirmed misconfiguration, patching need, and defense-in-depth improvement.
6. Back up and validate configuration before approved changes.
7. Stage access and firewall changes to preserve the current session and recovery path.
8. Verify affected access, service health, logs, sockets, firewall, TLS, permissions, patches, and recovery.

## Stop conditions

Stop when the in-scope attack surface is evidenced and remediation order is clear, a change could affect access or production without approval, recovery or authorization is insufficient, or remaining work belongs to another skill.

## Guardrails

- Use only on authorized systems.
- Do not lock out users, replace SSH, flush firewalls, rotate keys, revoke access, or restart critical services without approval and rollback.
- Do not disable security or audit controls, scan external targets, or expose sensitive evidence.
- Do not treat version strings alone as proof of vulnerability.
- Preserve access, evidence, data, availability, and recovery.

## Validation

- Prefer passive host, configuration, package, service, socket, firewall, TLS, log, and backup evidence.
- Validate syntax before reload, restart, enablement, or access changes.
- Verify access changes before closing the current session.
- State exposures, services, patches, controls, backups, and recovery paths not verified.

## Output

Group findings as urgent exposure, confirmed misconfiguration, patching need, or defense-in-depth. Include evidence, affected boundary, realistic risk, safe remediation order, validation, rollback, and unresolved recovery or availability risk.