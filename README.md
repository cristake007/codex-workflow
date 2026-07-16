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
- installs the repository-managed workflow and ecosystem skills;
- installs the official `repomix-explorer` skill from `yamadashy/repomix`;
- configures `repomix-explorer` with `allow_implicit_invocation: false`;
- preserves unrelated skills already installed there;
- refuses to replace unrelated existing skill directories.

A fresh clone followed by `node install.mjs` is sufficient. Repomix itself is not installed globally; the official skill runs it through `npx` only when invoked explicitly.

Normal repository analysis therefore uses targeted search and direct file reads. Repomix Explorer remains available manually through `$repomix-explorer`, but Codex will not select it automatically from an ordinary repository-analysis prompt.

`CODEX_HOME` is respected when it is defined. Its default value is `~/.codex`.

Restart Codex after installation so the configuration, command rules, and skills are reloaded.

## Project Discovery and Bootstrap

`project-discovery` distinguishes an existing project from a greenfield repository.

For existing projects, it detects repository evidence and preserves the established stack. For greenfield repositories, it requires product clarification and explicit stack approval before scaffolding code or selecting ecosystems.

After the ecosystems are known, initialize project-local Codex support:

```text
node init-project.mjs --target /path/to/project --ecosystems php,javascript,docker
```

The command creates:

- `.codex/project-profile.json`;
- `.codex/environment.local.example.md`;
- only the selected ecosystem rules under `.codex/rules/`.

It does not select a greenfield technology stack, generate application code, modify the global `AGENTS.md`, or overwrite different existing project files. A trusted project and a Codex restart are required before project-local rules load.

The project `AGENTS.md` is created separately from confirmed project requirements so it contains real project context instead of generic placeholders.

## Updating

```text
git pull
node install.mjs
```

Files that are already identical are left unchanged and do not create unnecessary backups. If Repomix Explorer already has an `agents/openai.yaml`, the installer preserves its other metadata, backs up the file before changing it, and enforces only `policy.allow_implicit_invocation: false`.

## Repository Layout

```text
codex-workflow/
├── config/
│   └── config.toml
├── global/
│   └── AGENTS.md
├── rules/
│   ├── default.rules
│   └── ecosystems/
│       ├── php.rules
│       ├── python.rules
│       ├── javascript.rules
│       ├── shell.rules
│       ├── ios.rules
│       └── docker.rules
├── skills/
│   ├── project-discovery/
│   ├── project-bootstrap/
│   ├── delivery-review/
│   ├── ecosystem-php/
│   ├── ecosystem-python/
│   ├── ecosystem-javascript/
│   ├── ecosystem-shell/
│   ├── ecosystem-ios/
│   ├── ecosystem-docker/
│   └── software-design/
├── templates/
│   ├── AGENTS-project.md
│   ├── environment.local.example.md
│   ├── project-profile.example.json
│   └── README.md
├── init-project.mjs
├── install.mjs
├── .gitignore
└── README.md
```

Global instructions contain only behavioral rules that should apply to every task. `config.toml` controls Codex runtime defaults, while global `.rules` files control general command approval outside the sandbox. Detailed reusable workflows and technical conventions belong in focused skills. Project-specific facts and commands belong in the project's own `AGENTS.md`, while selected ecosystem command rules belong in the trusted project's `.codex/rules/` directory.
