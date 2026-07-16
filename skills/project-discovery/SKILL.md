---
name: project-discovery
description: Establish project context before implementation. Use when opening an unfamiliar repository, starting from an empty repository, choosing a technology stack, selecting Linux or security capabilities, or preparing project-specific Codex instructions. Do not choose a greenfield stack without user approval.
---

# Project Discovery

Use this skill before project bootstrap or architecture work when the repository does not already provide enough reliable context.

## Classify the repository

Inspect only the repository root, Git status, existing instructions, manifests, lockfiles, obvious runtime markers, and operational configuration needed to classify it.

Choose one mode:

- **Existing project:** meaningful source code, manifests, framework files, infrastructure, or established structure already exist.
- **Greenfield project:** the repository is empty or contains only generic files such as a README, license, or `.gitignore`.
- **Ambiguous:** files exist, but they do not establish the intended product, stack, or operational purpose.

## Existing-project workflow

1. Read the nearest applicable `AGENTS.md`.
2. Identify languages, frameworks, package managers, storage, deployment targets, generated files, existing services, and supported platforms from repository evidence.
3. Find real validation commands from manifests, scripts, CI, or documentation.
4. Detect Linux or security evidence only as a capability hint; do not activate cross-cutting capabilities silently.
5. Record uncertainty instead of inferring unsupported technologies or access rights.
6. Recommend matching ecosystem skills, capability skills, and project-local rule templates.
7. Do not replace the established stack unless the user explicitly requests an architectural change.

## Greenfield workflow

Do not initialize a framework or select a language immediately.

First establish:

- product or operational purpose and intended users;
- target platforms, host roles, and deployment environment;
- required integrations, data, authentication, and offline needs;
- compatibility, budget, maintenance, and delivery constraints;
- technologies, servers, and infrastructure already available;
- non-goals and irreversible choices;
- whether Linux administration, application security, or server security is in scope;
- authorized security-testing scope and production restrictions.

For a software product, present at most three realistic stack options with meaningful trade-offs and recommend one, but wait for explicit approval before scaffolding code or adding dependencies.

For a Linux operations or hardening repository, a capability-only setup is valid when the user has explicitly approved it; a programming ecosystem is not mandatory.

## Output

Keep the discovery result concise:

- repository mode;
- established or approved ecosystems;
- approved operational capabilities;
- important constraints and unknowns;
- selected or proposed stack;
- next bootstrap action.

Do not create planning documents unless requested.
