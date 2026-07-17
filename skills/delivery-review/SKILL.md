---
name: delivery-review
description: Perform one bounded, strictly read-only final review of completed work against the current request, authoritative source, intended repository boundary, and effective diff. Activate after implementation when the user requests review, when a focused pre-delivery check is needed, or when correctness, regression, compatibility, security, generated-file, dependency, repository-boundary, and validation gaps must be assessed. Do not activate before implementation, for broad repository audits, for repeated review loops, or to fix findings, alter staging, change ignore rules, or create commits.
---

# Delivery Review

## Purpose

Determine whether the completed task is ready to deliver by reviewing only the requested scope, intended repository boundary, and effective changes without modifying repository state.

## Activate when

- implementation is complete and the user requests a final review;
- a focused diff must be checked before delivery or commit;
- correctness, regressions, boundary handling, compatibility, security, dependencies, generated files, repository visibility, or validation gaps may affect readiness;
- a previous implementation result needs one evidence-based quality check;
- the task has a clear request and source of truth against which the result can be compared.

## Do not activate when

- no implementation or effective diff exists yet;
- the task is repository discovery, architecture design, troubleshooting, or initial implementation;
- the user asks for a broad repository audit unrelated to the current task;
- the same unchanged diff has already received a complete delivery review;
- the task is a simple factual explanation with no deliverable to review;
- the requested action is to fix findings, modify files, stage changes, alter ignore rules, create a commit, or publish work.

## Required context

Use the prompt and conversation before inspecting files. Establish only:

- the current user request and explicit non-goals;
- the authoritative specification, issue, plan, or source files;
- the explicit target directory and intended Git repository root;
- the effective diff and files intentionally changed;
- repository-specific constraints and selected ecosystem conventions;
- dependency, schema, infrastructure, generated-file, source-control visibility, and documentation impacts;
- checks already executed and their actual results;
- known limitations and manual validation still required.

## Workflow

1. Read the current request, accepted clarifications, and designated source of truth.
2. Resolve the explicit target directory and confirm the intended nearest Git repository root.
3. Inspect only the effective diff and directly affected files already intended for delivery.
4. Verify that the implemented behavior matches the requested scope and non-goals.
5. Check for likely defects, regressions, unsafe side effects, invalid boundary handling, and compatibility breaks.
6. Check consistency with the repository structure and applicable ecosystem conventions.
7. Review dependency, schema, infrastructure, generated-file, security, source-control visibility, and documentation impacts only when affected.
8. Confirm which approved checks actually ran and identify remaining manual validation.
9. Separate blocking findings from non-blocking improvements.
10. Report findings without changing files, staging, ignore rules, repository boundaries, or commit contents.
11. Perform one review pass unless relevant code or requirements change afterward.

## Stop conditions

Stop review when:

- every changed area relevant to the request has been assessed once;
- findings are supported by concrete code, configuration, repository-boundary, or missing-validation evidence;
- the review identifies a blocking issue that requires implementation or source-control policy changes;
- remaining uncertainty requires unavailable runtime access or user-executed validation;
- further inspection would expand beyond the requested task;
- the unchanged diff has already been reviewed completely.

## Guardrails

- This skill is strictly read-only.
- Do not edit, create, rename, delete, format, or regenerate files.
- Do not stage, unstage, restore, commit, amend, push, merge, rebase, or otherwise change Git state.
- Do not modify `.gitignore`, `.git/info/exclude`, sparse-checkout configuration, attributes, hooks, or any source-control visibility rule.
- Do not add ignored or untracked files to the intended commit merely to make delivery appear complete.
- Do not move project files across repository boundaries or include child-project contents in a parent repository.
- Do not fix findings during the review. Report blockers and require a separate implementation step.
- Do not restart repository discovery or redesign the product.
- Do not expand the implementation scope or propose unrelated refactors.
- Do not invent findings to make the review appear useful.
- Do not treat optional style preferences as blocking defects.
- Do not rerun broad tests, builds, containers, or infrastructure checks unless explicitly required.
- Do not claim checks passed when they were not executed.
- Do not create repeated reviewer loops on an unchanged diff.

## Validation

- Base conclusions on the actual diff, authoritative request, and confirmed repository boundary.
- Confirm the reviewed files belong to the intended repository before assessing commit readiness.
- Treat intentionally ignored workspace content as a repository-boundary signal, not as permission to change ignore policy.
- Use only targeted syntax, lint, type, or configuration checks permitted by repository instructions.
- Confirm generated or packaged artifacts only when the task changed their source or explicitly requires them.
- Record unverified runtime, integration, browser, production, infrastructure, and source-control behavior clearly.
- Re-review only the portions changed after the previous review.

## Output

Return findings first, ordered by severity, with exact files or locations when available. Then report:

- confirmed target directory and intended Git root;
- checks executed;
- unverified behavior;
- non-blocking improvements, if material;
- whether the task is ready to deliver.

For a repository-boundary or ignored-file blocker, state explicitly that no ignore rules, staging state, files, or commits were changed.

If no material issue is found, say so directly.
