---
name: security-review
description: Route and coordinate authorized defensive security work across application code and Linux servers. Activate for threat modeling, broad security reviews, hardening requests, vulnerability triage, or mixed application/server assessments whose security boundary must be classified. Do not activate for ordinary quality review, for unauthorized offensive testing, or when a clearly scoped application-only or server-only task can use the specialist skill directly.
---

# Security Review

## Purpose

Establish authorized security scope, classify the affected boundaries, build a concise threat model, and route evidence-based work to the correct specialist skill.

## Activate when

- the user requests a security review, threat model, hardening assessment, vulnerability triage, or security posture evaluation;
- application and server boundaries are both involved or the affected boundary is not yet clear;
- authorization, production impact, active-testing limits, or sensitive-data handling must be established before review;
- findings must be ranked consistently across code, configuration, infrastructure, and operations;
- security work needs coordination between `application-security` and `server-security`.

## Do not activate when

- the task is an ordinary correctness, maintainability, or delivery review with no security objective;
- a clearly scoped application-only task can use `application-security` directly;
- a clearly scoped Linux server-only task can use `server-security` directly;
- the user requests unauthorized scanning, exploitation, persistence, credential theft, exfiltration, or destructive activity;
- the prompt lacks enough ownership or authorization context to proceed safely with active testing.

## Required context

Use facts already available in the prompt and conversation. Establish only missing security context:

- system ownership and user authorization;
- application, server, network, data, identity, and third-party boundaries in scope;
- production, staging, testing, local, or offline environment;
- assets, actors, trust boundaries, entry points, privileged operations, and plausible abuse cases;
- sensitive data, secrets, credentials, regulated information, and logging restrictions;
- public exposure, authentication, authorization, administrative access, and recovery paths;
- whether active testing, scanning, exploit payloads, service changes, or production changes are permitted;
- authoritative code, configuration, versions, logs, and validation sources.

## Workflow

1. Check the prompt and conversation for ownership, authorization, scope, environment, production impact, and active-testing limits.
2. Classify the work:
   - application code, APIs, dependencies, authentication, authorization, and data flows: use `application-security`;
   - Linux hosts, exposed services, SSH, firewall, patching, permissions, logs, backups, and host containers: use `server-security`;
   - mixed systems: use both and keep findings separated by boundary.
3. Build a concise threat model: assets, actors, trust boundaries, entry points, privileged operations, and plausible abuse cases.
4. Inspect the smallest authoritative evidence needed from code paths, configuration, logs, versions, and reproducible behavior.
5. Distinguish confirmed vulnerabilities, likely weaknesses, defense-in-depth improvements, and informational observations.
6. Rank findings by exploitability, impact, exposure, confidence, and remediation cost.
7. Recommend the smallest effective remediation and include validation and rollback when runtime state changes.
8. Route implementation or deeper analysis to the appropriate specialist skill without duplicating its workflow.

## Stop conditions

Stop when:

- scope, authorization, boundaries, and testing limits are sufficiently established;
- each in-scope boundary is routed to the correct specialist workflow;
- findings are supported by available evidence and ranked consistently;
- further testing requires unavailable authorization, credentials, production access, active scanning, or state changes;
- remaining work is specialist application or server security analysis rather than coordination.

## Guardrails

- Use only for defensive work on systems the user owns or is authorized to assess.
- Do not scan third-party targets, bypass authentication, create persistence, exfiltrate data, or test destructive payloads without explicit authorization and scope.
- Do not claim a vulnerability from a version string alone when configuration or backported patches may change exposure.
- Do not print secret values, private keys, session tokens, credentials, or sensitive evidence unnecessarily.
- Do not mix application and server findings without identifying the affected boundary.
- Do not present hardening preferences as confirmed vulnerabilities.
- Do not change production, access controls, firewalling, authentication, or persistent data without explicit approval and rollback.

## Validation

- Validate scope and authorization before active testing.
- Prefer passive code, configuration, version, and log evidence before scans or runtime changes.
- Confirm findings with the least invasive method available.
- Use specialist validation from `application-security` or `server-security` for boundary-specific findings.
- Do not run broad scanners, exploit payloads, destructive tests, or production changes automatically.
- State clearly which boundaries, attack paths, versions, configurations, and runtime behavior remain untested.

## Output

Report only:

- authorized scope and testing limits;
- concise threat model;
- affected application and server boundaries;
- findings grouped by boundary and confidence;
- evidence, realistic attack path, impact, and remediation priority;
- validation and rollback requirements;
- scope limitations and untested assumptions.
