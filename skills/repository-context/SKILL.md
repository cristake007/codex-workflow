---
name: repository-context
description: >
  Decide whether a repository is large or structurally complex enough to justify
  Repomix before architecture work, broad bug investigation, major feature work,
  or cross-file refactoring. Prefer direct inspection for small repositories,
  known paths, isolated edits, and tasks answerable with a few targeted searches.
  Use Repomix only when manual exploration across many files or directories would
  be slower and less reliable.
---

# Repository Context

Use direct repository inspection first. Repomix is an escalation tool for broad or unclear codebases, not the default first step.

## Decision gate

Before running Repomix:

1. Check the working tree and applicable repository instructions.
2. List tracked files and inspect the top-level structure.
3. Estimate whether the task can be answered with at most five targeted searches or file reads.
4. Identify whether the relevant paths are already known.

Do not use Repomix when any of these are true:

- fewer than 100 relevant tracked files exist;
- the repository is small enough to understand from its top-level structure and a few direct reads;
- the task concerns a known file, path, symbol, or isolated component;
- the relevant scope is likely fewer than about 10 files;
- one to five targeted searches or reads are sufficient;
- the task is routine Git, test, build, installation, or configuration work;
- starting Repomix is likely slower than direct inspection.

Use Repomix only when one or more of these are true:

- the repository is unfamiliar and structurally broad;
- relevant code spans many directories or modules;
- ownership, execution flow, or dependencies remain unclear after initial direct inspection;
- a major feature or refactor requires a cross-cutting architecture map;
- a broad bug investigation would otherwise require repeated exploratory reads;
- the user explicitly requests Repomix or a packed repository map.

If Repomix is not justified, continue silently with direct inspection. Do not explain that it was skipped unless the distinction is useful to the final answer.

## Direct-inspection workflow

For small or clear repositories:

1. Use `git ls-files` or an equivalent tracked-file listing.
2. Inspect only the entry points, configuration files, and modules relevant to the request.
3. Prefer `rg` or equivalent targeted search before opening full files.
4. Stop once the evidence is sufficient.
5. Do not run tests, syntax checks, policy simulations, configuration parsers, or other validations for a read-only explanation unless:
   - the user explicitly requests validation; or
   - a specific claim cannot be established reliably by reading the source.

## Repomix workflow

### 1. Use one targeted pass by default

When the initial file listing already reveals the relevant directories, skip the metadata-only pass and run one targeted snapshot:

```text
npx --yes repomix . --include "<relevant-patterns>" --ignore "<additional-exclusions>" --compress --remove-comments --remove-empty-lines --truncate-base64 --token-budget 40000 --output <temporary-directory>/repomix-context.xml
```

Choose `--include` patterns from evidence gathered through direct listing and search. Never begin with a full-content pack of the entire repository.

Do not use `@latest` during normal analysis. Use the installed or cached Repomix version. Upgrade only when explicitly requested.

### 2. Use a metadata pass only when scope is genuinely unclear

Run a metadata-only map only when direct listing does not reveal the relevant scope:

```text
npx --yes repomix . --no-files --token-count-tree 1000 --top-files-len 20 --output <temporary-directory>/repomix-map.xml
```

Use it to select directories, entry points, file types, and exclusions. Then run one targeted content snapshot.

### 3. Search before reading

Search the packed output for relevant symbols, modules, routes, models, services, or configuration. Read only the portions needed to identify the authoritative source files.

### 4. Verify selectively against real files

Treat Repomix output as an index and snapshot, never as the source of truth.

Before editing, open the actual repository files. For read-only analysis, verify only the small set of real files that support the final conclusions. Do not repeat broad searches already completed against the packed output.

## Token, time, and output limits

- Target at most 40,000 packed tokens.
- Prefer one Repomix invocation per task.
- A second invocation is allowed only when a metadata map was genuinely required or the first targeted scope exceeded the token budget.
- If the token budget is exceeded, do not read the oversized output.
- Delete it, narrow `--include`, add exclusions, and rerun once.
- Prefer `--compress` for architecture discovery and cross-file mapping.
- Do not use `--split-output`; reduce scope instead.
- Do not use `--watch`.
- Do not store Repomix output inside the repository.
- Delete temporary Repomix files after analysis.
- Never commit Repomix output.

## Safety requirements

Keep Repomix security and ignore behavior enabled.

Never use:

- `--no-security-check`;
- `--no-gitignore`;
- `--no-default-patterns`.

Do not include Git logs or diffs unless recent history is directly relevant to the task.

## Completion behavior

When Repomix was used, mention briefly:

- the selected repository scope;
- the approximate packed token count;
- whether compression was used;
- that relevant real files were verified.

When Repomix was not used, do not add a special note unless the user asked about tool selection.

Do not create a separate report or plan file unless the user explicitly requests one.