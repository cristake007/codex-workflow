---
name: software-design
description: Apply the language-independent engineering constitution when designing a new application, choosing architecture, planning a major feature, evaluating a substantial refactor, or reviewing software design quality. Do not use for routine small fixes or targeted edits with an established design.
---

# Software Design

Use this skill for decisions that shape the structure, boundaries, or long-term maintainability of a system.

Read `references/engineering-constitution.md` before producing recommendations.

## Workflow

1. Define the real problem, intended users, requirements, constraints, failure cases, and non-goals.
2. Identify the domain concepts and assign one authoritative owner to each business rule.
3. Separate domain policy from storage, frameworks, interfaces, infrastructure, and external services.
4. Propose the smallest set of cohesive components and explicit dependencies that solves the current need.
5. Reuse existing code only when it reduces complexity and preserves clear ownership.
6. Identify system boundaries, invalid states, error paths, side effects, security concerns, and compatibility obligations.
7. Prefer an incremental implementation that can be reviewed and validated in small slices.
8. State meaningful trade-offs and reject speculative abstractions or future-proofing without a current requirement.

## Output

Keep the result concise and decision-oriented. Include only:

- the problem, constraints, and non-goals;
- proposed domain boundaries and component responsibilities;
- important dependencies and data flows;
- key decisions and trade-offs;
- failure, validation, security, and compatibility considerations;
- the smallest sensible implementation slice.

Do not create a plan or documentation file unless the user explicitly requests one.
