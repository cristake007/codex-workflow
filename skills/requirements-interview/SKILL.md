---
name: requirements-interview
description: Interview the user to resolve material product, workflow, or architecture ambiguity before substantial work. Activate only when the user explicitly requests an interview, grilling session, or requirements clarification. Do not activate for bounded edits or when existing requirements are sufficient.
disable-model-invocation: true
---

# Requirements Interview

## Purpose

Turn unclear intent into explicit decisions without taking control away from the user.

## Activate when

- the user explicitly asks to be interviewed or challenged about a plan;
- unresolved choices could materially change functionality, architecture, data, cost, or safety;
- a substantial feature needs clearer goals, scenarios, and non-goals before specification.

## Do not activate when

- the task is a bounded edit with known targets;
- the prompt, conversation, or authoritative specification already resolves the important choices;
- the missing detail can be established safely from the repository;
- the user asked for immediate implementation and low-risk assumptions are sufficient.

## Required context

Reuse the current conversation, known project facts, existing terminology, applicable `AGENTS.md`, and any declared functional source of truth. Identify only the decisions that remain unresolved.

## Workflow

1. State the goal and the small set of decision areas still open.
2. Ask one coherent cluster of questions at a time, starting with user-visible behavior and constraints.
3. Challenge vague or overloaded terms and propose precise alternatives.
4. Test answers with concrete normal, edge, failure, and permission scenarios.
5. Record decisions, rejected alternatives, non-goals, and unresolved items as the discussion progresses.
6. Stop asking when additional answers would not change the planned result.
7. Hand the resolved conversation to `to-spec`, `domain-modeling`, or implementation only when appropriate.

## Stop conditions

Stop when the material decision tree is resolved, the user asks to proceed, the remaining uncertainty is low-risk and reversible, or further questions would only add implementation detail.

## Guardrails

- Do not ask questions already answered in the prompt or conversation.
- Do not turn the interview into a technology sales pitch or broad repository audit.
- Do not create documentation unless the user requested it or explicitly invokes a documentation workflow.
- Do not block urgent, reversible work on minor preferences.
- Keep the user in control of product and architecture decisions.

## Validation

Confirm that goals, non-goals, important scenarios, constraints, and unresolved risks are distinguishable. State assumptions instead of silently filling material gaps.

## Output

Provide a concise decision summary with confirmed requirements, rejected alternatives, unresolved items, and the most appropriate next workflow.