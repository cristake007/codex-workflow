---
name: application-security
description: Review or improve authorized application security through threat modeling, concrete code and configuration evidence, secure design, dependency analysis, and targeted tests. Activate for explicit application-security work involving trust, privilege, sensitive data, dependencies, or abuse resistance. Do not activate for ordinary code review, server-only hardening, or unauthorized exploitation.
---

# Application Security

## Purpose

Find and remediate realistic application weaknesses by tracing sensitive data and privileged actions through concrete boundaries.

## Activate when

- reviewing authentication, authorization, sessions, tenancy, secrets, files, URLs, commands, or sensitive data;
- assessing injection, browser controls, cryptography, dependencies, supply chain, rate limits, or abuse resistance;
- the user explicitly requests application threat modeling, vulnerability review, or security remediation.

## Do not activate when

- the task is ordinary correctness, style, or delivery review with no security objective;
- the work is server-only hardening;
- active exploitation is unauthorized.

## Required context

Confirm authorization and testing limits, architecture and integrations, assets and actors, trust and privilege boundaries, authentication and tenancy, sensitive inputs and outputs, framework controls, exposure and deployment, dependencies, and permitted tests.

## Workflow

1. Establish authorization, environment, production impact, and testing limits.
2. Identify assets, entry points, trust boundaries, privileged operations, and relevant review areas.
3. Trace sensitive inputs and authorization decisions through concrete code and configuration.
4. Prefer framework-native controls before custom mechanisms.
5. Confirm findings with the least invasive evidence.
6. For each finding, state reachability, attacker capability, asset, missing control, and consequence.
7. Fix the authoritative boundary and add targeted positive and negative regression tests when implementation is in scope.
8. Review compatibility, data, permission, dependency, and deployment impacts.

## Stop conditions

Stop when in-scope boundaries are assessed, findings are evidenced or marked uncertain, remediation and validation are clear, further work requires unavailable authorization or access, or remaining work belongs to another skill.

## Guardrails

- Use only for authorized defensive work.
- Do not bypass authentication, steal credentials, create persistence, exfiltrate data, or test destructive payloads.
- Do not report checklist items as vulnerabilities without a reachable path.
- Do not expose secrets or replace framework controls without a concrete need.
- Separate confirmed vulnerabilities, likely weaknesses, hardening, and assumptions.

## Validation

- Check remediation against the protected trust or privilege boundary, not only one visible route.
- Prefer code, configuration, dependency, and targeted regression-test evidence.
- Use only approved narrowly scoped security and ecosystem checks.
- State attack paths, environments, dependencies, integrations, and runtime behavior not verified.

## Output

Prioritize findings by impact and confidence. Include affected boundary, evidence, reachable attack path, attacker capability, impact, smallest remediation, targeted tests, compatibility, deployment, and residual risk.