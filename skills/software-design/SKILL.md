---
name: software-design
description: Apply language-independent engineering guidance when architecture, domain boundaries, component ownership, major feature structure, phased implementation, or substantial refactoring must be decided. Activate for new application design and unresolved structural decisions. Do not activate for routine implementation whose approved design is already established.
---

# Software Design

## Purpose

Produce the smallest coherent design that solves the current requirement with clear ownership and boundaries.

## Activate when

- designing a new application or major subsystem;
- defining architecture, domain boundaries, dependencies, or a phased implementation plan;
- a substantial feature or refactor lacks an established structure;
- competing design approaches have material trade-offs.

## Do not activate when

- the task is a routine fix, configuration change, or isolated implementation detail;
- an approved design or phase already defines the required structure;
- architecture discussion cannot change the implementation decision.

## Required context

Establish the problem and users, requirements and non-goals, failure cases, existing architecture and reusable components, authoritative business rules, integrations, data ownership, compatibility, operations, security, and approved decisions.

## Workflow

1. Read `references/engineering-constitution.md`.
2. Define the problem, requirements, constraints, failure cases, and non-goals.
3. Assign one authoritative owner to each business rule.
4. Separate domain policy from storage, frameworks, interfaces, infrastructure, and external services.
5. Propose the smallest cohesive components and explicit dependencies.
6. Identify invalid states, side effects, error paths, security, and compatibility boundaries.
7. Compare only materially different alternatives.
8. Divide implementation into small, reviewable phases when requested.

## Stop conditions

Stop when the design is sufficient for implementation, remaining alternatives are low impact, a material choice requires user approval, or further work addresses hypothetical requirements.

## Guardrails

- Do not redesign unrelated areas or replace an established stack without approval.
- Do not add layers or abstractions without a current ownership or boundary need.
- Do not hide trade-offs or present judgment as fact.
- Do not create plans or documentation unless requested.

## Validation

- Confirm every business rule has one owner and dependencies are explicit.
- Check invalid states, errors, side effects, security, and compatibility.
- Confirm the design can be implemented and validated in bounded phases.
- Do not run builds, tests, scaffolding, or dependency installation during design-only work.

## Output

Report the problem and constraints, boundaries and responsibilities, dependencies and data flow, decisions and trade-offs, risks and validation needs, and the smallest sensible implementation phases.

## Resources

- `references/engineering-constitution.md` is the authoritative design guidance.