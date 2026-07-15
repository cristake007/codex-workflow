# Codex Workflow

Personal Codex instructions, configuration, command rules, reusable skills, project templates, and cross-platform setup.

## Requirements

- Node.js 22 or newer
- Git
- Windows or Linux

## Setup

Clone the repository and run the same installer on Windows or Linux:

```text
git clone https://github.com/cristake007/codex-workflow.git
cd codex-workflow
node install.mjs
```

The installer:

- copies `global/AGENTS.md` to `$CODEX_HOME/AGENTS.md`;
- copies `config/config.toml` to `$CODEX_HOME/config.toml`;
- copies `rules/default.rules` to `$CODEX_HOME/rules/default.rules`;
- creates a timestamped backup under `$CODEX_HOME/backups/` before replacing a different existing managed file;
- links each repository skill individually into `~/.agents/skills`;
- installs the repository-managed `software-design` skill;
- installs the official `repomix-explorer` skill from `yamadashy/repomix`;
- preserves unrelated skills already installed there;
- refuses to replace unrelated existing skill directories.

A fresh clone followed by `node install.mjs` is sufficient. Repomix itself is not installed globally; the official skill runs it through `npx` only when needed.

Global instructions require targeted repository inspection first and allow Repomix only when broad exploration across many unknown files or directories would be more efficient than direct search and selective reads.

`CODEX_HOME` is respected when it is defined. Its default value is `~/.codex`.

Restart Codex after installation so the configuration, command rules, and skills are reloaded.

## Updating

```text
git pull
node install.mjs
```

Files that are already identical are left unchanged and do not create unnecessary backups.

## Repository Layout

```text
codex-workflow/
├── config/
│   └── config.toml
├── global/
│   └── AGENTS.md
├── rules/
│   └── default.rules
├── skills/
│   ├── README.md
│   └── software-design/
│       ├── SKILL.md
│       └── references/
│           └── engineering-constitution.md
├── templates/
│   ├── AGENTS-project.md
│   └── README.md
├── install.mjs
├── .gitignore
└── README.md
```

Global instructions contain only behavioral rules that should apply to every task. `config.toml` controls Codex runtime defaults, while `.rules` files control command approval outside the sandbox. Detailed reusable workflows and reference material belong in focused skills. Project-specific facts and commands belong in the project's own `AGENTS.md`.
