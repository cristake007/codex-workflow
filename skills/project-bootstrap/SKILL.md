---
name: project-bootstrap
description: Create minimal project-specific Codex configuration after project discovery. Use when the user has approved a greenfield stack or operational capability, or when an existing repository needs AGENTS.md, a project profile, environment notes, and selected project-local rules.
---

# Project Bootstrap

Use only after `project-discovery` has established the repository mode and the ecosystems or capabilities are known or explicitly approved.

## Required behavior

1. Keep global `AGENTS.md` unchanged unless the user specifically requests a global policy change.
2. Create a concise project `AGENTS.md` containing only repository-specific facts, constraints, protected locations, approved automatic checks, manual validation commands, security boundaries, and completion criteria.
3. Do not copy generic language, Linux, or security guidance into `AGENTS.md`; use focused skills for reusable technical conventions.
4. Create `.codex/project-profile.json` to record discovery mode, selected ecosystems, selected capabilities, and detection evidence.
5. Copy only the selected ecosystem and capability rule templates into `.codex/rules/`.
6. Create `.codex/environment.local.example.md`; create the real local file only when the user provides machine-specific information.
7. Never overwrite an existing instruction, profile, environment, or rule file without reviewing it first.

## Bootstrap script

Mechanical profile and rule installation:

```text
node init-project.mjs --target /path/to/project --ecosystems php,javascript,docker --capabilities linux,application-security
```

Interactive project questions and `AGENTS.md` generation:

```text
node init-project.mjs --target /path/to/project --interactive
```

Repeatable generation from confirmed answers:

```text
node init-project.mjs --target /path/to/project --answers project-answers.json
```

For an empty repository, selected ecosystems or capabilities must already be approved by the user. For an existing repository, detected technologies and capability hints must be reviewed before acceptance.

The script does not select a technology stack, generate application source code, or change global instructions.

## Project `AGENTS.md`

Generate the smallest useful file. Include only sections that have concrete content:

- project purpose, current status, and intended users;
- functional source of truth;
- approved technologies, operational capabilities, and supported platforms;
- important paths and protected or generated locations;
- scope, non-goals, project rules, and prohibited actions;
- security and compatibility boundaries when provided;
- approved automatic checks and manual validation commands;
- completion criteria.

Avoid placeholders in the generated file. Omit empty sections instead of filling them with generic text.
