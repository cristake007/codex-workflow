# Codex Workflow

Personal Codex instructions, reusable skills, project templates, and cross-platform setup.

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

- links `global/AGENTS.md` to the active Codex home directory;
- links each repository skill individually into `~/.agents/skills`;
- preserves unrelated skills already installed there;
- installs the official Repomix Explorer skill;
- refuses to overwrite unrelated files or skill directories.

`CODEX_HOME` is respected when it is defined. On Windows, if a file symlink cannot be created, the installer uses a managed copy for `AGENTS.md`; rerun `node install.mjs` after `git pull` to refresh it.

## Updating

```text
git pull
node install.mjs
```

## Repository Layout

```text
codex-workflow/
├── global/
│   └── AGENTS.md
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

Global instructions contain only rules that should apply to every task. Detailed reusable workflows and reference material belong in focused skills. Project-specific facts and commands belong in the project's own `AGENTS.md`.
