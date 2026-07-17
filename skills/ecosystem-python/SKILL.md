---
name: ecosystem-python
description: Apply established Python conventions when implementing or reviewing Python behavior, packages, framework code, dependencies, tests, migrations, typing, or tooling, including bounded .py work. Activate only when Python-specific judgment affects the result. Do not activate merely because Python files exist or another workflow runs a generic syntax check.
---

# Python Ecosystem

## Purpose

Apply the declared Python version, packaging, framework, typing, dependency, and validation conventions.

## Activate when

- implementing or reviewing Python modules, packages, framework code, scripts, or tests;
- changing package metadata, dependencies, lockfiles, migrations, typing, linting, or build behavior;
- imports, async execution, resources, transactions, compatibility, or framework conventions matter.

## Do not activate when

- choosing an unapproved greenfield stack;
- the task is textual, administrative, or only runs a generic syntax check for another workflow;
- no Python-specific decision affects the result.

## Required context

Confirm Python and framework versions, package manager and lockfile, environment workflow, application type, declared format/lint/type/test/migration tools, compatibility obligations, and generated paths.

## Workflow

1. Reuse known facts; inspect only missing package, framework, migration, or test configuration.
2. Preserve supported versions, packaging, module structure, framework-native patterns, and public compatibility.
3. Use the existing package manager and update lockfiles through it.
4. Keep import-time side effects minimal and dependencies explicit.
5. Prefer clear modules, typed boundaries, and framework facilities over unnecessary metaprogramming.
6. Validate external data and handle async, resource, transaction, and cleanup boundaries deliberately.
7. Validate the changed behavior with the smallest declared checks.

## Stop conditions

Stop when the requested behavior is implemented and checked, uncertainty cannot affect compatibility or migrations, or a dependency, migration, framework, API, schema, or runtime decision requires approval.

## Guardrails

- Never hand-edit lockfiles, environments, caches, generated files, distributions, or vendored packages.
- Do not assume pytest, mypy, Ruff, Black, Django, FastAPI, or another tool without evidence.
- Do not change supported versions, APIs, schemas, migrations, or formats silently.
- Do not execute migrations, dependency installation, broad tests, or production commands without permission.

## Validation

- Check the implementation against the request and affected Python boundaries.
- Use declared targeted syntax, lint, format, type, or test commands.
- Validate package and migration changes only through approved tooling.
- State runtime, async, migration, integration, or packaging behavior not verified.

## Output

Report Python changes or conclusions, framework and packaging impacts, dependencies or migrations, targeted checks, manual validation, and limitations.