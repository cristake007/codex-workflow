# Personal Codex Skills

Each reusable skill lives in its own directory and contains a required `SKILL.md` file.

The installer links each valid repository skill directory individually into `~/.agents/skills`, allowing repository-managed skills and externally installed skills to coexist.

## Workflow skills

- `project-discovery` — classifies existing versus greenfield repositories, detects established ecosystems, and prevents unapproved greenfield stack selection.
- `project-bootstrap` — creates project-specific Codex context, profiles, environment templates, and selected local rules after discovery.
- `delivery-review` — performs one bounded final review of the requested task and effective diff.
- `software-design` — applies the language-independent engineering constitution to new applications, architecture decisions, major features, substantial refactors, and design reviews.

## Ecosystem skills

- `ecosystem-php`
- `ecosystem-python`
- `ecosystem-javascript`
- `ecosystem-shell`
- `ecosystem-ios`
- `ecosystem-docker`

Ecosystem skills provide technical conventions only after a stack is established or explicitly approved. They do not choose technologies for greenfield projects.

The official `repomix-explorer` skill is installed separately by `install.mjs` from the official Repomix repository. The installer adds or updates `agents/openai.yaml` so `policy.allow_implicit_invocation` is `false`. Repomix Explorer therefore remains available through explicit `$repomix-explorer` invocation but is not selected automatically for ordinary repository-analysis prompts.
