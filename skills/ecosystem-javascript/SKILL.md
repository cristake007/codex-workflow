---
name: ecosystem-javascript
description: Apply JavaScript and TypeScript ecosystem conventions after the project stack is known. Activate for JS/TS implementation, review, package management, runtime, framework, build, test, browser, or Node.js decisions. Do not activate to choose JavaScript for a greenfield project or for work where JavaScript-specific conventions cannot affect the result.
---

# JavaScript and TypeScript Ecosystem

## Purpose

Apply the established JavaScript or TypeScript stack consistently without inventing runtimes, tools, scripts, or dependencies.

## Activate when

- implementing or reviewing JavaScript or TypeScript behavior;
- changing Node.js, browser, frontend, backend, package-manager, build, bundler, test, lint, type-check, or framework configuration;
- the task depends on the declared runtime, module system, package manager, framework, TypeScript settings, browser targets, or generated output;
- JavaScript-specific state ownership, asynchronous behavior, server/client boundaries, dependency use, or validation decisions are relevant.

## Do not activate when

- the task is selecting a language or framework for a greenfield project before user approval;
- the task is repository discovery rather than JavaScript or TypeScript work;
- the change is purely textual or administrative and JavaScript-specific conventions cannot affect the result;
- the repository has no established or approved JavaScript or TypeScript ecosystem;
- another skill owns the task and no JS/TS-specific decision remains.

An exact file path is not by itself a reason to skip this skill when the requested change modifies JavaScript or TypeScript behavior.

## Required context

Use information already available in the prompt and conversation before inspecting files. Establish only the missing items needed for the task:

- runtime and supported versions;
- module system;
- package manager and lockfile;
- framework or platform;
- TypeScript configuration when applicable;
- browser or server targets;
- repository scripts and approved validation commands;
- generated, vendored, server-only, client-only, or protected paths.

## Workflow

1. Read the nearest applicable `AGENTS.md`.
2. Reuse runtime, package-manager, framework, and validation information already present in the prompt or conversation.
3. If required context is missing, inspect only the nearest authoritative manifest, lockfile, runtime file, framework configuration, TypeScript configuration, or package scripts.
4. Preserve the declared runtime, module system, package manager, framework conventions, directory boundaries, and supported targets.
5. Prefer platform, language, and framework features already in use before adding utilities or dependencies.
6. Keep state ownership, side effects, network boundaries, asynchronous failures, and error propagation explicit.
7. Preserve server/client boundaries and prevent secrets or privileged logic from entering browser bundles.
8. Treat build output, generated clients, transpiled files, caches, and package-manager artifacts as generated content.
9. Select only validation commands that are declared by the repository and proportional to the change.

## Stop conditions

Stop inspecting or changing files when:

- the runtime, package manager, framework, relevant boundaries, and validation path are known;
- the requested behavior is implemented or reviewed within the declared scope;
- remaining uncertainty cannot affect the result;
- a materially different dependency, framework, runtime, public API, data model, or architecture decision requires user approval.

## Guardrails

- Do not choose JavaScript or TypeScript for a greenfield project without approval.
- Do not change package managers, module systems, frameworks, runtime targets, or major tooling without explicit scope.
- Never hand-edit lockfiles.
- Do not edit generated or compiled output directly.
- Do not add a dependency when the existing stack can solve the requirement clearly.
- Do not assume common script names such as `test`, `lint`, `build`, or `typecheck`; verify them.
- Do not expose credentials, server-only code, or privileged data to client bundles.
- Keep changes limited to the requested behavior.

## Validation

- Run only repository-approved targeted syntax, lint, type, test, or build checks that are proportionate to the modified files.
- Do not run full test suites, heavy builds, browser tests, integration tests, or infrastructure-based checks unless explicitly requested or required by applicable instructions.
- Do not repeat a validation command unless relevant code, configuration, dependencies, or environment state changed.
- Never claim a check passed when it was not executed.
- Provide exact manual commands for broader validation.

## Output

Report only applicable items:

- the JavaScript or TypeScript context used;
- what behavior or configuration changed;
- dependency, lockfile, generated-file, or boundary implications;
- targeted checks executed;
- manual validation commands;
- important unverified assumptions or limitations.
