---
name: to-spec
description: Turn an already discussed feature, decision, or request into a concise implementation-neutral specification. Activate only when the user explicitly asks for a spec, PRD, requirements document, or to capture the current conversation. Do not activate merely because implementation is complex.
disable-model-invocation: true
---

# To Spec

## Purpose

Convert established requirements into one authoritative, reviewable specification without reopening resolved decisions or inventing implementation.

## Activate when

- the user explicitly asks for a specification, PRD, requirements document, or written source of truth;
- a completed requirements interview needs to be captured;
- an existing conversation contains enough resolved intent to document.

## Do not activate when

- material product decisions are still unresolved;
- the user asked only for implementation, explanation, or a small edit;
- an authoritative specification already exists and only needs a targeted amendment.

## Required context

Collect the current request, relevant conversation decisions, declared source of truth, project terminology, constraints, non-goals, and any exact output path supplied by the user.

## Workflow

1. Reuse resolved decisions and do not repeat an interview.
2. Separate user-visible requirements from proposed implementation.
3. Capture purpose, actors, scope, non-goals, workflows, business rules, edge cases, failure behavior, permissions, data implications, acceptance criteria, and unresolved questions.
4. Use the project's canonical terms; invoke `domain-modeling` only when terminology itself must change.
5. Prefer behavior-oriented acceptance criteria that can later guide tests.
6. Save to the user-provided path. Otherwise prefer an existing project specification directory; if none exists and the repository contains the `knowledge/` vault, use `knowledge/Projects/<project>/Specs/`.
7. Do not create tickets or implementation phases in the specification.

## Stop conditions

Stop when the document faithfully represents the resolved conversation, remaining unknowns are clearly marked, and no implementation choice has been invented.

## Guardrails

- Do not broaden scope or add desirable-but-unrequested features.
- Do not hide contradictions; record them as unresolved.
- Do not turn framework choices or file layouts into requirements unless already decided.
- Do not overwrite a different existing specification without explicit instruction.
- Keep the document concise enough to remain usable as a source of truth.

## Validation

Trace every material requirement to the request, conversation, or declared source. Check that acceptance criteria describe observable behavior and that non-goals prevent obvious scope creep.

## Output

Report the specification path, its status as authoritative or draft, the major captured decisions, and any unresolved questions.