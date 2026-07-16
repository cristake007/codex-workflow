---
name: linux-system-administration
description: Perform careful Linux administration involving packages, users, permissions, filesystems, scheduled work, networking, backups, logging, and operating-system configuration. Use when the task changes host state rather than only diagnosing it.
---

# Linux System Administration

Prefer distribution-native tools, explicit change control, and reversible operations.

## Workflow

1. Confirm the host, distribution, version, role, environment, access method, privilege level, and recovery path.
2. Inspect the current state and the authoritative configuration before editing anything.
3. Identify dependent services, persistent data, open sessions, automation, and remote access that the change could affect.
4. Back up changed configuration with permissions and ownership preserved.
5. Apply the smallest change using the native package manager, service manager, account tools, or configuration mechanism already used by the host.
6. Validate syntax or configuration before reload, restart, remount, or enabling a unit.
7. Verify the intended behavior and check logs, permissions, service state, ports, and dependent systems.
8. Provide an exact rollback procedure and any manual follow-up.

## Administration Rules

- Prefer systemd units and timers when systemd is already authoritative; do not add competing startup mechanisms.
- Use least privilege for users, groups, sudo rules, services, files, sockets, and secrets.
- Do not edit generated package files or package-manager databases manually.
- Do not perform broad upgrades, distribution upgrades, filesystem changes, partitioning, user deletion, or recursive ownership changes without explicit scope.
- Do not expose secrets through command history, process arguments, logs, or generated reports.
- Never assume a backup exists; verify it or state that recovery is unconfirmed.

## Output

Report current state, exact changes, affected services, validation performed, rollback, and operations still requiring user approval.
