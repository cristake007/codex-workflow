---
name: delivery-review
description: Perform one bounded final review of the current task before delivery. Use after implementation when the user requests review or when a focused diff review is needed for correctness, regressions, maintainability, compatibility, security, generated files, and validation gaps.
---

# Delivery Review

Review only the requested task and its effective diff. Do not restart repository discovery, redesign the product, or create repeated review loops.

## Review order

1. Verify that the implemented behavior matches the current request and designated source of truth.
2. Check for likely defects, regressions, unsafe side effects, invalid boundary handling, and compatibility breaks.
3. Check that the implementation follows the repository's existing structure and selected ecosystem conventions.
4. Check dependency, schema, infrastructure, generated-file, and documentation impacts.
5. Confirm which approved checks actually ran and identify required manual validation that remains.
6. Distinguish blocking findings from optional improvements.

## Output

Return findings first, ordered by severity, with exact files or locations when available. Then state:

- checks executed;
- unverified behavior;
- whether the task is ready to deliver.

Do not invent findings to make the review appear useful. If no material issue is found, say so directly.
