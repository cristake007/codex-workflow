# Codex Workflow

Personal Codex configuration and reusable skills.

## Windows setup

Clone the repository inside your Windows user profile, then run the installer once:

```powershell
git clone https://github.com/cristake007/codex-workflow.git "$HOME\codex-workflow"
PowerShell -ExecutionPolicy Bypass -File "$HOME\codex-workflow\install-windows.ps1"
```

The installer does not copy or move the tracked files. It creates links from Codex's expected user locations to this repository:

- `$HOME\.codex\AGENTS.md` → `global\AGENTS.md`
- `$HOME\.agents\skills` → `skills`

Afterwards, `git pull` updates the global instructions and skills directly.

## Repository layout

```text
codex-workflow/
├── global/
│   └── AGENTS.md
├── skills/
│   └── README.md
├── templates/
│   └── README.md
├── install-windows.ps1
├── .gitignore
└── README.md
```

The actual instructions and skills will be developed incrementally and tested against real projects.
