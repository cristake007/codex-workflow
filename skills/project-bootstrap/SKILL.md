---
name: project-bootstrap
description: Create minimal project-specific Codex configuration after the repository context, approved ecosystems, and operational capabilities are already known. Activate when a new or existing repository needs project AGENTS.md, a project profile, environment notes, or selected project-local rules. Do not activate for ordinary implementation work, when project discovery is still unresolved, or when only one existing configuration file needs a bounded edit.
---

# Project Bootstrap

## Purpose

Create the smallest useful project-specific Codex configuration without duplicating global guidance or inventing repository facts.

## Activate when

- an approved greenfield project needs its initial Codex configuration;
- an existing repository lacks a project `AGENTS.md`, project profile, environment notes, or selected local rules;
- `project-discovery` has already established the repository mode, ecosystems, capabilities, and authoritative sources;
- the user explicitly requests project bootstrap, initialization, or regeneration from confirmed answers;
- repository-specific constraints must be recorded for future Codex sessions.

## Do not activate when

- required repository context, stack decisions, or capability choices are still unknown or unapproved;
- the task is ordinary source-code implementation, review, troubleshooting, or documentation work;
- the repository already has sufficient project-specific Codex configuration and no bootstrap change is requested;
- only one explicitly identified existing configuration file needs a bounded edit;
- the requested change belongs in global `AGENTS.md` rather than the project.

## Required context

Use facts already available in the prompt and conversation. Establish only missing bootstrap inputs:

- repository mode: existing, greenfield, or operational;
- project purpose, current status, intended users, and functional source of truth;
- approved ecosystems, operational capabilities, platforms, and deployment targets;
- important paths, protected locations, generated files, and persistent data;
- project-specific prohibited actions and production restrictions;
- approved automatic checks and manual validation commands;
- environment-specific information that may be documented safely;
- existing `AGENTS.md`, `.codex/`, environment, and rule files that must be preserved or merged.

## Workflow

1. Check the prompt, current conversation, and prior discovery result before inspecting the repository.
2. Confirm that the stack and capabilities are established or explicitly approved.
3. Inspect existing project instructions, `.codex/` files, environment notes, and local rules before generating replacements.
4. Create or update a concise project `AGENTS.md` containing only concrete repository-specific facts, constraints, protected paths, validation limits, security boundaries, and completion criteria.
5. Create `.codex/project-profile.json` with the confirmed repository mode, ecosystems, capabilities, and detection evidence.
6. Copy only selected ecosystem and capability rule templates into `.codex/rules/`.
7. Create `.codex/environment.local.example.md`; create a real local environment file only when the user provides machine-specific facts and requests it.
8. Omit empty sections and placeholders.
9. Report any conflict between existing configuration and confirmed project context instead of silently overwriting it.

## Stop conditions

Stop bootstrap when:

- the minimum requested project configuration exists and reflects confirmed facts;
- an unresolved stack, capability, security, or environment decision requires user input;
- an existing instruction or rule conflicts materially with the proposed generated content;
- further files would only duplicate global guidance or reusable skill content;
- the user requested only a bounded update to one existing configuration file.

## Guardrails

- Do not modify global `AGENTS.md` unless the user explicitly requests a global policy change.
- Do not select a greenfield technology stack or capability without user approval.
- Do not generate application source code as part of bootstrap.
- Do not copy generic language, Linux, security, or workflow guidance into project `AGENTS.md`.
- Do not overwrite existing instructions, profiles, environment files, or rules without reviewing and preserving relevant content.
- Do not include credentials, tokens, private keys, or other secret values.
- Do not create planning documents or additional documentation unless requested.

## Validation

- Confirm generated JSON is syntactically valid.
- Confirm project `AGENTS.md` contains only concrete repository-specific content.
- Confirm only approved ecosystems and capabilities appear in the profile and local rules.
- Confirm existing user-managed files were not overwritten without review.
- Run only targeted bootstrap validation; do not run application tests, builds, containers, or infrastructure checks automatically.
- State clearly which generated configuration was not exercised in a real Codex session.

## Output

Report only:

- files created or updated;
- confirmed ecosystems and capabilities recorded;
- existing configuration preserved or merged;
- targeted checks executed;
- unresolved decisions or conflicts;
- the exact bootstrap command when the user must run it manually.

## Resources

- `scripts/init-project.mjs` for mechanical profile, rule, environment, and project instruction generation.
- `scripts/` helpers and repository templates used by the bootstrap script.
