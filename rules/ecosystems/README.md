# Ecosystem Rule Templates

These files are source templates, not global rules.

`project-bootstrap` copies only selected ecosystems into a trusted project's `.codex/rules/` directory. Codex loads every `.rules` file in that project-local directory at session startup.

Available templates:

- `php.rules`
- `python.rules`
- `javascript.rules`
- `shell.rules`
- `ios.rules`
- `docker.rules`

Rules control command approval outside the sandbox. Technical coding conventions belong in the matching ecosystem skill.

Cross-cutting Linux and security rules are stored separately under `rules/capabilities/` and are copied only when explicitly selected.
