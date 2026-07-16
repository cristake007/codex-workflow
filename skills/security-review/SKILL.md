---
name: security-review
description: Route and coordinate authorized defensive security work across application code and Linux servers. Use for threat modeling, security reviews, hardening requests, vulnerability triage, and mixed application/server assessments.
---

# Security Review

Use only for defensive work on systems the user owns or is authorized to assess.

## Workflow

1. Confirm scope, ownership or authorization, environment, sensitive data, production impact, and whether active testing is permitted.
2. Classify the work:
   - application code, APIs, dependencies, authentication, authorization, and data flows: use `application-security`;
   - Linux hosts, exposed services, SSH, firewall, patching, permissions, logs, and backups: use `server-security`;
   - mixed systems: use both and keep findings separated by boundary.
3. Build a concise threat model before searching for vulnerabilities: assets, actors, trust boundaries, entry points, privileged operations, and plausible abuse cases.
4. Prefer evidence from code paths, configuration, logs, versions, and reproducible behavior over checklist-only findings.
5. Rank findings by exploitability, impact, exposure, confidence, and remediation cost.
6. Recommend the smallest effective fix and include validation and rollback when the fix changes runtime state.

## Guardrails

- Do not scan third-party targets, attempt exploitation, bypass authentication, create persistence, exfiltrate data, or test destructive payloads without explicit authorization and scope.
- Do not claim a vulnerability from a version string alone when configuration or backported patches may change exposure.
- Do not print secret values or sensitive evidence unnecessarily.
- Distinguish confirmed vulnerabilities, likely weaknesses, defense-in-depth improvements, and informational observations.

## Output

For each finding include: affected boundary, evidence, realistic attack path, impact, confidence, remediation, and validation. State scope limitations and untested assumptions.
