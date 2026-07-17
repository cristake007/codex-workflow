---
name: security-review
description: Coordinate authorized defensive security work across application and Linux server boundaries. Activate for explicit threat modeling, broad security review, vulnerability triage, hardening assessment, or mixed-boundary work. Do not activate for ordinary quality review or when a clearly scoped application-only or server-only task can use its specialist skill directly.
---

# Security Review

## Purpose

Establish authorized scope, classify boundaries, build a concise threat model, and route work to the correct specialist skill.

## Activate when

- the user explicitly requests a threat model, security review, hardening assessment, or vulnerability triage;
- application and server boundaries are mixed or unclear;
- authorization and active-testing limits must be established.

## Do not activate when

- the task is ordinary correctness or delivery review;
- `application-security` or `server-security` directly owns a clear boundary;
- offensive activity is unauthorized.

## Required context

Confirm ownership and authorization, in-scope application and server boundaries, environment and production status, assets and actors, trust boundaries and entry points, sensitive data, public and administrative exposure, active-testing limits, and authoritative evidence.

## Workflow

1. Establish authorization, scope, environment, production impact, and testing limits.
2. Route application work to `application-security`, server work to `server-security`, and mixed work to both with separated findings.
3. Build a concise threat model.
4. Inspect only the smallest authoritative evidence needed.
5. Distinguish confirmed vulnerabilities, likely weaknesses, hardening improvements, and observations.
6. Rank findings by exploitability, impact, exposure, confidence, and remediation cost.
7. Recommend the smallest effective remediation without duplicating specialist workflows.

## Stop conditions

Stop when scope and boundaries are established, findings are supported and routed, further testing requires unavailable authorization or access, or only specialist work remains.

## Guardrails

- Use only for defensive work on authorized systems.
- Do not scan third parties, bypass authentication, create persistence, exfiltrate data, or use destructive payloads without explicit authorization.
- Do not infer vulnerabilities from version strings alone or expose sensitive evidence.
- Keep application and server findings separated and do not label preferences as vulnerabilities.

## Validation

- Validate scope before active testing.
- Prefer passive code, configuration, version, and log evidence.
- Use the least invasive confirmation and specialist validation available.
- State untested boundaries, attack paths, versions, configurations, and runtime behavior.

## Output

Report authorized scope and limits, the threat model, affected boundaries, findings by boundary and confidence, evidence and realistic risk, remediation priority, validation, rollback, and untested assumptions.