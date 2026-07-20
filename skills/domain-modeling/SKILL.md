---
name: domain-modeling
description: Establish or sharpen canonical business terminology, domain rules, boundaries, and consequential architectural decisions. Activate when the user explicitly asks for domain modeling, glossary work, context mapping, or an ADR. Do not activate merely to read existing terminology.
---

# Domain Modeling

## Purpose

Create a shared language that keeps requirements, code, tests, and documentation aligned without mixing business concepts with implementation details.

## Activate when

- the user asks to define domain concepts, terminology, relationships, or bounded contexts;
- vague or conflicting terms materially affect design;
- a hard-to-reverse, surprising trade-off needs an architectural decision record;
- another explicitly invoked workflow requires changes to the domain model.

## Do not activate when

- existing terminology only needs to be read and followed;
- the task is a bounded implementation that does not alter business meaning;
- the requested document would merely duplicate a specification or implementation plan.

## Required context

Use the current requirements, existing `CONTEXT.md` or context map when present, relevant code behavior, authoritative domain documents, and the repository or Obsidian knowledge-vault location chosen for durable notes.

## Workflow

1. Identify overloaded, contradictory, or unnamed concepts that affect the current decision.
2. Propose precise canonical terms and definitions in user language.
3. Stress-test relationships and rules with normal, edge, failure, lifecycle, and permission scenarios.
4. Compare stated rules with existing code and documentation; surface contradictions instead of choosing silently.
5. Update a glossary or context note only as terms are resolved. Keep it free of file layouts, classes, framework choices, and implementation plans.
6. Create an ADR only when the decision is hard to reverse, surprising without context, and based on a real trade-off.
7. Link relevant specifications, decisions, experiments, and sessions rather than duplicating their contents.

## Stop conditions

Stop when the terms and rules needed for the current scope are unambiguous, remaining disagreement is explicitly recorded, or the user defers a material domain decision.

## Guardrails

- Do not redesign the whole domain for a local wording issue.
- Do not force specialist terminology when the user's established language is clear.
- Do not treat a glossary as a specification, scratchpad, database schema, or architecture document.
- Do not create context files or ADRs unless the user requested domain documentation or the active workflow explicitly requires it.
- Do not rewrite existing domain language without identifying downstream impact.

## Validation

Check that each canonical term has one meaning, important rules have an authoritative owner, scenarios do not expose unresolved contradictions, and ADRs include alternatives and consequences.

## Output

Report terms added or changed, rules clarified, contradictions found, scenarios used, documents updated, ADR status, and unresolved domain questions.