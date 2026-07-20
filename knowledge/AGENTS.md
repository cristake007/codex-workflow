# Knowledge Vault Agent Instructions

These instructions apply only inside `knowledge/`.

## Purpose

- Treat this directory as a curated Obsidian knowledge vault, not a transcript or raw-log archive.
- Preserve traceability from conclusions to captures, reports, commits, issues, specifications, and related notes.

## Note creation

- Create or update notes only when the user explicitly requests durable knowledge capture or an active workflow skill requires it.
- Use the closest template under `Templates/` and preserve its YAML properties.
- Store conclusions once and link related notes instead of duplicating text.
- Distinguish observed facts, interpretations, proposals, decisions, and experiment results.
- Use wiki links for vault notes and ordinary links or paths for external evidence.

## Safety and history

- Never store secrets, credentials, private keys, tokens, personal data, production dumps, or unredacted sensitive logs.
- Do not delete or rewrite an accepted historical decision because it changed; mark it `superseded` and link the replacement.
- Do not promote an improvement note directly into `global/AGENTS.md`, `rules/`, or `skills/`. Operational changes require a separate approved task.
- Do not add community plugins or commit workspace-specific Obsidian state.

## Validation

- Keep YAML valid and property names consistent.
- Check that evidence links and related-note links are meaningful.
- Update `Dashboard.md` only for active projects, open decisions, pending experiments, or current improvement candidates.
- State when evidence, status, or validation remains incomplete.