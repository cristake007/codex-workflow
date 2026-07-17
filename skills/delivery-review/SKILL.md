---
name: delivery-review
description: Perform one bounded, strictly read-only final review of completed work against the request, source of truth, repository boundary, and effective diff. Activate only when the user explicitly requests final review, delivery readiness, or a pre-commit assessment. Do not activate during normal implementation, to fix findings, alter Git state, or repeat an unchanged review.
---

# Delivery Review

## Purpose

Decide whether completed work is ready to deliver using the minimum evidence needed, without modifying repository state.

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

Confirm the request and non-goals, declared source-of-truth path, target directory and intended Git root, effective diff, applicable project constraints, checks already run, and known limitations.

## Workflow

1. Confirm the target directory, nearest intended Git root, declared source-of-truth path, and effective changed-file list before loading ecosystem skills or full patches.
2. Check decisive readiness blockers first: missing authoritative source, unresolved repository boundary, known incomplete implementation, prohibited changes, or required validation with no usable path.
3. Check the declared authoritative path directly. If it is missing, report the blocker; do not search broadly for an undocumented substitute.
4. If a confirmed blocker already makes delivery impossible, stop further framework, compatibility, packaging, precedent, web-documentation, and ecosystem review unless another check is needed to identify an independent security, data-loss, or repository-boundary risk.
5. Otherwise inspect diff statistics and changed-file names first, then read only patches whose behavior can affect readiness.
6. Activate an ecosystem skill only when its specialist judgment can still change the readiness verdict; file presence or syntax checking alone is insufficient.
7. Check requested behavior, regressions, boundaries, compatibility, dependencies, generated files, security, and validation only where affected.
8. Reuse valid existing check results for unchanged code; run only the smallest missing permitted checks.
9. Report findings without changing files or Git state and perform one pass unless relevant code or requirements change.

## Stop conditions

Stop immediately when a confirmed blocker fixes the readiness verdict and further review cannot reveal an independent security, data-loss, or repository-boundary risk. Also stop when all relevant changed areas are assessed once, unavailable access prevents verification, or further inspection would exceed scope.

## Guardrails

- This skill is strictly read-only.
- Do not edit, generate, stage, restore, commit, push, merge, rebase, or change ignore or repository-boundary rules.
- Do not add ignored files or child-project contents to a parent repository.
- Do not fix findings during review; require a separate implementation step.
- Do not reread complete applicable `AGENTS.md` files already loaded into the session; inspect only a specific disputed rule when necessary.
- Do not browse framework documentation, search repository-wide precedents, or inspect package contents after a decisive blocker unless the result can still expose an independent material risk.
- Do not invent findings, broaden scope, or repeat an unchanged review.

## Validation

- Base conclusions on the actual diff, request, declared source, and repository boundary.
- Start with changed-file metadata and bounded output; avoid full repository dumps and unrestricted logs.
- Use only permitted targeted checks not already passed against unchanged code.
- Inspect package contents only when packaging is part of the requested deliverable and no earlier blocker already makes readiness impossible.
- Treat ignored workspace content as a boundary signal, not permission to change policy.
- State unverified runtime, integration, browser, production, infrastructure, or source-control behavior.

## Output

Return decisive blockers first. Then report only the target and Git root, checks executed before stopping, unverified behavior, material independent risks, and readiness. For boundary blockers, state that no files, ignore rules, staging, or commits changed.