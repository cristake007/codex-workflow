---
name: resolving-merge-conflicts
description: Resolve an in-progress Git merge, rebase, or cherry-pick conflict by tracing each side to its intent and preserving compatible behavior. Activate only when conflict markers or Git conflict state are present. Do not activate for general branch integration planning.
---

# Resolving Merge Conflicts

## Purpose

Resolve conflicts from primary intent rather than choosing ours or theirs mechanically, while protecting repository history and unrelated work.

## Activate when

- Git reports an in-progress merge, rebase, or cherry-pick with unresolved paths;
- conflict markers exist in files involved in the current Git operation;
- the user explicitly asks to resolve those conflicts.

## Do not activate when

- no Git conflict operation is active;
- the user only wants advice about future branch integration;
- resolving the conflict would require guessing between incompatible product requirements.

## Required context

Inspect the current Git operation, status, conflicting paths, merge base and relevant commits, applicable specifications or issues, repository instructions, and the intended outcome of the integration.

## Workflow

1. Confirm the repository root, current branch, active Git operation, and unresolved paths.
2. For each conflict, trace both sides to their commits, specifications, issues, tests, or surrounding implementation intent.
3. Resolve one hunk at a time, preserving both intents when compatible.
4. When intents conflict, choose the behavior matching the stated integration goal and report the trade-off; do not invent a third feature.
5. Remove all conflict markers and inspect the effective diff for accidental deletion or duplication.
6. Run the smallest permitted syntax, type, or targeted tests that can detect integration damage.
7. Stage resolved files and continue or finish the Git operation only when that action is part of the user's request and no material ambiguity remains.

## Stop conditions

Stop when all conflicts are resolved and proportionately validated, when a product decision is required to choose behavior, or when continuing would require destructive history rewriting not authorized by the user.

## Guardrails

- Do not use `git checkout --ours`, `--theirs`, or blanket acceptance without reviewing each hunk.
- Do not abort, reset, force push, or rewrite history unless explicitly requested.
- Do not discard pre-existing work or unrelated changes.
- Do not add cleanup or refactoring unrelated to conflict resolution.
- Do not bypass hooks or checks.
- Preserve line endings and generated-file rules established by the repository.

## Validation

Confirm no unresolved paths or conflict markers remain, review the final diff against both intents, record checks actually run, and state any integration, runtime, or production behavior not verified.

## Output

Report conflicts resolved, intent decisions and trade-offs, Git operation status, checks executed, remaining ambiguity, and the exact next Git command when the operation was not completed.