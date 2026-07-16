---
name: linux-troubleshooting
description: Diagnose Linux system, service, resource, storage, permission, package, network, DNS, and log problems before changing state. Use for unexplained failures, outages, degraded performance, or commands that work differently across Linux distributions.
---

# Linux Troubleshooting

Use an evidence-first workflow. Do not jump directly to package installation, service restarts, cleanup, or configuration replacement.

## Workflow

1. Establish the environment: distribution and version, kernel, init system, virtualization or container context, current user, privileges, and whether the host is production.
2. Reproduce or define the symptom precisely: command, service, endpoint, expected result, actual result, first occurrence, and recent changes.
3. Inspect the smallest relevant layer:
   - resource pressure and process state;
   - systemd unit state and recent journal entries;
   - network interfaces, routes, listening sockets, DNS, and TLS;
   - storage capacity, inodes, mounts, permissions, and ownership;
   - package, runtime, dependency, and configuration state.
4. Preserve evidence. Do not rotate or delete logs, kill processes, restart services, or clear caches merely to see whether the problem disappears.
5. Form one or more testable causes and run the least invasive diagnostic that can distinguish them.
6. Propose the smallest reversible correction. Back up a configuration file before editing it and use native validation commands before reload or restart.
7. Verify the original symptom, service health, logs, resource state, and any dependent service after the change.

## Guardrails

- Do not assume Debian, Ubuntu, RHEL, Fedora, Alpine, Arch, or another distribution; detect it.
- Do not disable SELinux, AppArmor, a firewall, TLS verification, authentication, or access controls as a shortcut.
- Do not reboot, restart a production service, remove packages, delete data, or change permissions without explicit authorization.
- Redact credentials, tokens, private keys, cookies, and sensitive log values.
- State what was observed, what remains uncertain, and which commands were not executed.

## Output

Keep the result operational: likely cause, supporting evidence, safe fix, validation commands, rollback, and unresolved risk.
