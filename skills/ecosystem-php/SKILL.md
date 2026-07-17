---
name: ecosystem-php
description: Apply established PHP ecosystem conventions whenever reviewing or modifying PHP source, Composer configuration, framework code, packages, tests, static analysis, or extension packaging, including bounded single-file work on .php files. Activate after PHP is established or approved. Do not activate to choose PHP for a greenfield project or for work where PHP-specific conventions cannot affect the result.
---

# PHP Ecosystem

## Purpose

Apply the repository's declared PHP version, framework, package, compatibility, and validation conventions without inventing tools or architecture.

## Activate when

- implementing or reviewing PHP source, tests, framework code, extensions, packages, or configuration;
- changing `composer.json`, Composer dependencies, autoloading, namespaces, package structure, static analysis, coding standards, or PHP-specific build and packaging behavior;
- PHP version compatibility, public APIs, schemas, migrations, generated artifacts, or framework conventions affect the task;
- a bounded single-file review or edit still requires PHP-specific judgment.

## Do not activate when

- selecting a language or framework for a greenfield project before user approval;
- the repository has no established or approved PHP ecosystem;
- the task is purely textual, administrative, or unrelated to PHP behavior;
- repository discovery is still required to determine whether PHP is in scope;
- another skill owns the task and no PHP-specific decision remains.

An exact file path is not by itself a reason to skip this skill when the requested work changes or reviews PHP behavior.

## Required context

Use facts already available in the prompt and conversation. Establish only missing PHP-specific context:

- supported PHP version and runtime mode;
- framework, extension platform, or package type;
- Composer usage, lockfile, repositories, and autoloading;
- namespace, directory, dependency, and metadata conventions;
- public API, schema, migration, and backward-compatibility obligations;
- static-analysis, formatting, coding-standard, and test commands actually declared by the repository;
- generated, vendored, cached, packaged, or protected paths.

## Workflow

1. Read the nearest applicable `AGENTS.md`.
2. Reuse PHP, framework, Composer, and validation facts already present in the prompt or conversation.
3. If context is missing, inspect only the nearest authoritative Composer manifest, lockfile, framework metadata, PHP configuration, or test configuration.
4. Preserve the declared PHP version, framework conventions, autoloading, namespaces, package structure, and public compatibility.
5. Use Composer for dependency and lockfile changes; never hand-edit `composer.lock`.
6. Prefer framework and platform facilities already in use before adding custom abstractions or dependencies.
7. Keep domain rules outside controllers, templates, persistence adapters, and framework metadata when the existing architecture supports that separation.
8. Validate external inputs at boundaries and handle errors, transactions, side effects, and generated output deliberately.
9. Treat vendor files, caches, generated proxies, compiled containers, and packaged artifacts as generated content.
10. Run only repository-approved targeted checks proportional to the change.

## Stop conditions

Stop when:

- the requested PHP behavior or review question is resolved;
- required PHP and framework conventions are confirmed from authoritative sources;
- remaining uncertainty does not affect correctness, compatibility, packaging, or validation;
- the next step requires an unapproved dependency, migration, framework change, broad test suite, or runtime environment;
- further inspection would expand beyond the affected PHP boundary.

## Guardrails

- Do not choose PHP or a PHP framework for a greenfield project without approval.
- Do not hand-edit `composer.lock`, vendor files, caches, generated proxies, or packaged output.
- Do not add framework-independent abstractions that duplicate established framework facilities.
- Do not change public APIs, schemas, extension metadata, package compatibility, or supported PHP versions silently.
- Do not assume PHPUnit, PHPStan, Psalm, a coding standard, or command name without repository evidence.
- Do not execute migrations, package installation, framework test suites, or production commands unless explicitly permitted.

## Validation

- Use targeted `php -l` for modified PHP files when appropriate.
- Use repository-declared static analysis, coding-standard, or test commands only when permitted and narrowly scoped.
- Validate Composer metadata through Composer rather than manual lockfile editing.
- Confirm generated or packaged artifacts only when their source changed or the task explicitly requires them.
- State clearly which compatibility, runtime, migration, integration, or packaging behavior remains unverified.

## Output

Report only:

- PHP-specific conclusions or changes;
- framework, Composer, compatibility, and generated-file impacts;
- dependencies or migrations affected;
- targeted checks executed;
- manual validation still required;
- important unverified assumptions.
