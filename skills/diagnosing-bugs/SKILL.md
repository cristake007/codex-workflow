---
name: diagnosing-bugs
description: Diagnose hard bugs, intermittent failures, and performance regressions through reproduction, minimisation, ranked hypotheses, targeted instrumentation, and regression validation. Activate for unresolved debugging work. Do not activate when the cause and bounded fix are already established.
---

# Diagnosing Bugs

## Purpose

Replace speculative code reading with a tight, evidence-producing feedback loop that proves the symptom, isolates the cause, and verifies the fix.

## Activate when

- a reported bug cannot yet be explained confidently;
- failures are intermittent, environment-dependent, or performance-related;
- multiple plausible causes remain;
- previous fixes treated symptoms without establishing the cause.

## Do not activate when

- the problem is a known typo or deterministic bounded defect with an established fix;
- the task is a broad audit rather than diagnosis of a specific symptom;
- required access, reproduction data, or authorization is unavailable and no safe local signal can be built.

## Required context

Capture the user's exact symptom, expected behavior, observed evidence, affected environment, known recent changes, permitted commands, relevant project vocabulary, and any existing test or reproduction path.

## Workflow

1. Build the smallest permitted pass/fail loop that can reproduce the exact symptom: targeted test, CLI fixture, request replay, concise script, browser step, trace comparison, or measurement harness.
2. Run it and confirm it detects the reported failure rather than a nearby problem.
3. Minimise inputs, configuration, callers, and steps while preserving the failure.
4. Form two to five ranked, falsifiable hypotheses and state the prediction for each.
5. Test one prediction at a time using debugger inspection, narrow instrumentation, bisection, or controlled comparison.
6. For performance work, establish a numerical baseline before changing code.
7. Add a regression test at a real seam when one exists, then apply the smallest cause-level fix.
8. Re-run the minimal signal and the original scenario.
9. Remove temporary logs, probes, fixtures, and debug-only changes.

## Stop conditions

Stop when the root cause is supported by evidence and the fix is verified, when the needed reproduction artifact or access is unavailable, or when further probing would exceed authorized scope.

## Guardrails

- Do not jump from symptom to a single preferred hypothesis.
- Do not log everything, inspect unrelated directories, or run broad suites as a substitute for a focused signal.
- Tag temporary instrumentation so it can be removed reliably.
- Do not create containers, services, databases, browser automation, or production instrumentation unless permitted.
- Do not silently change behavior beyond the proven cause.
- Preserve evidence when a valid regression seam does not exist and report the architectural limitation separately.

## Validation

Provide the exact reproduction command or steps, evidence that distinguishes the winning hypothesis, before-and-after behavior, targeted checks run, and any environment or integration behavior not verified.

## Output

Report the symptom, minimal reproduction, root cause, discarded hypotheses when useful, implemented fix, regression coverage, cleanup performed, and remaining uncertainty.