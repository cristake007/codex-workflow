---
name: linux-troubleshooting
description: Diagnose unresolved Linux system, service, resource, storage, permission, package, network, DNS, and log problems with an evidence-first workflow. Activate when the cause is unknown or competing explanations must be distinguished. Do not activate when the cause and approved correction are already established and the task is only to apply a known administrative change.
---

# Linux Troubleshooting

## Purpose

Identify the most likely cause of an unresolved Linux problem using the smallest safe set of observations before changing system state.

## Activate when

- a Linux command, service, host, container, network path, package, mount, permission, DNS lookup, certificate, or resource behaves unexpectedly;
- the user reports an outage, degraded performance, intermittent failure, or unexplained difference between environments;
- the cause is unknown, evidence is incomplete, or multiple plausible causes must be distinguished;
- a proposed fix would otherwise be speculative;
- diagnosis must precede service management, system administration, configuration replacement, cleanup, or restart.

## Do not activate when

- the cause has already been established with sufficient evidence in the prompt or current conversation;
- the user has already approved a specific, known administrative change and no diagnostic question remains;
- the task is routine Linux administration rather than diagnosis;
- the task is limited to editing an explicitly identified file and the expected correction is already known;
- the problem is not related to a Linux system or Linux-hosted service.

An exact file, service, or command path is not by itself a reason to skip troubleshooting when the underlying symptom remains unresolved.

## Required context

Use facts already available in the prompt and conversation before requesting or inspecting more information. Establish only what is needed to distinguish likely causes:

- distribution and version;
- kernel and init system when relevant;
- host, virtual machine, container, or orchestration context;
- current user and available privileges;
- production, staging, testing, or local status;
- exact symptom, expected behavior, actual behavior, first occurrence, frequency, and recent changes;
- affected service, command, endpoint, path, dependency, or resource;
- actions already attempted and their results;
- availability of backups, maintenance windows, and rollback paths before state changes.

## Workflow

1. Check the prompt and current conversation for environment facts, prior evidence, attempted actions, and already disproven causes.
2. Define the symptom precisely: command or service, expected result, actual result, timing, scope, and recent changes.
3. Identify the smallest relevant diagnostic layer:
   - process and resource state;
   - systemd unit state and recent journal entries;
   - network interfaces, routes, sockets, DNS, TLS, and proxies;
   - storage capacity, inodes, mounts, filesystems, permissions, and ownership;
   - package, runtime, dependency, environment, and configuration state;
   - container, namespace, bind-mount, or host/container boundary.
4. Gather concise read-only evidence from that layer before broadening the search.
5. Preserve evidence. Do not restart services, kill processes, clear caches, rotate logs, delete files, or replace configuration merely to see whether the symptom disappears.
6. Form one or more testable causes and identify the least invasive observation that can distinguish them.
7. State the most likely cause only when supported by evidence; otherwise keep competing hypotheses explicit.
8. Propose the smallest reversible correction, including backup, native configuration validation, reload or restart requirements, and rollback.
9. After an approved change, verify the original symptom, service health, logs, resource state, and dependent services.

## Stop conditions

Stop diagnosis when:

- one cause is supported strongly enough to justify a specific correction;
- the remaining uncertainty does not affect the proposed safe action;
- additional evidence requires unavailable access, credentials, production authorization, or user-executed commands;
- the next step would modify production, delete data, restart a critical service, change access controls, or perform another action requiring explicit approval;
- repeated commands would only reproduce already collected evidence.

## Guardrails

- Do not assume a Linux distribution, package manager, init system, firewall, security module, or network topology; detect or confirm it.
- Do not disable SELinux, AppArmor, firewalls, TLS verification, authentication, authorization, or access controls as a shortcut.
- Do not reboot, restart production services, remove packages, delete data, prune containers or volumes, change ownership broadly, or alter permissions without explicit authorization.
- Back up configuration before editing it.
- Prefer native validation commands before reload or restart.
- Redact credentials, tokens, cookies, private keys, certificates, and sensitive log values.
- Distinguish observations, hypotheses, confirmed causes, and untested assumptions.
- State which commands were suggested but not executed.

## Validation

- Prefer concise, read-only, targeted commands first.
- Validate a proposed configuration with the service's native syntax or configuration checker before applying it.
- After an approved correction, recheck the original symptom and the smallest relevant health indicators.
- Do not run broad scans, upgrades, cleanup operations, restarts, integration tests, or destructive checks unless explicitly requested and authorized.
- Never claim a service or system is healthy when the relevant verification was not performed.

## Output

Report only:

- the exact symptom and environment used;
- the most likely cause or remaining hypotheses;
- supporting evidence;
- the smallest safe correction;
- validation commands;
- rollback steps;
- actions not executed and unresolved risks.
