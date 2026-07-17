# Codex Workflow

Personal Codex instructions, configuration, command rules, reusable skills, project templates, and cross-platform setup.

## Requirements

- Node.js 22 or newer
- Git
- Windows or Linux

## Setup

```text
git clone https://github.com/cristake007/codex-workflow.git
cd codex-workflow
node install.mjs
```

The installer:

- copies `global/AGENTS.md`, `config.toml`, and the global `default.rules` into `CODEX_HOME`;
- backs up different managed files before replacement;
- links each repository skill individually into `~/.agents/skills`;
- installs the repository-managed workflow, ecosystem, Linux, and security skills;
- installs Repomix Explorer for explicit invocation only;
- preserves unrelated installed skills.

`CODEX_HOME` defaults to `~/.codex`. Restart Codex after installation.

## Project Discovery and Bootstrap

`project-discovery` distinguishes existing, greenfield, and ambiguous repositories. It preserves established technologies and does not choose a stack for an empty repository without user approval.

### Mechanical setup

```text
node init-project.mjs \
  --target /path/to/project \
  --ecosystems php,javascript,docker \
  --capabilities linux,application-security,server-security
```

### Interactive `AGENTS.md` generator

```text
node init-project.mjs --target /path/to/project --interactive
```

Add `--advanced` for extra security and compatibility questions.

### Repeatable generation from confirmed answers

```text
node init-project.mjs \
  --target /path/to/project \
  --answers project-answers.json
```

See `templates/project-answers.example.json` for the accepted shape.

The bootstrap creates:

- a concise repository `AGENTS.md` when `--interactive` or `--answers` is used;
- `.codex/project-profile.json`;
- `.codex/environment.local.example.md`;
- only the selected rule files under `.codex/rules/`.

It does not generate application code, modify the global `AGENTS.md`, choose a greenfield stack, or overwrite different existing project files.

## Ecosystems and Capabilities

Programming ecosystems:

- PHP
- Python
- JavaScript and TypeScript
- Shell
- iOS and Swift
- Docker

Optional cross-cutting capabilities:

- Linux administration and troubleshooting
- Application security
- Linux server security

Capabilities are selected separately. A web project does not automatically receive security rules, and a Docker project does not automatically authorize host administration.

Security skills are defensive. Active testing requires confirmed ownership or authorization, a defined target, and explicit scope.

## Updating

```text
git pull
node install.mjs
```

Identical files are left unchanged and do not create unnecessary backups.

## Uninstalling

Inspect the planned changes first:

```text
node uninstall.mjs --dry-run
```

Apply the uninstall:

```text
node uninstall.mjs
```

The uninstaller:

- restores the newest valid backup for each unchanged repository-managed Codex file;
- removes a managed file only when it still matches the repository source and no backup exists;
- leaves modified files, directories, symlinks, and unrelated skills untouched;
- removes only skill links that resolve to the corresponding skill directory in this repository;
- restores installer-managed Repomix Explorer metadata when its backup can be verified, while preserving the external Repomix Explorer skill;
- preserves the repository `projects/` workspace and all backup directories.

## Validation

```text
node --check install.mjs
node --check uninstall.mjs
node --check init-project.mjs
node --test tests/project-bootstrap.test.mjs
node --test tests/uninstall.test.mjs
```

## Repository Layout

```text
codex-workflow/
├── config/
│   └── config.toml
├── global/
│   └── AGENTS.md
├── rules/
│   ├── default.rules
│   ├── ecosystems/
│   └── capabilities/
├── skills/
│   ├── project-discovery/
│   ├── project-bootstrap/
│   ├── delivery-review/
│   ├── ecosystem-*/
│   ├── linux-*/
│   ├── security-review/
│   ├── application-security/
│   ├── server-security/
│   └── software-design/
├── templates/
├── tests/
├── init-project.mjs
├── install.mjs
├── uninstall.mjs
└── README.md
```

Global instructions contain behavior that applies to every task. Project facts belong in the repository `AGENTS.md`. Reusable conventions belong in focused skills. Command approvals for selected technologies and capabilities belong in the trusted project's `.codex/rules/` directory.
