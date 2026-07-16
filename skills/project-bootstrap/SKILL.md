---
name: project-bootstrap
description: Create minimal project-specific Codex configuration after project discovery. Use when the user has approved a greenfield stack or when an existing repository needs AGENTS.md, a project profile, environment notes, and selected project-local ecosystem rules.
---

# Project Bootstrap

Use only after `project-discovery` has established the repository mode and the ecosystems are known or explicitly approved.

## Required behavior

1. Keep global `AGENTS.md` unchanged unless the user specifically requests a global policy change.
2. Create or update a concise project `AGENTS.md` containing only repository-specific facts, constraints, protected locations, approved automatic checks, manual validation commands, and completion criteria.
3. Do not copy generic language guidance into `AGENTS.md`; use ecosystem skills for technical conventions.
4. Create `.codex/project-profile.json` to record the selected ecosystems and discovery mode.
5. Copy only the selected rule templates into `.codex/rules/`.
6. Create `.codex/environment.local.example.md`; create the real local file only when the user provides machine-specific information.
7. Never overwrite an existing instruction, profile, environment, or rule file without reviewing it first.

## Bootstrap script

The bundled script performs the mechanical profile and rule installation:

```text
node scripts/init-project.mjs --target /path/to/project --ecosystems php,javascript,docker
```

For an empty repository, `--ecosystems` must reflect a stack already approved by the user. For an existing repository, the script may detect likely ecosystems, but the agent must review the result before accepting it.

The script does not select a technology stack and does not generate application source code.

## Project `AGENTS.md`

Generate the smallest useful file. Include only sections that have concrete content:

- project purpose and current status;
- functional source of truth;
- approved technologies and supported platforms;
- important paths and protected/generated locations;
- project-specific rules and prohibited actions;
- approved automatic checks and manual validation commands;
- completion criteria.

Avoid placeholders in the final file. Use `Not applicable` only when omitting a section would make the constraint ambiguous.
