---
name: software-design
description: Apply the language-independent engineering constitution when decisions shape architecture, domain boundaries, component ownership, major feature structure, substantial refactors, or long-term maintainability. Activate for new application design, major feature planning, architecture evaluation, and design-quality review. Do not activate for routine fixes, bounded edits, or implementation work whose design is already established.
---

# Software Design

## Purpose

Produce the smallest coherent design that solves the current requirement while preserving clear ownership, explicit boundaries, and maintainability.

## Activate when

- designing a new application or major subsystem;
- choosing or revising architecture, domain boundaries, component responsibilities, or dependency direction;
- planning a substantial feature whose structure is not already established;
- evaluating a major refactor or competing design approaches;
- reviewing whether an existing design creates duplication of knowledge, unclear ownership, invalid states, or unsafe coupling.

## Do not activate when

- the task is a routine bug fix, configuration edit, copy change, or isolated implementation detail;
- the repository already provides an established design that the requested change can follow directly;
- the user asks only for repository discovery, delivery review, troubleshooting, or ecosystem-specific conventions;
- architecture discussion would not change the implementation decision;
- the prompt already defines the required structure and only execution remains.

## Required context

Use the prompt and conversation before inspecting additional files. Establish only:

- the real problem and intended users;
- functional requirements, constraints, non-goals, and failure cases;
- existing architecture, domain concepts, and authoritative business rules;
- supported platforms, integrations, data ownership, and compatibility obligations;
- security, privacy, deployment, operational, and maintenance constraints;
- existing reusable components and repository conventions;
- decisions already approved by the user.

## Workflow

1. Read `references/engineering-constitution.md` before producing design recommendations.
2. Define the real problem, intended users, requirements, constraints, failure cases, and non-goals.
3. Identify domain concepts and assign one authoritative owner to each business rule.
4. Separate domain policy from storage, frameworks, interfaces, infrastructure, and external services.
5. Propose the smallest set of cohesive components and explicit dependencies that solves the current need.
6. Reuse existing code only when it reduces complexity and preserves clear ownership.
7. Identify system boundaries, invalid states, error paths, side effects, security concerns, and compatibility obligations.
8. Compare alternatives only when they represent materially different trade-offs.
9. Prefer an incremental implementation that can be reviewed and validated in small slices.
10. Reject speculative abstractions, premature generalization, and future-proofing without a current requirement.

## Stop conditions

Stop design work when:

- the current requirement has a coherent minimal structure and clear rule ownership;
- the recommended design identifies boundaries, dependencies, risks, and validation needs sufficiently for implementation;
- remaining alternatives differ only in low-impact preferences;
- a material product, architecture, cost, data, or compatibility choice requires user approval;
- further design would address hypothetical future requirements rather than the current task.

## Guardrails

- Do not redesign unrelated parts of the repository.
- Do not replace an established stack or framework without explicit approval.
- Do not introduce abstractions solely to remove similar-looking code.
- Do not create additional layers, services, interfaces, or patterns without a current ownership or boundary need.
- Do not hide trade-offs or present judgment calls as facts.
- Do not create plans, specifications, or documentation files unless requested.
- Keep recommendations compatible with repository and ecosystem conventions unless a justified architectural change is approved.

## Validation

- Verify that each business rule has one authoritative owner.
- Check that component responsibilities are cohesive and dependency direction is explicit.
- Check important invalid states, error paths, side effects, security boundaries, and compatibility obligations.
- Confirm the design can be implemented incrementally and validated in bounded slices.
- Do not run builds, tests, scaffolding, dependency installation, or source generation during design-only work unless explicitly requested.
- Mark assumptions and unverified repository facts clearly.

## Output

Keep the result concise and decision-oriented. Include only:

- the problem, constraints, and non-goals;
- proposed domain boundaries and component responsibilities;
- important dependencies and data flows;
- key decisions, alternatives, and trade-offs;
- failure, validation, security, and compatibility considerations;
- the smallest sensible implementation slice.

## Resources

- `references/engineering-constitution.md` is the authoritative language-independent design guidance for this skill.
