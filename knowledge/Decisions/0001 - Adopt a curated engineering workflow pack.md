---
type: decision
project: Codex Workflow
status: accepted
date: 2026-07-20
decision-id: CW-0001
supersedes:
related:
  - "[[Projects/Codex Workflow]]"
  - "[[Improvements/Evaluate the adapted workflow pack]]"
tags:
  - workflow/decision
---

# Adopt a curated engineering workflow pack

## Context

The repository already contains strong technical, safety, discovery, Git, and validation controls. Matt Pocock's skills add useful engineering processes, but installing the complete upstream set unchanged would introduce overlapping setup conventions, automatic commits, mandatory interviews, broad architecture scans, and testing behavior that conflicts with this workflow.

## Decision

Adapt a bounded subset of engineering concepts into repository-native skills while keeping the existing global instructions and specialist skills authoritative.

The adopted set covers requirements interviewing, specification synthesis, session-sized tickets, TDD, bug diagnosis, domain modeling, codebase design, merge conflict resolution, and Obsidian knowledge capture.

## Reasons

- Add reusable engineering process without replacing established safeguards.
- Preserve proportional discovery and validation.
- Keep documentation and orchestration user-invoked.
- Avoid automatic commits, pushes, issue creation, architecture scans, and heavy tests.
- Make each skill testable through the existing capture and improvement workflow.

## Alternatives considered

### Install the entire upstream repository unchanged

- Benefits: immediate access to every upstream workflow.
- Costs: instruction overlap, incompatible defaults, more automatic activation, and harder debugging of agent behavior.
- Reason rejected: too much behavioral drift for an untested migration.

### Keep only the existing skills

- Benefits: no added complexity.
- Costs: missing reusable workflows for requirements, tickets, diagnosis, domain language, and durable knowledge.
- Reason rejected: the capture system needs a stronger review and knowledge layer.

## Consequences

### Positive

- Existing technical skills remain stable.
- New workflows share one repository contract and installer.
- The Obsidian vault provides durable linked memory.
- Adapted skills can be evaluated independently.

### Negative or accepted risk

- The repository now contains more skills and potential activation interactions.
- Upstream changes will not be inherited automatically.
- The adapted workflows still need real-session evaluation.

## Evidence

- Existing skill contract in `skills/README.md`.
- Existing global boundaries in `global/AGENTS.md`.
- Upstream concepts and MIT license recorded in `THIRD_PARTY_NOTICES.md`.

## Validation or review trigger

Review this decision after several captured sessions or when evidence shows increased skill overactivation, unnecessary questioning, or reduced delivery quality.

## Related notes

- [[Projects/Codex Workflow]]
- [[Improvements/Evaluate the adapted workflow pack]]