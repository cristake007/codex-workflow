---
name: ecosystem-python
description: Apply established Python ecosystem conventions whenever reviewing or modifying Python modules, packages, framework code, dependency configuration, tests, migrations, type checking, or tooling, including bounded single-file work on .py files. Activate after Python is established or approved. Do not activate to choose Python for a greenfield project or for work where Python-specific conventions cannot affect the result.
---

# Python Ecosystem

## Purpose

Apply the repository's supported Python version, packaging, framework, typing, dependency, and validation conventions without inventing tools or workflows.

## Activate when

- implementing or reviewing Python modules, packages, tests, framework code, scripts, or configuration;
- changing `pyproject.toml`, requirements files, lockfiles, package metadata, migrations, type checking, formatting, linting, or Python-specific build behavior;
- Python version compatibility, import behavior, async execution, resources, transactions, or framework conventions affect the task;
- a bounded single-file review or edit still requires Python-specific judgment.

## Do not activate when

- selecting a language or framework for a greenfield project before user approval;
- the repository has no established or approved Python ecosystem;
- the task is purely textual, administrative, or unrelated to Python behavior;
- repository discovery is still required to determine whether Python is in scope;
- another skill owns the task and no Python-specific decision remains.

An exact file path is not by itself a reason to skip this skill when the requested work changes or reviews Python behavior.

## Required context

Use facts already available in the prompt and conversation. Establish only missing Python-specific context:

- supported Python version and runtime environment;
- packaging standard, package manager, virtual-environment workflow, and lockfile;
- framework, application type, or package type;
- formatter, linter, type checker, test runner, and migration tooling actually declared by the repository;
- import, module, dependency-injection, configuration, async, and transaction conventions;
- public API, data format, schema, migration, and backward-compatibility obligations;
- generated, vendored, cached, built, or protected paths.

## Workflow

1. Read the nearest applicable `AGENTS.md`.
2. Reuse Python, framework, package-manager, and validation facts already present in the prompt or conversation.
3. If context is missing, inspect only the nearest authoritative `pyproject.toml`, requirements file, lockfile, framework configuration, migration configuration, or test configuration.
4. Preserve the supported Python version, packaging standard, framework-native patterns, module structure, and public compatibility.
5. Use the existing package manager and update lockfiles only through that tool.
6. Keep import-time side effects minimal and dependencies explicit.
7. Prefer clear modules, typed boundaries, and framework-native facilities over unnecessary class hierarchies or metaprogramming.
8. Validate external data before it enters domain logic and handle async, resource, transaction, and cleanup boundaries deliberately.
9. Preserve framework-native configuration, migration, dependency-injection, and request-handling conventions.
10. Run only repository-approved targeted checks proportional to the change.

## Stop conditions

Stop when:

- the requested Python behavior or review question is resolved;
- required Python and framework conventions are confirmed from authoritative sources;
- remaining uncertainty does not affect correctness, compatibility, packaging, migrations, or validation;
- the next step requires an unapproved dependency, migration, framework change, broad test suite, or runtime environment;
- further inspection would expand beyond the affected Python boundary.

## Guardrails

- Do not choose Python or a Python framework for a greenfield project without approval.
- Do not hand-edit lockfiles, virtual environments, caches, generated files, distributions, or vendored packages.
- Do not assume pytest, mypy, Ruff, Black, Django, FastAPI, Flask, or another tool without repository evidence.
- Do not add metaprogramming, class hierarchies, or abstractions that are not required by the current design.
- Do not change public APIs, schemas, migrations, supported Python versions, or data formats silently.
- Do not execute migrations, dependency installation, framework test suites, or production commands unless explicitly permitted.

## Validation

- Use repository-declared targeted syntax, lint, formatting, type, or test commands only when permitted.
- Scope checks to modified modules or the smallest relevant test selection when possible.
- Validate package metadata and lockfile changes through the selected package tool.
- Confirm migration generation or application only when explicitly requested and authorized.
- State clearly which compatibility, runtime, async, migration, integration, or packaging behavior remains unverified.

## Output

Report only:

- Python-specific conclusions or changes;
- framework, packaging, typing, migration, and compatibility impacts;
- dependencies affected;
- targeted checks executed;
- manual validation still required;
- important unverified assumptions.
