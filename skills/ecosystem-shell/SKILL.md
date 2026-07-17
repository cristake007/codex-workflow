---
name: ecosystem-shell
description: Apply established shell-script conventions whenever reviewing or modifying Bash, POSIX shell, installer, administration, portability, or ShellCheck-related behavior, including bounded single-file work on .sh files. Activate after the target shell is established or approved. Do not activate to choose shell as a greenfield application stack or for work where shell-specific conventions cannot affect the result.
---

# Shell Ecosystem

## Purpose

Apply the repository's declared shell, portability, safety, idempotency, privilege, and validation conventions without inventing execution assumptions.

## Activate when

- implementing or reviewing Bash, POSIX `sh`, installer, administration, deployment, or menu scripts;
- changing quoting, argument parsing, environment handling, pipelines, error propagation, portability, privilege use, or command composition;
- ShellCheck findings, syntax validation, idempotency, destructive operations, or cross-platform behavior affect the task;
- a bounded single-file review or edit still requires shell-specific judgment.

## Do not activate when

- selecting a language or application stack for a greenfield project before user approval;
- the repository has no established or approved shell-script scope;
- the task is purely textual, administrative, or unrelated to shell behavior;
- repository discovery is still required to determine the target shell;
- another skill owns the task and no shell-specific decision remains.

An exact file path is not by itself a reason to skip this skill when the requested work changes or reviews shell behavior.

## Required context

Use facts already available in the prompt and conversation. Establish only missing shell-specific context:

- target interpreter and supported versions;
- POSIX, Bash, PowerShell, or another shell contract;
- supported operating systems and distributions;
- execution user, privilege expectations, working directory, environment variables, and calling context;
- external commands, package managers, remote systems, and system services used;
- idempotency, rollback, destructive-action, and interactive-confirmation requirements;
- repository-approved syntax, ShellCheck, and manual validation commands;
- generated, vendored, installed, or protected paths.

## Workflow

1. Read the nearest applicable `AGENTS.md`.
2. Reuse shell, platform, privilege, and validation facts already present in the prompt or conversation.
3. If context is missing, inspect only the shebang, nearest calling script, documented invocation, and relevant platform configuration.
4. Preserve the declared interpreter, portability contract, argument interface, exit semantics, and environment assumptions.
5. Quote expansions deliberately, use arrays where supported, validate inputs, and handle command failures explicitly.
6. Prefer machine-readable interfaces over parsing human-formatted command output.
7. Keep privileged, destructive, remote, package-management, and service-changing operations visible and separately confirmable.
8. Make reruns predictable through idempotent checks before changing system state.
9. Avoid broad error suppression, hidden failures, and unrelated administration actions in one command.
10. Run only approved syntax and targeted static checks; do not automatically execute system-changing scripts.

## Stop conditions

Stop when:

- the requested shell behavior or review question is resolved;
- interpreter, platform, privilege, and invocation assumptions are confirmed sufficiently;
- remaining uncertainty does not affect safety, portability, idempotency, or correctness;
- the next step would execute a destructive, privileged, remote, production, or otherwise unapproved action;
- further inspection would expand beyond the affected script boundary.

## Guardrails

- Do not change the interpreter or portability contract silently.
- Do not hide failures with broad `|| true`, unconditional output suppression, or ignored exit codes.
- Do not execute destructive, privileged, remote, package-management, service, firewall, storage, or account changes without explicit authorization.
- Do not place secrets in command arguments, logs, generated output, or committed files.
- Do not run system-changing scripts merely to validate syntax or logic.
- Do not assume ShellCheck availability, target shell, distribution, or command behavior without evidence.
- Preserve existing user data, configuration, permissions, ownership, and rollback paths.

## Validation

- Use the target shell's syntax checker, such as `bash -n`, only when appropriate and permitted.
- Use targeted ShellCheck validation when available and configured.
- Validate parsing, quoting, argument handling, and idempotency through bounded review or safe fixtures rather than live system changes.
- Do not execute privileged, destructive, remote, production, installer, or administration workflows automatically.
- State clearly which platform, privilege, integration, or runtime behavior remains unverified.

## Output

Report only:

- shell-specific conclusions or changes;
- interpreter, portability, privilege, and idempotency impacts;
- destructive or externally visible actions affected;
- targeted checks executed;
- manual validation commands;
- important unverified assumptions and rollback needs.
