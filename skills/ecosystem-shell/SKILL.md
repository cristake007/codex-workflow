---
name: ecosystem-shell
description: Apply shell-script conventions after Shell is established as part of the project. Use for Bash or POSIX shell scripts, installers, administration menus, portability, ShellCheck findings, and shell-specific review. Do not use to choose shell as a greenfield application stack.
---

# Shell Ecosystem

- Identify whether the script targets POSIX `sh`, Bash, PowerShell, or another shell and preserve that contract.
- Quote expansions deliberately, use arrays where supported, validate inputs, and handle command failures explicitly.
- Avoid parsing human-formatted command output when a machine-readable interface exists.
- Keep privileged, destructive, remote, and package-management actions visible and separately confirmable.
- Make reruns predictable; prefer idempotent checks before changing system state.
- Do not hide failures with broad `|| true`, suppress output needed for diagnosis, or mix unrelated administration actions in one command.
- Use approved syntax checks and targeted ShellCheck validation without automatically executing system-changing scripts.
