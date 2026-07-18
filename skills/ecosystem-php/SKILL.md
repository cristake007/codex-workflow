---
name: ecosystem-php
description: Apply established PHP conventions when implementing or reviewing PHP behavior, Composer configuration, framework code, packages, tests, static analysis, or extension packaging, including bounded .php work. Activate only when PHP-specific judgment affects the result. Do not activate merely because PHP files exist or another workflow runs `php -l`.
---

# PHP Ecosystem

## Purpose

Apply the declared PHP version, framework, Composer, compatibility, packaging, and validation conventions.

## Activate when

- implementing or reviewing PHP behavior, framework code, extensions, packages, or tests;
- changing Composer, autoloading, namespaces, metadata, schemas, migrations, static analysis, or packaging;
- PHP compatibility or framework-specific behavior affects correctness.

## Do not activate when

- choosing an unapproved greenfield stack;
- the task is textual, administrative, or only runs `php -l` for another workflow;
- no PHP-specific decision affects the result.

## Required context

Confirm PHP and framework versions, package type, Composer and autoloading, namespace and metadata conventions, public compatibility, migrations, declared checks, and generated or packaged paths.

## Workflow

1. Reuse known facts; inspect only missing Composer, framework, PHP, or test configuration.
2. Preserve supported versions, framework patterns, namespaces, package structure, and public compatibility.
3. Use Composer for dependency and lockfile changes.
4. Prefer framework facilities already in use before custom abstractions or dependencies.
5. Keep domain rules out of controllers, templates, persistence adapters, and metadata where the architecture supports it.
6. Validate inputs, errors, transactions, side effects, and generated output at their boundaries.
7. Validate the changed behavior with the smallest declared checks.

## Stop conditions

Stop when the requested behavior is implemented and checked, uncertainty cannot affect compatibility or packaging, or a dependency, migration, framework, API, schema, or runtime decision requires approval.

## Guardrails

- Never hand-edit `composer.lock`, vendor files, caches, generated proxies, or packaged output.
- Do not change supported versions, public APIs, schemas, migrations, or metadata silently.
- Do not assume PHPUnit, PHPStan, Psalm, or coding-standard commands without evidence.
- Do not execute migrations, package installation, broad tests, or production commands without permission.

## Validation

- Check the implementation against the request and affected PHP boundaries.
- Use targeted `php -l` and declared static-analysis, standard, or test commands when appropriate.
- Validate package or generated artifacts only when affected.
- State compatibility, migration, integration, runtime, or packaging behavior not verified.

## Output

Report PHP changes or conclusions, framework and compatibility impacts, dependencies or migrations, targeted checks, manual validation, and limitations.