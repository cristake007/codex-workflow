---
name: to-tickets
description: Break an approved specification or plan into small dependency-aware implementation tickets that can each be completed in a separate agent session. Activate only when the user explicitly asks for tickets, phases, tasks, or session-sized work units. Do not activate for a single bounded change.
disable-model-invocation: true
---

# To Tickets

## Purpose

Convert approved work into vertical, independently understandable tasks that preserve context across separate chats without mixing unrelated concerns.

## Activate when

- the user explicitly asks to split a specification, plan, or feature into tasks, phases, or tickets;
- the work is too large or risky for one agent session;
- dependencies and safe delivery order need to be made explicit.

## Do not activate when

- the request is already one bounded task;
- requirements are materially unresolved;
- the user asked for a high-level overview only;
- decomposition would create artificial layers with no independently verifiable outcome.

## Required context

Use the approved specification or plan, current repository constraints, known project structure, completion criteria, and any required sequencing or deployment restrictions.

## Workflow

1. Identify the smallest user-visible or operational tracer bullets.
2. Separate investigation, implementation, migration, integration, and rollout when they have different evidence or risk.
3. Give every ticket one outcome, clear included scope, explicit non-goals, dependencies, likely authoritative files, and proportional validation.
4. Ensure a ticket can be started in a new chat without relying on hidden conversation context.
5. Prefer vertical slices over tickets such as “build all models,” “build all APIs,” then “build all UI.”
6. Mark blockers and ordering edges explicitly; avoid unnecessary serial dependencies.
7. Keep deferred ideas outside the active ticket set.

## Stop conditions

Stop when every required outcome is covered once, each ticket has a coherent verification path, and no ticket mixes separable concerns merely for convenience.

## Guardrails

- Do not invent implementation details not established by the specification or repository.
- Do not make tickets so small that coordination costs exceed delivery value.
- Do not make one ticket a disguised multi-session project.
- Do not combine destructive migration or production rollout with ordinary feature implementation.
- Do not automatically create issues in an external tracker unless the user requests it.

## Validation

Check requirement coverage, dependency consistency, absence of duplicated scope, independent readability, and whether each ticket has an observable completion condition.

## Output

Provide or save an ordered ticket set with IDs, outcomes, dependencies, scope, non-goals, context sources, validation, and handoff notes for a new session.