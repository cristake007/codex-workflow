---
type: project-context
project: Codex Workflow
status: active
date: 2026-07-20
repository: https://github.com/cristake007/codex-workflow
source-of-truth:
  - global/AGENTS.md
  - skills/README.md
related:
  - "[[Decisions/0001 - Adopt a curated engineering workflow pack]]"
tags:
  - workflow/project
---

# Codex Workflow

## Purpose

Provide Cristian with a controlled Codex engineering environment that combines global behavior, project-specific facts, focused technical skills, command rules, capture tooling, and validated workflow improvements.

## Canonical language

| Term | Meaning | Not the same as |
|---|---|---|
| Skill | Focused reusable behavior activated for a matching task | Global instruction or project fact |
| Rule | Command approval policy for an established ecosystem or capability | Engineering guidance |
| Capture | Raw evidence from an agent session | Reviewed knowledge |
| Improvement candidate | Proposed workflow change awaiting evaluation | Active instruction |
| Knowledge vault | Curated linked conclusions in `knowledge/` | Transcript archive |

## Core rules

- Reuse known context before inspecting the repository.
- Keep discovery and validation proportional to the task.
- Preserve user control over architecture, Git publication, production changes, and destructive actions.
- Separate technical readiness from requirements conformance.
- Promote workflow changes only after evidence and explicit approval.

## Main workflows

- Discover only missing project context.
- Implement bounded tasks using applicable ecosystem and capability skills.
- Capture prompts, commands, responses, and tool output as raw evidence.
- Review evidence in the knowledge vault.
- Test improvement candidates before changing active instructions.

## Boundaries and integrations

- `global/AGENTS.md` contains cross-project behavior.
- Project repositories contain their own `AGENTS.md` and `.codex/` configuration.
- `skills/` contains reusable focused disciplines.
- `knowledge/` contains curated cross-session memory.
- `projects/` contains local delivered and in-progress work and remains outside repository tracking.

## Current constraints

- Avoid broad repository scans for bounded work.
- Do not run heavy test suites or create infrastructure automatically.
- Do not automatically push implementation branches.
- Keep externally installed and repository-managed skills able to coexist.

## Non-goals

- Fully autonomous workflow modification.
- Automatic promotion of every session observation into active rules.
- Replacing project-specific source-of-truth documents with Obsidian notes.

## Sources of truth

- `global/AGENTS.md`
- `skills/README.md`
- project-level `AGENTS.md`
- current explicit user request

## Related decisions

- [[Decisions/0001 - Adopt a curated engineering workflow pack]]

## Open questions

- Which adapted skills measurably improve delivery quality or reduce unnecessary exploration?
- Which capture metrics can become reliable workflow evaluation signals?