# Personal Codex Skills

Each reusable skill lives in its own directory and contains a required `SKILL.md` file.

The installer links each valid repository skill directory individually into `~/.agents/skills`, allowing repository-managed skills and externally installed skills to coexist.

Current repository directories:

- `software-design` — applies the language-independent engineering constitution to new applications, architecture decisions, major features, substantial refactors, and design reviews.
- `chat-audit-export` — infrastructure-only lifecycle hook code for local prompt and Bash-command exports. It is explicitly disabled as a task skill in `config/config.toml`.

The official `repomix-explorer` skill is installed separately by `install.mjs` from the official Repomix repository. The installer adds or updates `agents/openai.yaml` so `policy.allow_implicit_invocation` is `false`. Repomix Explorer therefore remains available through explicit `$repomix-explorer` invocation but is not selected automatically for ordinary repository-analysis prompts.
