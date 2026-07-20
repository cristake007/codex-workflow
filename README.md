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

## Engineering Workflow Pack

The existing technical and safety skills remain authoritative. A curated engineering workflow layer adapts concepts from Matt Pocock's `skills` repository without importing its automatic commit, broad scan, heavy-test, or mandatory-interview defaults.

User-invoked orchestration:

- `requirements-interview` — resolve material product or architecture ambiguity;
- `to-spec` — capture already resolved requirements;
- `to-tickets` — create dependency-aware tasks that can each begin in a new agent session;
- `knowledge-capture` — record durable conclusions in the knowledge vault.

Reusable engineering discipline:

- `tdd`;
- `diagnosing-bugs`;
- `domain-modeling`;
- `codebase-design`;
- `resolving-merge-conflicts`.

See `skills/README.md` for activation boundaries and the complete skill contract. Attribution and the applicable MIT notice are in `THIRD_PARTY_NOTICES.md`.

## Obsidian Knowledge Vault

Open the repository's `knowledge/` directory as a standalone Obsidian vault.

The vault stores reviewed knowledge rather than raw transcripts:

```text
captures and audit evidence
          ↓
reviewed sessions, decisions, experiments, and patterns
          ↓
approved workflow changes
```

The vault includes:

- a dashboard;
- project, session, decision, experiment, pattern, and improvement-note conventions;
- core Obsidian templates with YAML properties;
- tracked core-plugin and template-folder settings;
- Git ignores for volatile workspace state;
- no community-plugin dependency.

Raw command logs and reports stay in their existing capture locations and should be linked from vault notes rather than duplicated. Improvement notes do not automatically modify skills, rules, or `AGENTS.md`.

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
- preserves the repository `projects/` workspace, `knowledge/` vault, and all backup directories.

## Validation

```text
node --check install.mjs
node --check uninstall.mjs
node --check init-project.mjs
node --test tests/project-bootstrap.test.mjs
node --test tests/uninstall.test.mjs
node --test tests/workflow-pack.test.mjs
```

## Repository Layout

```text
codex-workflow/
├── config/
│   └── config.toml
├── global/
│   └── AGENTS.md
├── knowledge/
│   ├── .obsidian/
│   ├── Dashboard.md
│   └── Templates/
├── rules/
│   ├── default.rules
│   ├── ecosystems/
│   └── capabilities/
├── skills/
│   ├── project-discovery/
│   ├── project-bootstrap/
│   ├── delivery-review/
│   ├── requirements-interview/
│   ├── to-spec/
│   ├── to-tickets/
│   ├── tdd/
│   ├── diagnosing-bugs/
│   ├── domain-modeling/
│   ├── codebase-design/
│   ├── resolving-merge-conflicts/
│   ├── knowledge-capture/
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

Global instructions contain behavior that applies to every task. Project facts belong in the repository `AGENTS.md`. Reusable conventions belong in focused skills. Command approvals for selected technologies and capabilities belong in the trusted project's `.codex/rules/` directory. Curated cross-session knowledge belongs in the `knowledge/` vault.