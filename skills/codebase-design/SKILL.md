---
name: codebase-design
description: Design or improve a specific module interface, seam, dependency direction, or test boundary using deep-module principles. Activate for scoped architecture and module-design work. Do not activate for broad unsolicited architecture scans or routine bounded edits.
---

# Codebase Design

## Purpose

Concentrate behavior and knowledge behind small, stable interfaces so changes remain local, callers gain leverage, and tests observe behavior through real seams.

## Activate when

- the user asks to design or restructure a module, interface, seam, or adapter;
- scattered responsibility or poor testability blocks the requested work;
- a substantial architecture decision is already in scope;
- an approved diagnosis identifies a local design defect that should be addressed separately.

## Do not activate when

- the task is a routine fix or small feature that fits the current structure;
- the request would require scanning the entire codebase without a bounded target;
- the proposed abstraction exists only for hypothetical future variation;
- the user has not approved a material architecture or framework change.

## Required context

Establish the exact behavior cluster, current callers, authoritative business rules, existing interfaces, dependency direction, test seams, project conventions, and declared non-goals.

## Workflow

1. Define the behavior and knowledge that should change together.
2. Identify the current caller-facing interface, including invariants, errors, ordering, configuration, and performance expectations.
3. Locate the seam where behavior can vary without callers knowing implementation details.
4. Compare at least two realistic interface shapes when the choice is consequential.
5. Prefer a deep module: small interface, substantial hidden behavior, explicit dependencies, and one authoritative owner for each rule.
6. Introduce an adapter only when a real seam exists; one hypothetical implementation is not enough by itself.
7. Use the deletion test: if removing the module merely spreads its complexity across callers, it is earning its place; if complexity disappears, it may be a pass-through.
8. Limit implementation and migration to the approved scope and preserve established conventions where reasonable.

## Stop conditions

Stop when the scoped behavior has a clear owner and interface, dependencies are explicit, callers need less knowledge, and the design can be validated without broad unrelated refactoring.

## Guardrails

- Do not run periodic or whole-repository architecture scans automatically.
- Do not rename the project's established vocabulary solely to match this skill.
- Do not create speculative layers, factories, interfaces, or extension points.
- Do not hide important side effects or failure modes behind a deceptively small signature.
- Do not mix architecture cleanup with unrelated feature delivery.
- Discuss materially different designs before implementing them.

## Validation

Check interface size, caller knowledge, rule ownership, dependency direction, testability at the seam, migration impact, and whether the design reduces rather than relocates complexity.

## Output

Report the scoped design problem, considered interface shapes, selected seam and module owner, rejected alternatives, migration impact, validation approach, and unverified risks.