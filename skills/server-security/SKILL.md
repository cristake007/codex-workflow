---
name: server-security
description: Assess and harden authorized Linux servers while preserving administrative access, evidence, service availability, persistent data, and rollback. Activate for SSH, sudo, firewall, exposed services, patching, TLS, permissions, secrets, logging, backups, containers, and host-hardening work. Do not activate for application-only security, ordinary administration with no security objective, unresolved operational troubleshooting, or unauthorized external scanning.
---

# Server Security

## Purpose

Reduce realistic Linux server exposure through evidence-based hardening while preserving access, service health, data, recovery, and operational compatibility.

## Activate when

- assessing or changing SSH, users, groups, sudo, authentication, permissions, ownership, secrets, or administrative access;
- reviewing firewall policy, listening sockets, exposed services, reverse proxies, TLS, patch state, scheduled work, logs, backups, or host containers;
- the user requests Linux server security assessment, hardening, exposure reduction, or security remediation;
- a confirmed host-security weakness requires a safe remediation sequence;
- server access, public exposure, least privilege, recovery, or defense-in-depth decisions are central to the task.

## Do not activate when

- the task is application code, API, dependency, or application-data security with no host boundary;
- the task is ordinary Linux administration or service operation with no security objective;
- an unexplained failure must first be diagnosed through `linux-troubleshooting`;
- the user requests unauthorized external scanning, exploitation, persistence, credential theft, exfiltration, or destructive actions;
- the target is not an authorized Linux server or Linux-hosted environment.

An exact configuration path is not by itself a reason to skip this skill when the requested change affects server exposure, access, privilege, or recovery.

## Required context

Use facts already available in the prompt and conversation. Establish only missing server-security context:

- ownership, authorization, host role, distribution, version, and environment;
- production status, public exposure, access path, current session, privilege level, and recovery access;
- users, groups, sudo rules, SSH settings, authentication methods, and administrative boundaries;
- listening sockets, firewall policy, reverse proxies, TLS endpoints, running and enabled services, and management interfaces;
- patch state, support status, package sources, containers, scheduled work, and sensitive paths;
- secrets, private keys, certificates, logs, audit controls, retention, backups, and recovery procedures;
- SELinux, AppArmor, firewall, upstream network, cloud, and other security controls;
- active-testing limits, maintenance window, rollback requirements, and approved validation commands.

## Workflow

1. Confirm ownership, authorization, host role, distribution, version, environment, production status, and active-testing limits.
2. Confirm public exposure, administrative access path, current session, privilege level, and independent recovery access.
3. Inventory only relevant users, groups, sudo rules, SSH settings, listening sockets, firewall policy, services, patch state, TLS endpoints, scheduled jobs, containers, sensitive paths, logs, and backups.
4. Identify assets, attack surface, trust boundaries, privileged operations, and recovery dependencies before changing configuration.
5. Prioritize remotely reachable weaknesses, excessive privilege, weak authentication, exposed management interfaces, unsupported software, insecure secrets, missing logs, and unverified recovery.
6. Distinguish confirmed misconfiguration, urgent exposure, patching need, and defense-in-depth improvement.
7. Back up configuration and validate syntax before reload or restart.
8. Stage SSH, sudo, firewall, and access-control changes so the current session remains available and an independent recovery path exists when possible.
9. Apply the smallest effective hardening change in a safe dependency order.
10. Verify administrative access, service health, logs, firewall state, listening sockets, TLS behavior, permissions, patch state, and backup recoverability after approved changes.
11. Provide exact rollback for every access-affecting or availability-affecting change.

## Stop conditions

Stop when:

- the in-scope attack surface and security controls have sufficient evidence;
- findings are categorized and the safe remediation order is clear;
- the next step could lock out access, interrupt production, change public exposure, rotate credentials, remove software, or alter persistent data without explicit approval;
- independent recovery, backups, privileges, maintenance window, or authorization are insufficient for safe changes;
- remaining work belongs to application security, troubleshooting, service management, or ordinary administration.

## Guardrails

- Use only for systems the user owns or is authorized to assess.
- Do not lock out the user, replace SSH configuration, flush firewall rules, rotate keys, revoke users, or restart critical services without explicit approval and rollback.
- Do not disable SELinux, AppArmor, firewalling, TLS verification, authentication, authorization, logging, or audit controls as a convenience.
- Do not actively scan external targets or attempt exploitation without explicit authorization.
- Do not expose credentials, tokens, private keys, certificates, sensitive paths, or confidential logs unnecessarily.
- Do not treat version strings alone as proof of vulnerability when configuration or backported patches may change exposure.
- Preserve administrative access, evidence, persistent data, service availability, and recovery throughout the work.

## Validation

- Prefer passive host, configuration, package, service, socket, firewall, TLS, log, and backup evidence before active tests.
- Validate configuration syntax before reload, restart, enablement, or access-control changes.
- Stage and verify SSH, sudo, and firewall changes without closing the current working session until new access is confirmed.
- After approved hardening, verify access, service health, logs, listening sockets, firewall state, TLS behavior, permissions, patch state, and recovery as applicable.
- Do not run broad scanners, exploit payloads, production-disrupting checks, upgrades, reboots, or destructive recovery tests automatically.
- State clearly which exposures, services, patches, controls, backups, and recovery paths remain unverified.

## Output

Separate findings into:

- urgent remotely reachable exposure;
- confirmed security misconfiguration;
- patching or support needs;
- defense-in-depth improvements.

For each material finding include evidence, affected boundary, realistic risk, safe remediation order, validation, rollback, and unresolved recovery or availability risk.
