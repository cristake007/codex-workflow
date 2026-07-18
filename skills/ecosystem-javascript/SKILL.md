---
name: ecosystem-javascript
description: Apply established JavaScript or TypeScript conventions when implementing or reviewing JS/TS behavior, configuration, packages, builds, or tests, including bounded work on .js, .mjs, .cjs, .jsx, .ts, and .tsx files. Activate only when JS/TS-specific judgment affects the result. Do not activate merely because such files exist or another workflow runs a syntax check.
---

# JavaScript and TypeScript Ecosystem

## Purpose

Apply the declared runtime, module, package, framework, boundary, and validation conventions without inventing tools or dependencies.

## Activate when

- implementing or reviewing JavaScript or TypeScript behavior;
- changing runtime, modules, packages, framework, build, lint, type, or test configuration;
- async behavior, state ownership, browser/server boundaries, compatibility, or generated output matters.

## Do not activate when

- choosing an unapproved greenfield stack;
- the task is textual, administrative, or only runs a syntax check for another workflow;
- no JS/TS-specific decision affects the result.

## Required context

Confirm the runtime and versions, module system, package manager and lockfile, framework and targets, TypeScript settings when relevant, repository scripts, protected boundaries, and generated paths.

## Workflow

1. Reuse known project facts; inspect only missing authoritative manifests or configuration.
2. Preserve runtime, modules, package manager, framework, directory boundaries, and supported targets.
3. Prefer platform and framework facilities already in use before adding dependencies.
4. Keep state, side effects, async failures, and error propagation explicit.
5. Preserve server/client boundaries and keep secrets or privileged logic out of browser bundles.
6. Treat build output, caches, generated clients, and package artifacts as generated content.
7. Validate the changed behavior with the smallest declared checks.

## Stop conditions

Stop when the requested behavior is implemented and checked, remaining uncertainty cannot affect it, or a dependency, runtime, framework, API, data-model, or architecture change requires approval.

## Guardrails

- Do not change package managers, module systems, frameworks, runtime targets, or major tooling silently.
- Never hand-edit lockfiles or generated output.
- Do not add dependencies unnecessarily or expose server-only data to clients.
- Do not assume common script names; verify them.

## Validation

- Check the implementation against the request and affected JS/TS boundaries.
- Run only declared targeted syntax, lint, type, test, or build checks.
- Do not repeat successful checks against unchanged code or run heavy suites unless required.
- State runtime, browser, integration, or build behavior not verified.

## Output

Report JS/TS changes or conclusions, boundary and dependency impacts, targeted checks, manual validation, and important limitations.