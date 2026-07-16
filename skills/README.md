# Personal Codex Skills

Each reusable skill lives in its own directory and contains a required `SKILL.md` file.

The installer links each valid repository skill directory individually into `~/.agents/skills`, allowing repository-managed skills and externally installed skills to coexist.

## Workflow skills

- `project-discovery` — classifies existing versus greenfield repositories, detects established ecosystems, and prevents unapproved technology or capability selection.
- `project-bootstrap` — generates project-specific Codex context, a concise `AGENTS.md`, environment templates, profiles, and selected local rules.
- `delivery-review` — performs one bounded final review of the requested task and effective diff.
- `software-design` — applies the language-independent engineering constitution to architecture and substantial design work.

## Ecosystem skills

- `ecosystem-php`
- `ecosystem-python`
- `ecosystem-javascript`
- `ecosystem-shell`
- `ecosystem-ios`
- `ecosystem-docker`

Ecosystem skills provide technical conventions only after a stack is established or explicitly approved. They do not choose technologies for greenfield projects.

## Linux skills

- `linux-troubleshooting` — evidence-first diagnosis of Linux system and service problems.
- `linux-system-administration` — reversible host administration with validation and rollback.
- `linux-service-management` — safe systemd, reverse-proxy, service-account, logging, and deployment operations.

## Security skills

- `security-review` — confirms authorized scope, builds a threat model, and routes application or server security work.
- `application-security` — reviews code, APIs, authentication, authorization, data flows, dependencies, and secure design.
- `server-security` — assesses and hardens Linux hosts while preserving access and availability.

Linux and security are optional cross-cutting capabilities. They are not enabled merely because a repository uses Docker, JavaScript, PHP, or another ecosystem.

The official `repomix-explorer` skill is installed separately by `install.mjs`. It remains available through explicit `$repomix-explorer` invocation but is not selected automatically for ordinary repository analysis.
