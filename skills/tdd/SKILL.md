---
name: tdd
description: Implement behavior through a proportional red-green-refactor loop at a real public seam. Activate when the user requests test-first work, a regression test, red-green-refactor, or when an approved implementation workflow explicitly requires TDD. Do not activate merely because code is being changed.
---

# Test-Driven Development

## Purpose

Use fast behavioral feedback to implement one vertical slice at a time without coupling tests to private implementation details.

## Activate when

- the user explicitly requests test-first development or red-green-refactor;
- a bug fix needs a durable regression test at a valid seam;
- an approved ticket or project instruction requires TDD;
- a small, fast test can materially reduce implementation uncertainty.

## Do not activate when

- the repository has no usable test seam or permitted test environment;
- the change is documentation, static configuration, generated output, or a trivial mechanical edit;
- creating infrastructure, services, containers, browsers, or heavy suites would violate current instructions;
- the only possible test would assert private implementation details or duplicate the implementation logic.

## Required context

Establish the requested behavior, current public interface, applicable repository conventions, permitted automatic checks, known test locations, and the smallest seam that can observe the behavior.

## Workflow

1. Select one observable behavior and one real seam. Ask the user only when multiple seam choices materially affect architecture or scope.
2. Write the smallest test that fails for the intended reason.
3. Run only that test and confirm the red signal.
4. Add the minimum implementation needed to pass.
5. Run the same test and confirm green.
6. Refactor only behavior-preserving code within the current slice, then rerun the targeted test.
7. Repeat for the next behavior only when it is part of the approved scope.
8. Use broader checks only when permitted and proportionate.

## Stop conditions

Stop when the approved behavior is covered at the chosen seam, the targeted tests pass, the implementation contains no known incomplete branch, and broader validation is either completed or clearly left for manual execution.

## Guardrails

- Test behavior through public interfaces, not private methods or incidental database state.
- Use independently derived expected values; avoid tautological tests.
- Prefer vertical slices over writing a large imagined test suite before implementation.
- Do not mock internal collaborators merely to reach private code.
- Do not add test-only production hooks unless explicitly justified.
- Do not run full, integration, browser, or infrastructure suites unless current instructions permit them.

## Validation

Record the exact red and green commands actually run. Distinguish targeted checks from unexecuted broader validation and never claim a test passed without running it.

## Output

Report the behavior and seam tested, files changed, red-green evidence, targeted checks, broader manual commands, and any behavior that remains unverified.