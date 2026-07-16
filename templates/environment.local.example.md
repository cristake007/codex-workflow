# Local Development Environment

Copy this file to `.codex/environment.local.md` and keep the real file uncommitted when it contains machine-specific or sensitive information.

## Workstation

- Operating system and version:
- Linux distribution and init system, when applicable:
- Shell:
- Available runtimes and versions:
- Package managers:
- Docker or container runtime:
- Privilege escalation method and restrictions:

## Existing Services

- Service name:
- Local path, systemd unit, or Compose project:
- URL, socket, or port:
- Persistent data location:
- May Codex start, stop, reload, rebuild, or recreate it:

## Remote Environments

- Environment and host role:
- Access method and recovery access:
- Public exposure:
- Allowed actions:
- Prohibited actions:
- Production change rules:

## Security Boundaries

- Sensitive data categories:
- Secret storage locations or mechanisms, without values:
- Firewall, reverse proxy, SSH, and TLS ownership:
- External systems that may be inspected but not modified:
- Authorized security-testing scope:

## Validation Constraints

- Checks Codex may run automatically:
- Checks the user runs manually:
- Expensive, disruptive, or prohibited operations:
- Required rollback or backup procedure:

## Sensitive Locations

List paths or systems that may be inspected only when required. Never place credentials, tokens, private keys, or secret values in this file.
