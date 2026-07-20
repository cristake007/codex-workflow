---
name: knowledge-capture
description: Capture durable project knowledge, session conclusions, decisions, experiments, patterns, and improvement candidates in the repository's Obsidian-compatible `knowledge/` vault. Activate only when the user explicitly asks to record, document, summarize, or promote knowledge. Do not activate for ordinary implementation logs.
disable-model-invocation: true
---

# Knowledge Capture

## Purpose

Turn useful evidence from coding sessions and workflow experiments into linked, reusable Markdown knowledge without duplicating raw logs or silently changing operational rules.

## Activate when

- the user explicitly asks to record a session, decision, experiment, pattern, lesson, or improvement candidate;
- a completed audit or capture report needs a durable review note;
- the user asks to update the Obsidian vault or project knowledge base.

## Do not activate when

- the task is ordinary implementation, debugging, or explanation;
- the only available content is raw command output with no reviewed conclusion;
- documentation was not requested;
- the note would duplicate an existing authoritative specification, ADR, or report.

## Required context

Identify the knowledge type, project, source evidence, current status, related notes, applicable template, and whether the conclusion is observed, inferred, proposed, tested, accepted, rejected, or superseded.

## Workflow

1. Use the matching template under `knowledge/Templates/`.
2. Store the note in the appropriate area: `Projects`, `Sessions`, `Decisions`, `Experiments`, `Patterns`, or `Improvements`.
3. Summarize conclusions and link to raw captures, reports, commits, issues, specifications, and related notes instead of copying large evidence blocks.
4. Use consistent YAML properties for type, project, status, date, source, and tags.
5. Distinguish facts, interpretations, decisions, and proposals.
6. Record why a decision was made, what evidence supports it, and what would invalidate it.
7. Link improvement candidates to the session or experiment that produced them.
8. Update `knowledge/Dashboard.md` only when a new active item should be surfaced.

## Stop conditions

Stop when the durable conclusion is captured once, evidence and relationships are linked, status is explicit, and no operational file needs to change.

## Guardrails

- Do not store secrets, credentials, personal data, production dumps, or unredacted sensitive logs.
- Do not treat the vault as an automatic transcript archive.
- Do not promote an improvement candidate directly into `AGENTS.md`, rules, or skills without a separate approved and validated change.
- Do not overwrite historical decisions; mark them superseded and link the replacement.
- Do not create community-plugin dependencies for the vault.
- Keep workspace-specific Obsidian state out of Git.

## Validation

Check template conformity, valid YAML, working relative or wiki links where practical, unique capture of the conclusion, evidence traceability, and explicit status.

## Output

Report notes created or updated, their knowledge type and status, linked evidence, dashboard changes, and any proposed operational change that still requires approval.