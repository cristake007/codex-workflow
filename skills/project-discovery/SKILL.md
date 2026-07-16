---
name: project-discovery
description: Establish only the missing repository, technology, documentation, and operational context needed for the current task. Activate for unfamiliar or ambiguous repositories, greenfield decisions, bootstrap preparation, architecture work, or when authoritative sources are unknown. Do not activate when the prompt or current conversation already provides the needed facts, exact paths, decisions, or authoritative files.
---

# Project Discovery

## Purpose

Establish only the project context that is still missing and that can materially affect the current task.

## Activate when

- the repository is unfamiliar and the task depends on its stack, structure, conventions, or operational environment;
- the repository may be greenfield or its intended purpose is ambiguous;
- authoritative manifests, instructions, validation commands, or runtime sources are not yet known;
- the task involves project bootstrap, architecture, stack selection, imports, deployment assumptions, or cross-cutting capability selection;
- missing context could change the implementation, validation, safety, or scope decision.

## Do not activate when

- the user prompt already provides the exact file or directory paths needed for the task;
- the required repository, runtime, framework, package-manager, validation, or operational information already exists in the current conversation context;
- the authoritative source files have already been identified earlier in the same task or conversation;
- the task is an isolated edit that can be completed by reading the explicitly named target and source files;
- further discovery would not change the implementation, validation, safety, or scope decision.

## Required context

Before inspecting the repository, determine:

- the exact question discovery must answer;
- which facts are already available in the prompt or conversation;
- whether authoritative files or paths are already known;
- whether one or two facts are missing or a complete project profile is genuinely required;
- whether the repository is existing, greenfield, or still ambiguous.

## Workflow

1. Check the prompt, current conversation, and already identified files before reading the repository.
2. Choose the smallest applicable discovery mode.

### Bounded fact lookup

Use this mode when only one or two facts are missing.

1. Inspect the repository root once.
2. Read only the nearest applicable `AGENTS.md`, likely manifests, lockfiles, runtime markers, or explicitly relevant operational files.
3. Search only likely authoritative files for the requested facts.
4. Read matching lines or a small surrounding range rather than entire files by default.
5. Record unsupported values as not declared instead of inferring them from absence.
6. Stop when the requested facts have sufficient evidence.

### Full repository discovery

Use this mode only for bootstrap, architecture, stack classification, imports, or explicitly requested broad analysis.

1. Read the nearest applicable `AGENTS.md`.
2. Classify the repository as existing, greenfield, or ambiguous.
3. Identify authoritative languages, versions, frameworks, package managers, storage, services, deployment targets, generated files, and supported platforms.
4. Identify real validation commands from manifests, scripts, CI, or documentation.
5. Identify the governing local and official documentation.
6. Detect Linux or security evidence only as capability hints; do not activate cross-cutting capabilities silently.
7. Record uncertainty instead of inventing missing technologies, access rights, or operational facts.
8. Recommend only the ecosystem and capability skills justified by the evidence.

### Greenfield decisions

1. Establish the product or operational purpose, intended users, target platforms, integrations, data, authentication, constraints, available infrastructure, non-goals, and irreversible choices.
2. Present at most three realistic options when a technology choice is required.
3. Recommend one option with trade-offs.
4. Wait for explicit approval before scaffolding code, adding dependencies, or committing to an irreversible stack decision.

## Stop conditions

Stop discovery when:

- every requested fact has an authoritative source;
- the remaining uncertainty does not affect the task;
- further searching would only repeat equivalent checks or attempt to prove an open-ended absence;
- the user must choose between materially different functional, architectural, cost, data, or safety options.

## Guardrails

- Keep discovery proportional to the task.
- Do not perform a broad repository inventory for a bounded edit.
- Do not repeat equivalent searches.
- Do not infer definitive values from absence alone.
- Do not replace an established stack unless the user explicitly requests an architectural change.
- Do not choose a greenfield technology without user approval.
- Do not create planning documents unless requested.

## Validation

- Verify conclusions against concrete repository evidence.
- Distinguish observed facts, reasonable inferences, unknown values, and conflicting declarations.
- For bounded discovery, do not run builds, installations, full test suites, or infrastructure checks.
- State clearly which conclusions remain unverified.

## Output

Report only:

- discovery mode used;
- facts found and their authoritative sources;
- important constraints and uncertainty;
- established or approved ecosystems and capabilities;
- the next justified action.
