---
name: repository-context
description: >
  Build a token-efficient map of an unfamiliar or structurally complex repository
  before architecture work, major feature implementation, broad bug investigation,
  or cross-file refactoring. Use Repomix only when normal targeted search would
  require repeated exploration across many directories. Do not use for known files,
  isolated edits, single-symbol searches, or small repositories that can be
  understood with a few direct reads.
---

# Repository Context

Use Repomix as a selective repository index, not as a replacement for direct file inspection.

## When to use

Use this skill when one or more of the following are true:

- the repository is unfamiliar and its architecture is not yet clear;
- the task spans several modules or directories;
- a major feature or refactor requires understanding existing ownership and dependencies;
- a broad bug investigation would otherwise require many exploratory file reads;
- the user explicitly asks for a repository map or Repomix analysis.

Do not use it for:

- a known file or path;
- an isolated edit;
- a lookup answerable with one or two searches;
- a small repository that can be understood with a few direct reads;
- routine Git, test, build, or installation work.

## Mandatory workflow

### 1. Start with a metadata-only map

Never begin by packing the full repository contents.

Create a temporary output directory outside the repository, then run:

```text
npx --yes repomix@latest . --no-files --token-count-tree 1000 --top-files-len 20 --output <temporary-directory>/repomix-map.xml
```

Use the map to identify:

- relevant directories;
- likely entry points;
- large files or directories;
- file types needed for the current task;
- areas that can be excluded safely.

### 2. Build only a targeted snapshot

After selecting the relevant scope, run a targeted pack similar to:

```text
npx --yes repomix@latest . --include "<relevant-patterns>" --ignore "<additional-exclusions>" --compress --remove-comments --remove-empty-lines --truncate-base64 --token-budget 40000 --output <temporary-directory>/repomix-context.xml
```

Choose `--include` patterns from actual evidence gathered in the metadata map. Do not use a generic full-repository include.

### 3. Search before reading

Search the packed output for relevant symbols, modules, routes, models, services, or configuration before reading large sections. Read only the portions needed to decide which real files to inspect.

### 4. Verify against the real repository

Before editing, open the actual repository files. Treat Repomix output as an index and snapshot, never as the authoritative source.

## Token and output limits

- Target at most 40,000 packed tokens.
- If the token budget is exceeded, do not read the oversized output.
- Delete the oversized output, narrow `--include`, add exclusions, and rerun once.
- Prefer `--compress` for architecture discovery and cross-file mapping.
- Do not use `--split-output`; reduce scope instead.
- Do not use `--watch`.
- Do not store Repomix output inside the repository.
- Delete temporary Repomix files after the analysis is complete.
- Never commit Repomix output.

## Safety requirements

Keep Repomix security and ignore behavior enabled.

Never use:

- `--no-security-check`;
- `--no-gitignore`;
- `--no-default-patterns`.

Do not include Git logs or diffs unless recent history is directly relevant to the task.

## Completion report

Mention briefly:

- that Repomix was used;
- the selected repository scope;
- the approximate packed token count;
- whether compression was used;
- that real files were inspected before changes.

Do not create a separate report or plan file unless the user explicitly requests one.
