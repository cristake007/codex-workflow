---
name: delivery-review
description: Perform one bounded final review of completed work against the current request, authoritative source, and effective diff. Activate after implementation when the user requests review, when a focused pre-delivery check is needed, or when correctness, regression, compatibility, security, generated-file, dependency, and validation gaps must be assessed. Do not activate before implementation, for broad repository audits, or for repeated review loops.
---

# Delivery Review

## Purpose

Determine whether the completed task is ready to deliver by reviewing only the requested scope and effective changes.

## Activate when

- implementation is complete and the user requests a final review;
- a focused diff must be checked before delivery or commit;
- correctness, regressions, boundary handling, compatibility, security, dependencies, generated files, or validation gaps may affect readiness;
- a previous implementation result needs one evidence-based quality check;
- the task has a clear request and source of truth against which the result can be compared.

## Do not activate when

- no implementation or effective diff exists yet;
- the task is repository discovery, architecture design, troubleshooting, or initial implementation;
- the user asks for a broad repository audit unrelated to the current task;
- the same unchanged diff has already received a complete delivery review;
- the task is a simple factual explanation with no deliverable to review.

## Required context

Use the prompt and conversation before inspecting files. Establish only:

- the current user request and explicit non-goals;
- the authoritative specification, issue, plan, or source files;
- the effective diff and files intentionally changed;
- repository-specific constraints and selected ecosystem conventions;
- dependency, schema, infrastructure, generated-file, and documentation impacts;
- checks already executed and their actual results;
- known limitations and manual validation still required.

## Workflow

1. Read the current request, accepted clarifications, and designated source of truth.
2. Inspect only the effective diff and directly affected files.
3. Verify that the implemented behavior matches the requested scope and non-goals.
4. Check for likely defects, regressions, unsafe side effects, invalid boundary handling, and compatibility breaks.
5. Check consistency with the repository structure and applicable ecosystem conventions.
6. Review dependency, schema, infrastructure, generated-file, security, and documentation impacts only when affected.
7. Confirm which approved checks actually ran and identify remaining manual validation.
8. Separate blocking findings from non-blocking improvements.
9. Perform one review pass unless relevant code or requirements change afterward.

## Stop conditions

Stop review when:

- every changed area relevant to the request has been assessed once;
- findings are supported by concrete code, configuration, or missing validation evidence;
- remaining uncertainty requires unavailable runtime access or user-executed validation;
- further inspection would expand beyond the requested task;
- the unchanged diff has already been reviewed completely.

## Guardrails

- Do not restart repository discovery or redesign the product.
- Do not expand the implementation scope or propose unrelated refactors.
- Do not invent findings to make the review appear useful.
- Do not treat optional style preferences as blocking defects.
- Do not rerun broad tests, builds, containers, or infrastructure checks unless explicitly required.
- Do not claim checks passed when they were not executed.
- Do not create repeated reviewer loops on an unchanged diff.

## Validation

- Base conclusions on the actual diff and authoritative request.
- Use only targeted syntax, lint, type, or configuration checks permitted by repository instructions.
- Confirm generated or packaged artifacts only when the task changed their source or explicitly requires them.
- Record unverified runtime, integration, browser, production, or infrastructure behavior clearly.
- Re-review only the portions changed after the previous review.

## Output

Return findings first, ordered by severity, with exact files or locations when available. Then report:

- checks executed;
- unverified behavior;
- non-blocking improvements, if material;
- whether the task is ready to deliver.

If no material issue is found, say so directly.
