---
name: delivery-review
description: Perform one bounded, strictly read-only final review of completed work against the request, source of truth, repository boundary, and effective diff. Activate only when the user explicitly requests final review, delivery readiness, or a pre-commit assessment. Do not activate during normal implementation, to fix findings, alter Git state, or repeat an unchanged review.
---

# Delivery Review

## Purpose

Decide whether completed work is ready to deliver without modifying repository state.

## Activate when

- the user explicitly requests final review or delivery readiness;
- completed work has a clear request, source of truth, and effective diff;
- one focused pre-commit or pre-delivery assessment is needed.

## Do not activate when

- implementation is still in progress or no diff exists;
- ordinary implementation validation is sufficient;
- the task is discovery, design, troubleshooting, or a broad audit;
- the requested action is to fix, stage, commit, or publish work.

## Required context

Confirm the request and non-goals, source of truth, target directory and intended Git root, effective diff, applicable project constraints, checks already run, and known limitations.

## Workflow

1. Read the request, accepted decisions, and authoritative source.
2. Confirm the target directory and intended nearest Git root.
3. Inspect only the effective diff and directly affected files intended for delivery.
4. Check requested behavior, regressions, boundaries, compatibility, dependencies, generated files, security, and validation only where affected.
5. Separate blocking findings from non-blocking improvements.
6. Report findings without changing files or Git state.
7. Perform one pass unless relevant code or requirements change.

## Stop conditions

Stop after all changed areas are assessed once, a blocker requires implementation or policy changes, unavailable access prevents verification, or further inspection would exceed scope.

## Guardrails

- This skill is strictly read-only.
- Do not edit, generate, stage, restore, commit, push, merge, rebase, or change ignore or repository-boundary rules.
- Do not add ignored files or child-project contents to a parent repository.
- Do not fix findings during review; require a separate implementation step.
- Do not invent findings, broaden scope, or repeat an unchanged review.

## Validation

- Base conclusions on the actual diff, request, and repository boundary.
- Use only permitted targeted checks not already run successfully against unchanged code.
- Treat ignored workspace content as a boundary signal, not permission to change policy.
- State unverified runtime, integration, browser, production, infrastructure, or source-control behavior.

## Output

Return findings by severity, then the target and Git root, checks executed, unverified behavior, material non-blocking improvements, and readiness. For boundary blockers, state that no files, ignore rules, staging, or commits changed.