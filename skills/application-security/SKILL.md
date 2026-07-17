---
name: application-security
description: Review and improve authorized application security using threat modeling, concrete code and configuration evidence, secure design, dependency analysis, and targeted validation. Activate for web, API, mobile, desktop, extension, service, and library security work involving authentication, authorization, input handling, data exposure, secrets, dependencies, or abuse resistance. Do not activate for server-only hardening, ordinary code review with no security objective, or unauthorized active exploitation.
---

# Application Security

## Purpose

Identify and remediate realistic application security weaknesses by tracing assets, trust boundaries, sensitive inputs, privileged actions, and security controls through concrete code and configuration paths.

## Activate when

- reviewing or changing authentication, sessions, passwords, tokens, authorization, tenancy, or privileged actions;
- assessing input validation, output encoding, injection, command execution, deserialization, file handling, SSRF, redirects, webhooks, or outbound requests;
- reviewing CSRF, CORS, cookies, browser headers, client trust, secrets, cryptography, logging, retention, or error handling;
- assessing dependencies, packages, builds, plugins, updates, supply chain, rate limits, abuse resistance, or secure defaults;
- the user requests application threat modeling, vulnerability review, security remediation, or regression tests for a security path.

## Do not activate when

- the task is Linux host hardening or exposed-service security with no application boundary;
- the task is ordinary correctness, style, maintainability, or delivery review with no security objective;
- the user requests unauthorized exploitation, credential theft, persistence, exfiltration, destructive payloads, or third-party scanning;
- repository discovery is still required to determine the application architecture;
- another skill owns the task and no application-security decision remains.

A bounded file or code-path review can still require this skill when the requested behavior crosses an application trust or privilege boundary.

## Required context

Use facts already available in the prompt and conversation. Establish only missing application-security context:

- ownership, authorization, environment, and active-testing limits;
- application architecture, frameworks, entry points, APIs, clients, services, and external integrations;
- assets, actors, trust boundaries, privileged operations, and plausible abuse cases;
- authentication, session, token, authorization, tenancy, and administrative models;
- sensitive inputs, outputs, files, URLs, commands, data stores, secrets, logs, and retention rules;
- framework-native security controls and existing project conventions;
- public exposure, deployment boundaries, dependencies, build and update paths;
- targeted security tests and validation commands permitted by the repository.

## Workflow

1. Confirm ownership, authorization, environment, production impact, and active-testing limits.
2. Identify assets, actors, entry points, trust boundaries, privileged operations, and external integrations.
3. Select only the review areas relevant to the task: authentication, authorization, inputs, outputs, files, URLs, browser controls, secrets, cryptography, data exposure, dependencies, supply chain, abuse resistance, or secure defaults.
4. Trace sensitive inputs and authorization decisions through concrete code and configuration paths.
5. Check framework-native security controls and established project conventions before proposing custom mechanisms.
6. Confirm each finding with the least invasive evidence available.
7. State the reachable path, required attacker capability, affected asset, missing or incorrect control, and realistic consequence.
8. Fix the authoritative rule owner rather than only the visible symptom.
9. Keep validation at boundaries and authorization close to the protected action.
10. Add targeted regression tests for the vulnerable path and important negative cases when implementation is in scope.
11. Review compatibility, data formats, permissions, dependencies, and deployment impacts of the fix.

## Stop conditions

Stop when:

- each in-scope trust or privilege boundary has been assessed sufficiently;
- findings have concrete reachable paths and evidence, or are clearly marked uncertain;
- the smallest effective remediation and validation approach are identified;
- further work requires unavailable authorization, credentials, production access, exploit payloads, or active testing;
- remaining work belongs to server security, ecosystem implementation, or delivery review.

## Guardrails

- Use only for defensive work on systems the user owns or is authorized to assess.
- Do not test exploit payloads against live or production services without explicit authorization.
- Do not bypass authentication, steal credentials, create persistence, exfiltrate data, or perform destructive testing.
- Do not report generic checklist items as vulnerabilities without a reachable path and realistic consequence.
- Do not expose secrets, tokens, private keys, sensitive data, or confidential evidence in output.
- Do not replace framework-native security controls with custom mechanisms without a concrete need.
- Distinguish confirmed vulnerabilities, likely weaknesses, hardening opportunities, and untested assumptions.

## Validation

- Prefer code, configuration, dependency, and targeted test evidence before active runtime testing.
- Add or recommend regression tests for the vulnerable path and important negative cases.
- Use only repository-approved targeted security, unit, integration, lint, type, or dependency checks.
- Do not run broad scanners, exploit frameworks, destructive payloads, production tests, or dependency upgrades automatically.
- Verify that remediation protects the authoritative boundary rather than only one visible input or route.
- State clearly which attack paths, environments, dependencies, integrations, and runtime behavior remain untested.

## Output

Prioritize confirmed high-impact issues, then likely weaknesses and defense-in-depth improvements. For each material finding include:

- affected asset and boundary;
- concrete code or configuration evidence;
- reachable attack path and required attacker capability;
- realistic impact and confidence;
- smallest effective remediation;
- targeted validation and regression tests;
- compatibility, deployment, and residual risk.
