# Codex Workflow Knowledge Vault

Open this `knowledge/` directory as a standalone Obsidian vault.

The vault is the curated memory layer between raw Codex captures and operational workflow changes:

```text
raw captures and audit evidence
            ↓
reviewed Obsidian notes
            ↓
validated decisions and experiments
            ↓
approved changes to skills, rules, or AGENTS.md
```

## Principles

- Keep raw prompts, command logs, and generated reports in their existing capture locations.
- Store conclusions, relationships, decisions, patterns, and experiment outcomes here.
- Link to evidence instead of copying large logs into notes.
- Treat proposed improvements as candidates until they are tested and approved.
- Never store secrets, credentials, private production data, or unredacted sensitive logs.
- Mark replaced decisions as `superseded` and link the replacement rather than deleting history.

## Suggested areas

```text
knowledge/
├── Dashboard.md
├── Projects/       project context and specifications
├── Sessions/       reviewed session summaries
├── Decisions/      architectural and workflow decisions
├── Experiments/    controlled workflow experiments
├── Patterns/       reusable observed practices
├── Improvements/   candidates awaiting validation
├── Attachments/    intentionally tracked supporting files
└── Templates/      core Obsidian templates
```

Create area folders lazily when the first note is needed. Use the matching file in `Templates/` and keep YAML properties intact.

## Obsidian setup

The tracked vault configuration enables the core Templates plugin and points it to `Templates`. Workspace layout files are ignored because they change whenever notes are opened.

No community plugins are required. Backlinks, graph view, search, properties, and templates are sufficient for the initial workflow.

## Promotion rule

A note in `Improvements/` does not automatically change agent behavior. Promotion into `global/AGENTS.md`, `rules/`, or `skills/` requires a separate implementation task with evidence and proportional validation.