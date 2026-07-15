# Project Agent Instructions

> This file contains only repository-specific context, constraints, and validation rules.
> Global behavior is defined by the user's global `AGENTS.md`.
> Replace every placeholder before using this file. Use `Not applicable` where necessary.

## 1. Project Overview

- Project name: `[PROJECT NAME]`
- Purpose: `[WHAT THE PROJECT DOES]`
- Project type: `[APPLICATION / EXTENSION / SCRIPT / SERVICE / LIBRARY / OTHER]`
- Current status: `[NEW / PROTOTYPE / ACTIVE DEVELOPMENT / MAINTENANCE]`
- Intended users: `[WHO USES IT]`
- Expected deliverables: `[SOURCE CODE / PACKAGE / ARCHIVE / EXECUTABLE / OTHER]`

## 2. Functional Source of Truth

The authoritative functional requirements are:

- `[FILE, ISSUE, SPECIFICATION, OR CURRENT USER REQUIREMENTS]`

Instruction priority:

1. current explicit user request;
2. designated functional source of truth;
3. this project `AGENTS.md`;
4. established project conventions and existing implementation.

Other documentation is informative unless explicitly designated as authoritative.

Report contradictions before implementation when they could materially affect functionality, data, security, compatibility, or architecture.

## 3. Technology, Environment and Compatibility

- Primary language and version: `[VALUE]`
- Runtime or framework: `[VALUE OR NOT APPLICABLE]`
- Frontend technology: `[VALUE OR NOT APPLICABLE]`
- Database or storage: `[VALUE OR NOT APPLICABLE]`
- Package manager: `[VALUE OR NOT APPLICABLE]`
- Development environment: `[VALUE]`
- Deployment or runtime environment: `[VALUE]`
- Existing services available to the project: `[VALUE OR NONE]`
- Containers or temporary services: `[ALLOWED / NOT ALLOWED / ONLY WHEN REQUESTED]`
- Supported platforms and versions: `[VALUE]`
- Required backward compatibility: `[VALUE OR NONE]`
- Production access: `[NOT ALLOWED / SPECIFIC RULES]`

Do not introduce a new language, framework, database, service, or major dependency unless the requirement genuinely needs it and the change is announced first.

## 4. Repository Structure

Important locations:

- `[PATH]` — `[PURPOSE]`
- `[PATH]` — `[PURPOSE]`
- `[PATH]` — `[PURPOSE]`

Generated locations:

- `[PATH]` — `[GENERATION METHOD OR NOT APPLICABLE]`

Vendored, external, or protected locations:

- `[PATH]` — `[RESTRICTION OR NOT APPLICABLE]`

Inspect the existing structure before creating new directories, naming conventions, modules, or architectural layers.

## 5. Project Rules, Boundaries and Constraints

### Included Scope

- `[FUNCTIONALITY OR RESPONSIBILITY]`
- `[FUNCTIONALITY OR RESPONSIBILITY]`

### Non-Goals

- `[OUT-OF-SCOPE FUNCTIONALITY]`
- `[OUT-OF-SCOPE FUNCTIONALITY]`

### Project-Specific Rules

- `[RULE]`
- `[RULE]`

### Prohibited Actions

- `[ACTION THAT MUST NOT BE PERFORMED]`
- `[ACTION THAT MUST NOT BE PERFORMED]`

### Data and Security

- Sensitive data handled: `[VALUE OR NONE]`
- Authentication and authorization requirements: `[VALUE OR NONE]`
- Validation requirements: `[VALUE OR SOURCE]`
- Audit or logging requirements: `[VALUE OR NONE]`
- Privacy, retention, or deletion requirements: `[VALUE OR NONE]`

### Compatibility Constraints

- Public interfaces that must remain stable: `[VALUE OR NONE]`
- Persistent formats or schemas that must remain compatible: `[VALUE OR NONE]`
- External systems that may be integrated with but not modified: `[VALUE OR NONE]`
- Operations that must remain reversible: `[VALUE OR NONE]`

Do not implement functionality outside the declared scope or bypass these constraints without explicit approval.

## 6. Project Skills

Local skills available in this repository:

- `[SKILL NAME OR PATH]` — `[WHEN IT MUST BE USED]`
- `[SKILL NAME OR PATH]` — `[WHEN IT MUST BE USED]`

Global skills required for this project:

- `[SKILL NAME]` — `[WHEN IT MUST BE USED]`

Use `Not applicable` when the project has no required skills.

## 7. Validation

### Checks Codex May Run Automatically

Only the following fast, limited-output checks are approved:

```text
[SYNTAX CHECK]
[TARGETED LINT COMMAND]
[CONCISE CONFIGURATION CHECK]
```

Automatic-check limits:

- permitted scope: `[FILES, DIRECTORIES, OR MODIFIED FILES ONLY]`
- prohibited automatic checks: `[FULL TEST SUITES, BUILDS, SERVICES, OR NONE]`

Do not repeat a successful check unless relevant inputs have changed.

### Manual Validation

Codex must provide, but must not run automatically:

```text
[UNIT OR MODULE TEST COMMAND]
[INTEGRATION OR APPLICATION TEST COMMAND]
[BUILD OR PACKAGE COMMAND]
```

Manual functional verification:

1. `[ACTION]`
2. `[ACTION]`
3. `[EXPECTED RESULT]`

Do not report manual validation as completed until the user provides the result.

## 8. Completion Criteria

A task is complete only when:

- the requested behavior matches the functional source of truth;
- the implementation remains within the declared project scope;
- project rules, prohibitions, security requirements, and compatibility constraints are respected;
- changes are limited to the requested task;
- approved automatic checks have completed successfully;
- required manual validation commands and procedures are provided;
- generated artifacts are updated when required;
- dependency and environment changes are clearly reported;
- known limitations and unverified behavior are stated;
- completed work is committed according to the global Git workflow;
- the exact push command is provided.
