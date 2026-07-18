---
name: chat-audit-export
description: Internal infrastructure that stores Codex prompts and completed shell commands through lifecycle hooks. Never invoke this as a task skill.
---

# Chat Audit Export

This directory exists only because `install.mjs` links repository skills into the user skill directory, giving the global lifecycle hooks a stable cross-project script path.

Do not invoke this skill for user tasks. It is disabled in `config/config.toml` and is used only by `UserPromptSubmit` and `PostToolUse` hooks.
