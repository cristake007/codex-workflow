---
name: ecosystem-shell
description: Apply established shell conventions when implementing or reviewing Bash, POSIX shell, installers, administration scripts, portability, or ShellCheck-related behavior, including bounded .sh work. Activate only when shell-specific judgment affects the result. Do not activate merely because a shell command or syntax check is used by another workflow.
---

# Shell Ecosystem

## Purpose

Apply the declared interpreter, portability, safety, idempotency, privilege, and validation conventions.

## Activate when

- implementing or reviewing shell, installer, deployment, administration, or menu scripts;
- changing quoting, arguments, pipelines, environment handling, portability, privileges, or failure behavior;
- idempotency, destructive operations, ShellCheck findings, or platform behavior matter.

## Do not activate when

- choosing shell as an unapproved application stack;
- another workflow merely runs a shell command or syntax check;
- no shell-specific decision affects the result.

## Required context

Confirm the interpreter and versions, supported platforms, invocation context, privileges, external commands and services, idempotency and rollback requirements, declared checks, and protected paths.

## Workflow

1. Reuse known facts; inspect only the shebang, caller, documented invocation, or missing platform configuration.
2. Preserve interpreter, portability, arguments, exit semantics, and environment assumptions.
3. Quote expansions, validate input, and handle failures explicitly.
4. Prefer machine-readable interfaces over parsing human-formatted output.
5. Keep privileged, destructive, remote, package, and service operations visible and separately confirmable.
6. Make reruns predictable through idempotent checks.
7. Validate changed behavior without executing unsafe workflows.

## Stop conditions

Stop when the requested behavior is implemented and checked, uncertainty cannot affect safety or portability, or the next step is destructive, privileged, remote, production, or otherwise unapproved.

## Guardrails

- Do not change the interpreter or portability contract silently.
- Do not hide failures through broad suppression or ignored exit codes.
- Do not execute destructive, privileged, remote, installer, or system-changing scripts for validation.
- Do not expose secrets in arguments, logs, output, or files.

## Validation

- Check the implementation against the request and affected shell boundaries.
- Use appropriate targeted syntax checking and configured ShellCheck validation.
- Review parsing, quoting, arguments, and idempotency with safe fixtures or bounded inspection.
- State platform, privilege, integration, and runtime behavior not verified.

## Output

Report shell changes or conclusions, portability and privilege impacts, external actions, targeted checks, manual validation, rollback, and limitations.