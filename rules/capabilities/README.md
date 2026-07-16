# Capability Rule Templates

These files are optional project-local command rules for cross-cutting operational capabilities.

`project-bootstrap` copies only explicitly selected capabilities into `<repo>/.codex/rules/`:

- `linux.rules` — Linux diagnostics and host administration;
- `application-security.rules` — source, dependency, supply-chain, and authorized active security testing;
- `server-security.rules` — firewall, SSH, TLS, access-control, and Linux server hardening.

Capabilities are separate from programming ecosystems. A PHP or JavaScript project does not automatically enable security or Linux administration rules. Security skills require authorized defensive scope before active testing.
