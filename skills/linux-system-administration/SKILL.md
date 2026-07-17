---
name: linux-system-administration
description: Apply known Linux host-state changes involving packages, users, permissions, filesystems, scheduling, networking, backups, logging, or operating-system configuration. Activate when the administrative objective and cause are established. Do not activate for unresolved diagnosis, service-only lifecycle work, or read-only tasks.
---

# Linux System Administration

## Purpose

Apply the smallest reversible host change using native tools while preserving access, data, dependencies, and rollback.

## Activate when

- changing packages, users, groups, sudo, permissions, filesystems, mounts, schedules, networking, backups, logging, or OS configuration;
- applying a known host-level correction after diagnosis;
- a bounded change has host-wide access, persistence, privilege, or recovery implications.

## Do not activate when

- the cause is still unknown;
- one service lifecycle is fully owned by `linux-service-management`;
- the task is read-only or application-only.

## Required context

Confirm the host and distribution, environment and role, access and privileges, authoritative configuration, dependencies and persistent data, native tools, backups, recovery, maintenance window, approvals, and validation commands.

## Workflow

1. Reuse the established objective, diagnosis, approvals, and environment facts.
2. Inspect current state and authoritative configuration.
3. Identify affected services, data, sessions, automation, remote access, and security controls.
4. Back up changed configuration with ownership and permissions preserved.
5. Apply the smallest change through the host's native mechanism.
6. Validate before reload, restart, remount, enablement, or another transition.
7. Verify the intended objective and affected boundaries.
8. Provide rollback and manual follow-up.

## Stop conditions

Stop when the change is proportionally verified, a destructive or access-affecting step lacks approval, current state conflicts with the request, recovery information is insufficient, or remaining work belongs to another skill.

## Guardrails

- Prefer distribution-native tools and existing host conventions.
- Do not perform broad upgrades, partitioning, filesystem conversion, user deletion, recursive ownership changes, or access-control replacement without explicit scope.
- Do not edit package or system-state databases manually.
- Do not expose secrets or disable security controls as a shortcut.
- Do not modify production or restart critical services without authorization.

## Validation

- Check the applied change against the administrative objective.
- Use native syntax and configuration validation before state transitions.
- Verify only affected logs, permissions, services, ports, filesystems, sessions, and persistence.
- State backup, recovery, access, or health behavior not verified.

## Output

Report relevant state, exact changes, affected boundaries, validation, rollback, approvals still required, and unverified recovery or production risks.