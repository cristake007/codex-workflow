---
name: linux-troubleshooting
description: Diagnose unresolved Linux service, resource, storage, permission, package, network, DNS, certificate, container, and log problems with evidence-first inspection. Activate when the cause is unknown or competing explanations remain. Do not activate when the cause and approved correction are already established.
---

# Linux Troubleshooting

## Purpose

Identify the most likely cause using the smallest safe set of read-only observations before changing state.

## Activate when

- Linux or a Linux-hosted service behaves unexpectedly;
- the cause is unknown, intermittent, or disputed;
- a proposed fix would otherwise be speculative.

## Do not activate when

- sufficient evidence already establishes the cause and correction;
- the task is routine administration or service operation;
- no Linux diagnostic question remains.

## Required context

Confirm the environment and privileges, production status, exact symptom and timing, affected boundary, recent changes, attempted actions, and approval or recovery limits before state changes.

## Workflow

1. Reuse existing facts, evidence, attempted actions, and disproven causes.
2. Define expected and actual behavior precisely.
3. Choose the smallest relevant layer: process/resources, systemd/logs, network/DNS/TLS, storage/permissions, packages/runtime/configuration, or container boundary.
4. Gather concise read-only evidence before broadening the search.
5. Form testable causes and distinguish them with the least invasive observation.
6. State confirmed causes separately from hypotheses.
7. Propose the smallest reversible correction with validation and rollback.
8. After an approved fix, recheck the original symptom and affected health indicators.

## Stop conditions

Stop when one cause sufficiently supports a correction, remaining uncertainty cannot affect it, more evidence requires unavailable access or approval, or commands begin repeating existing evidence.

## Guardrails

- Detect rather than assume the distribution, init system, security controls, or topology.
- Preserve evidence; do not restart, kill, clear, rotate, delete, or replace merely to test a guess.
- Do not disable security controls or perform destructive, production, access, package, permission, container, or volume changes without approval.
- Redact secrets and separate observations, hypotheses, and untested assumptions.

## Validation

- Prefer concise read-only commands and native configuration checks.
- After an approved correction, verify the original symptom and smallest relevant health boundary.
- Do not run broad scans, upgrades, cleanup, restarts, or destructive checks unless authorized.
- Do not claim system health without relevant verification.

## Output

Report the symptom and environment, supported cause or hypotheses, evidence, smallest safe correction, validation, rollback, actions not executed, and unresolved risks.