---
name: server-security
description: Assess and harden authorized Linux servers while preserving access and service availability. Use for SSH, sudo, firewall, exposed services, patching, TLS, permissions, secrets, logging, backups, containers, and host hardening.
---

# Server Security

Preserve administrative access, evidence, and rollback while reducing real exposure.

## Workflow

1. Confirm host role, distribution, version, environment, public exposure, access path, production status, and recovery access.
2. Inventory users, groups, sudo rules, SSH settings, listening sockets, firewall policy, running and enabled services, patch state, TLS endpoints, scheduled jobs, containers, and sensitive paths.
3. Identify the attack surface and trust boundaries before changing configuration.
4. Prioritize remotely reachable weaknesses, excessive privilege, weak authentication, exposed management interfaces, unsupported software, insecure secrets, and missing recovery controls.
5. Back up configuration and validate syntax before reload or restart.
6. Stage SSH and firewall changes so the current session remains available; keep an independent recovery path when possible.
7. Verify access, service health, logs, firewall state, TLS behavior, and backup recoverability after changes.

## Hardening Principles

- minimize installed and enabled services;
- use key-based and least-privilege access appropriate to the environment;
- keep security updates and reboot requirements visible;
- restrict network exposure at both host and upstream boundaries;
- protect secrets and private keys with appropriate ownership and permissions;
- retain useful security logs without leaking sensitive data;
- verify backups and recovery rather than treating backup presence as sufficient;
- prefer measured hardening over disabling functionality without understanding dependencies.

## Guardrails

- Do not lock out the user, replace SSH configuration, flush firewall rules, rotate keys, revoke users, or restart critical services without explicit approval and rollback.
- Do not disable SELinux, AppArmor, firewalling, TLS verification, or audit controls as a convenience.
- Do not actively scan external targets or attempt exploitation without authorization.

## Output

Separate urgent exposure, confirmed misconfiguration, patching needs, and defense-in-depth improvements. Include evidence, safe remediation order, validation, and rollback.
