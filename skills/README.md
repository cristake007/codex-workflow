# Personal Codex Skills

Each reusable skill lives in its own directory and contains a required `SKILL.md` file.

The installer links each valid repository skill directory individually into `~/.agents/skills`, allowing repository-managed skills and externally installed skills to coexist.

Current repository skills:

- `software-design` — applies the language-independent engineering constitution to new applications, architecture decisions, major features, substantial refactors, and design reviews.
- `repository-context` — uses Repomix selectively to build a metadata-first, token-limited repository map before broad or cross-file work.

The official `repomix-explorer` skill is installed separately by `install.mjs` from the official Repomix repository. A fresh clone followed by `node install.mjs` therefore installs both the repository-managed Repomix policy skill and the official Repomix Explorer skill.
