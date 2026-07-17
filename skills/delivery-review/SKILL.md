---
name: delivery-review
description: Perform one bounded, strictly read-only final review of completed work. Assess technical readiness from the implementation, effective diff, repository conventions, and available evidence; assess requirements conformance separately when an authoritative specification exists. Activate only when the user explicitly requests final review, delivery readiness, or a pre-commit assessment.
---

# Delivery Review

## Purpose

Assess completed work using the minimum evidence needed, without modifying repository state. Keep technical readiness separate from conformance to documented requirements.

## Activate when

- the user explicitly requests final review or delivery readiness;
- completed work has an effective diff or deliverable to assess;
- one focused pre-commit or pre-delivery assessment is needed.

## Do not activate when

- implementation is still in progress or no deliverable exists;
- ordinary implementation validation is sufficient;
- the task is discovery, design, troubleshooting, or a broad audit;
- the requested action is to fix, stage, commit, or publish work.

## Required context

Confirm the review objective, request and non-goals when available, target directory and intended Git root, effective diff, applicable project constraints, checks already run, known limitations, and any declared functional source of truth.

## Workflow

1. Confirm the target directory, intended nearest Git root, review objective, and effective changed-file list before loading ecosystem skills or full patches.
2. Determine whether the user requests technical readiness, requirements conformance, or both.
3. If a functional source of truth is declared, check its exact path. If missing, mark only requirements conformance as unverified; do not search broadly for an undocumented substitute.
4. Continue technical review from the implementation, effective diff, repository conventions, and observable behavior unless the user requested only conformance to the missing source.
5. Check decisive technical blockers first: unresolved repository boundary, known incomplete implementation, prohibited changes, concrete defects, failed required checks, or no usable validation path for a required claim.
6. If a confirmed blocker fixes the applicable technical-readiness verdict, stop secondary framework, compatibility, packaging, precedent, documentation, and ecosystem analysis unless another check can reveal an independent security, data-loss, or repository-boundary risk.
7. Otherwise inspect diff statistics and changed-file names first, then read only patches whose behavior can affect readiness.
8. Activate an ecosystem skill only when specialist judgment can change the technical verdict; file presence or syntax checking alone is insufficient.
9. Reuse valid existing checks for unchanged code and run only the smallest missing permitted checks.
10. Report findings without changing files or Git state and perform one pass unless relevant code or requirements change.

## Stop conditions

Stop when the applicable verdict has sufficient evidence, a confirmed technical blocker fixes readiness and no independent material risk remains to assess, unavailable access prevents further verification, or additional inspection would exceed scope. A missing functional specification stops only conformance claims, not technical review.

## Guardrails

- This skill is strictly read-only.
- Do not edit, generate, stage, restore, commit, push, merge, rebase, or change ignore or repository-boundary rules.
- Do not add ignored files or child-project contents to a parent repository.
- Do not fix findings during review; require a separate implementation step.
- Do not treat a missing project `AGENTS.md` as a delivery blocker by itself; use the applicable instructions already loaded for the session.
- Do not treat a missing functional specification as a general technical blocker.
- Do not reread complete applicable `AGENTS.md` files already loaded into the session; inspect only a specific disputed rule when necessary.
- Do not browse framework documentation, search repository-wide precedents, or inspect package contents after a decisive technical blocker unless the result can expose an independent material risk.
- Do not invent findings, broaden scope, or repeat an unchanged review.

## Validation

- Base technical conclusions on the implementation, effective diff, repository conventions, permitted checks, and confirmed repository boundary.
- Base requirements-conformance conclusions only on available authoritative requirements; otherwise mark conformance unverified.
- Start with changed-file metadata and bounded output; avoid full repository dumps and unrestricted logs.
- Use only permitted targeted checks not already passed against unchanged code.
- Inspect package contents only when packaging is part of the requested deliverable and can still affect the applicable verdict.
- State unverified runtime, integration, browser, production, infrastructure, and source-control behavior.

## Output

Report material findings first. Then state separately: requirements conformance, technical readiness, target and Git root, checks executed, unverified behavior, independent material risks, and whether any files, ignore rules, staging, or commits changed.