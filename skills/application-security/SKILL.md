---
name: application-security
description: Review and improve application security using threat modeling, code and configuration evidence, secure design, dependency analysis, and targeted validation. Use for web, API, mobile, desktop, extension, service, and library security work.
---

# Application Security

Review the real architecture and data flows rather than applying a generic checklist blindly.

## Review Areas

- authentication, sessions, password and token handling;
- authorization at every object and privileged action boundary;
- input validation, output encoding, injection, unsafe deserialization, and command execution;
- file upload, path handling, archive extraction, and generated content;
- SSRF, redirects, URL fetching, webhooks, and outbound network access;
- CSRF, CORS, browser security headers, cookies, and client-side trust assumptions;
- secrets, cryptography, randomness, key management, and sensitive logging;
- data exposure, tenancy boundaries, retention, deletion, and error handling;
- dependency, build, package, update, plugin, and supply-chain behavior;
- rate limits, abuse resistance, auditability, and secure defaults.

## Workflow

1. Identify assets, actors, entry points, trust boundaries, privileged operations, and external integrations.
2. Trace sensitive inputs and authorization decisions through concrete code paths.
3. Check framework-native security controls and existing project conventions before adding custom mechanisms.
4. Confirm findings with the least invasive evidence available. Do not use exploit payloads against a live service unless explicitly authorized.
5. Fix the authoritative rule owner, not only the visible symptom. Keep validation at the boundary and authorization close to the protected action.
6. Add targeted regression tests for the vulnerable path and important negative cases.
7. Review whether the fix changes compatibility, data formats, permissions, or deployment configuration.

## Finding Quality

A valid finding must state the reachable path, required attacker capability, affected asset, missing or incorrect control, and realistic consequence. Mark uncertain findings clearly.

## Output

Prioritize confirmed high-impact issues, then likely weaknesses and hardening opportunities. Include code/config evidence, fix, tests, and residual risk.
