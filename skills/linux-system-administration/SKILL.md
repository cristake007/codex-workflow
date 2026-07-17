---
name: linux-system-administration
description: Perform known Linux host-state changes involving packages, users, permissions, filesystems, scheduled work, networking, backups, logging, or operating-system configuration. Activate when the administrative objective is established and the task changes host state. Do not activate when the cause of a problem is still unknown, when the task is limited to operating one long-running service, or when no Linux administration decision is required.
---

# Linux System Administration

## Purpose

Apply the smallest reversible Linux host change using distribution-native tools while preserving access, data, permissions, dependent services, and rollback.

## Activate when

- installing, removing, or configuring packages with an established objective;
- managing users, groups, sudo rules, permissions, ownership, filesystems, mounts, scheduled work, networking, backups, logging, or operating-system configuration;
- applying a known host-level correction after diagnosis is complete;
- changing Linux host state rather than only inspecting or diagnosing it;
- a bounded configuration edit has host-wide privilege, persistence, access, or recovery implications.

## Do not activate when

- the symptom or cause is still unknown and troubleshooting must precede a change;
- the task is specifically about deploying or operating one long-running service, reverse proxy, socket, or systemd unit and `linux-service-management` fully owns it;
- the task is application implementation with no Linux host-state change;
- the requested outcome is purely informational or read-only;
- the target is not a Linux system or Linux-hosted environment.

An exact path or command is not by itself a reason to skip this skill when the action changes Linux host state.

## Required context

Use facts already available in the prompt and conversation. Establish only missing administrative context:

- host, distribution, version, kernel, init system, and role;
- local, staging, production, virtual machine, container host, or other environment;
- access method, current user, privilege level, and recovery path;
- authoritative configuration and current state;
- dependent services, persistent data, open sessions, automation, and remote access;
- package manager, filesystem, network, scheduler, logging, and security controls involved;
- backup availability, maintenance window, rollback requirements, and explicit approvals;
- native syntax, configuration, and post-change validation commands.

## Workflow

1. Check the prompt and conversation for the established objective, prior diagnosis, approvals, and known environment facts.
2. Confirm the host, distribution, version, role, environment, access method, privilege level, and recovery path.
3. Inspect the current state and authoritative configuration before editing anything.
4. Identify dependent services, persistent data, open sessions, automation, remote access, and security controls that the change could affect.
5. Back up changed configuration with permissions and ownership preserved.
6. Apply the smallest change using the native package manager, account tools, filesystem tools, scheduler, networking tools, or configuration mechanism already used by the host.
7. Validate syntax or configuration before reload, restart, remount, enabling, or other state transitions.
8. Verify intended behavior and check relevant logs, permissions, service state, ports, filesystems, sessions, and dependent systems.
9. Provide an exact rollback procedure and any manual follow-up.

## Stop conditions

Stop when:

- the requested host-state change is applied and proportionally verified;
- the next step requires a destructive, production, access-affecting, broad, or irreversible action without explicit approval;
- the current state conflicts with the requested change and a user decision is required;
- recovery, backup, privilege, or maintenance information is insufficient for a safe change;
- remaining work belongs to troubleshooting, service management, application implementation, or another narrower skill.

## Guardrails

- Prefer distribution-native tools and existing host conventions.
- Do not perform broad upgrades, distribution upgrades, partitioning, filesystem conversion, user deletion, recursive ownership changes, or access-control replacement without explicit scope and approval.
- Do not edit generated package files, package-manager databases, or system state databases manually.
- Do not expose secrets through command history, process arguments, logs, reports, or committed files.
- Do not assume backups or recovery access exist; verify them or state that recovery is unconfirmed.
- Do not disable SELinux, AppArmor, firewalling, TLS verification, authentication, or audit controls as a shortcut.
- Do not modify production or restart critical services unless explicitly requested and authorized.

## Validation

- Use native syntax or configuration validation before applying service, network, mount, scheduler, account, or package changes.
- Validate only the affected host boundary and dependent services.
- After an approved change, verify the original administrative objective, relevant logs, permissions, service state, ports, filesystems, sessions, and persistence.
- Do not run broad upgrades, scans, cleanup, reboots, production changes, or destructive tests automatically.
- Never claim recovery, backup, access, or service health was verified when it was not.

## Output

Report only:

- relevant current state;
- exact host changes made or proposed;
- affected services, users, permissions, filesystems, networks, automation, and persistent data;
- validation performed;
- rollback procedure;
- operations still requiring user approval;
- important unverified recovery or production risks.
