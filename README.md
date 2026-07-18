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
- enables native lifecycle hooks that export every submitted prompt and completed Bash command;
- installs the repository-managed `software-design` skill;
- installs the official `repomix-explorer` skill from `yamadashy/repomix`;
- configures `repomix-explorer` with `allow_implicit_invocation: false`;
- preserves unrelated skills already installed there;
- refuses to replace unrelated existing skill directories.

A fresh clone followed by `node install.mjs` is sufficient. Repomix itself is not installed globally; the official skill runs it through `npx` only when invoked explicitly.

Normal repository analysis therefore uses targeted search and direct file reads. Repomix Explorer remains available manually through `$repomix-explorer`, but Codex will not select it automatically from an ordinary repository-analysis prompt.

`CODEX_HOME` is respected when it is defined. Its default value is `~/.codex`.

Restart Codex after installation so the configuration, command rules, and skills are reloaded. On the first start after installing or changing the hooks, open `/hooks`, review the two `chat-audit-export` command hooks, and trust them; Codex skips untrusted hooks.

## Chat audit exports

Every Codex chat is exported automatically under `$CODEX_HOME/chat-exports/<session-id>/`. Each session contains:

- `PROMPTS.md` and `prompts.jsonl` with every submitted prompt;
- `COMMANDS.md` and `commands.jsonl` with every completed Bash command and its working directory;
- `session.json` with the session ID, initial working directory, model, and permission mode.

The exporter deliberately does not store command output or assistant responses. These files are local plaintext and may contain sensitive text from prompts or shell commands, so do not commit or share the export directory without reviewing it. Set `CODEX_CHAT_EXPORT_DIR` to use a different export location.

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
│   └── default.rules
├── skills/
│   ├── README.md
│   ├── chat-audit-export/
│   │   ├── SKILL.md
│   │   └── export-chat.mjs
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
