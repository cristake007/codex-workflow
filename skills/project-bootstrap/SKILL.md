---
name: project-bootstrap
description: Create minimal project-specific Codex configuration inside a confirmed target repository after context, stack, capabilities, and repository boundary are known. Activate only for explicit project bootstrap, initialization, or regeneration. Do not activate for implementation, review, unresolved discovery, or a bounded edit to one existing configuration file.
---

# Project Bootstrap

## Purpose

Generate the smallest useful project configuration without duplicating global guidance or crossing repository boundaries.

## Activate when

- the user explicitly requests project bootstrap or regeneration;
- an approved project needs `AGENTS.md`, a profile, environment notes, or selected local rules;
- discovery has confirmed the target directory, nearest Git root, stack, and capabilities.

## Do not activate when

- the target directory or repository boundary is unresolved;
- ordinary implementation, review, troubleshooting, or documentation is requested;
- sufficient project configuration already exists and no bootstrap change was requested.

## Required context

Confirm the target directory and Git root, project purpose and source of truth, approved ecosystems and capabilities, protected or generated locations, validation limits, environment facts, and existing files to preserve.

## Workflow

1. Reuse confirmed prompt, conversation, and discovery facts.
2. Resolve the exact target and its nearest Git root before writing.
3. Reject a parent repository when the intended project is an ignored child workspace.
4. Inspect existing project instructions and `.codex` files inside the target.
5. Generate only requested project configuration, omitting empty sections and placeholders.
6. Preserve existing user-managed content and report conflicts instead of overwriting them silently.

## Stop conditions

Stop when the minimum requested configuration exists, the target or Git root is ambiguous, an ignored child is not its own confirmed repository, a material decision is unresolved, or further files would duplicate global guidance.

## Guardrails

- Do not modify global `AGENTS.md` without an explicit global-policy request.
- Do not write project configuration into a parent workspace repository.
- Do not change ignore rules, initialize Git, or alter repository ownership to make files trackable.
- Do not stage or commit child-project files in a parent repository.
- Do not choose a stack, generate application source, expose secrets, or create extra documentation.

## Validation

- Confirm every generated file is inside the explicit target and intended Git root.
- Confirm no parent repository or ignore rule changed.
- Validate generated JSON and recorded ecosystems or capabilities.
- Confirm existing user-managed files were preserved.
- Do not run application tests, builds, containers, or infrastructure checks.

## Output

Report the target and Git root, files created or updated, recorded ecosystems and capabilities, preserved content, targeted checks, conflicts, and any manual bootstrap command.

## Resources

- `scripts/init-project.mjs` and its repository templates perform the mechanical generation.