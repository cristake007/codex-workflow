---
name: project-discovery
description: Establish only missing repository, technology, documentation, and operational facts that can change the current task. Activate for unfamiliar or ambiguous repositories, greenfield decisions, bootstrap preparation, architecture work, or unknown authoritative sources. Do not activate when the prompt or current conversation already provides the needed paths, decisions, and sources.
---

# Project Discovery

## Purpose

Find only the missing project facts that materially affect scope, implementation, validation, or safety.

## Activate when

- the repository, stack, structure, runtime, or source of truth is unclear;
- greenfield, bootstrap, architecture, deployment, or capability decisions require evidence;
- missing context could change the requested result.

## Do not activate when

- exact targets and authoritative sources are already known;
- the task is a bounded edit answerable from named files;
- further discovery would not change a decision.

## Required context

Establish the question discovery must answer, facts already known, likely authoritative sources, and whether the repository is existing, greenfield, or ambiguous.

## Workflow

1. Reuse the prompt, conversation, and previously identified sources.
2. For one or two missing facts, inspect only the nearest instructions, manifests, lockfiles, runtime markers, or relevant configuration.
3. Read matching lines or small ranges rather than whole files by default.
4. Use full discovery only for bootstrap, architecture, stack classification, imports, or an explicitly broad analysis.
5. For greenfield choices, present at most three realistic options and require approval before committing to a stack.
6. Record unknown or conflicting facts instead of guessing.

## Stop conditions

Stop when the requested facts have authoritative evidence, remaining uncertainty cannot affect the task, searches begin repeating, or a material user decision is required.

## Guardrails

- Keep discovery proportional and do not inventory the repository for a bounded task.
- Do not infer definitive values from absence alone.
- Do not replace an established stack or choose a greenfield stack without approval.
- Do not create documentation unless requested.

## Validation

- Tie conclusions to concrete repository evidence.
- Distinguish facts, inferences, unknowns, and conflicts.
- Do not run builds, installations, broad tests, or infrastructure checks for discovery alone.

## Output

Report the discovery mode, facts and sources, material constraints or uncertainty, justified skills or capabilities, and the next action.