---
name: project-discovery
description: Establish project context before implementation. Use when opening an unfamiliar repository, starting from an empty repository, choosing a technology stack, or preparing project-specific Codex instructions. Distinguish existing projects from greenfield projects and do not choose a greenfield stack without user approval.
---

# Project Discovery

Use this skill before project bootstrap or architecture work when the repository does not already provide enough reliable context.

## Classify the repository

Inspect only the repository root, Git status, existing instructions, manifests, lockfiles, and obvious runtime markers needed to classify it.

Choose one mode:

- **Existing project:** meaningful source code, manifests, framework files, or established structure already exist.
- **Greenfield project:** the repository is empty or contains only generic files such as a README, license, or `.gitignore`.
- **Ambiguous:** files exist, but they do not establish the intended product or stack.

## Existing-project workflow

1. Read the nearest applicable `AGENTS.md`.
2. Identify languages, frameworks, package managers, storage, deployment targets, generated files, and existing services from repository evidence.
3. Find the project's real validation commands from manifests, scripts, CI, or documentation.
4. Record uncertainty instead of inferring unsupported technologies.
5. Recommend the matching ecosystem skills and project-local rule templates.
6. Do not replace the established stack unless the user explicitly requests an architectural change.

## Greenfield workflow

Do not initialize a framework or select a language immediately.

First establish:

- product purpose and intended users;
- target platforms and deployment environment;
- required integrations, data, authentication, and offline needs;
- compatibility, budget, maintenance, and delivery constraints;
- technologies or infrastructure already available to the user;
- non-goals and irreversible choices.

Then present at most three realistic stack options. For each option, state only the meaningful trade-offs, operational burden, and why it fits. Recommend one option, but wait for explicit user approval before scaffolding code, adding dependencies, or creating framework files.

## Output

Keep the discovery result concise:

- repository mode;
- established or approved ecosystems;
- important constraints and unknowns;
- selected or proposed stack;
- next bootstrap action.

Do not create planning documents unless requested.
