# Personal Codex Skills

Each reusable skill lives in its own directory and contains a required `SKILL.md` file.

The installer links each valid repository skill directory individually into `~/.agents/skills`, allowing repository-managed skills and externally installed skills to coexist.

## Required skill contract

Every repository-managed `SKILL.md` must use the same structure and section order:

1. YAML frontmatter with `name` and `description`;
2. `# Skill Name`;
3. `## Purpose`;
4. `## Activate when`;
5. `## Do not activate when`;
6. `## Required context`;
7. `## Workflow`;
8. `## Stop conditions`;
9. `## Guardrails`;
10. `## Validation`;
11. `## Output`;
12. optional `## Resources` only when the skill owns scripts, references, templates, or other supporting files.

The frontmatter description is the primary automatic-activation signal. It must state:

- what the skill does;
- concrete situations in which it should activate;
- important situations in which it must not activate;
- relevant languages, platforms, file types, or task boundaries when they help recognition.

The body defines behavior after activation. It must:

- reuse facts already available in the prompt and current conversation;
- inspect only missing authoritative context;
- distinguish an exact path from an already resolved decision;
- stop when sufficient evidence exists;
- keep validation proportional;
- state actions and behavior that remain unverified.

An exact file or directory path does not automatically disable an ecosystem, Linux, or security skill when that skill's technical judgment still affects the task. Discovery skills should not activate merely to rediscover paths, facts, decisions, or authoritative files already supplied by the user or established in the conversation.

## Workflow skills

- `project-discovery` — establishes only missing repository and project context.
- `project-bootstrap` — creates minimal project-specific Codex configuration from confirmed context.
- `delivery-review` — performs one bounded final review of the requested task and effective diff.
- `software-design` — applies the language-independent engineering constitution to architecture and substantial design work.

## Ecosystem skills

- `ecosystem-php`
- `ecosystem-python`
- `ecosystem-javascript`
- `ecosystem-shell`
- `ecosystem-ios`
- `ecosystem-docker`

Ecosystem skills provide technical conventions only after a stack is established or explicitly approved. They do not choose technologies for greenfield projects.

## Linux skills

- `linux-troubleshooting` — diagnoses unresolved Linux and service problems before changing state.
- `linux-system-administration` — performs known host-level administrative changes with validation and rollback.
- `linux-service-management` — configures and operates known Linux service lifecycles safely.

## Security skills

- `security-review` — establishes authorized scope, threat model, boundary classification, and specialist routing.
- `application-security` — reviews application code, APIs, authentication, authorization, data flows, dependencies, and secure design.
- `server-security` — assesses and hardens authorized Linux hosts while preserving access and availability.

Linux and security are optional cross-cutting capabilities. They are not enabled merely because a repository uses Docker, JavaScript, PHP, or another ecosystem.

The official `repomix-explorer` skill is installed separately by `install.mjs`. It remains available through explicit `$repomix-explorer` invocation but is not selected automatically for ordinary repository analysis.
