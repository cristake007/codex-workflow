---
type: improvement
project: Codex Workflow
status: proposed
date: 2026-07-20
target: adapted engineering skills
priority: high
related:
  - "[[Projects/Codex Workflow]]"
  - "[[Decisions/0001 - Adopt a curated engineering workflow pack]]"
tags:
  - workflow/improvement
---

# Evaluate the adapted workflow pack

## Observed problem

New skills may improve engineering discipline, but they may also increase questioning, skill activation, context loading, or documentation on tasks that should remain small.

## Evidence

- Session or capture: collect future sessions that invoke one or more adapted skills.
- Frequency or impact: not yet measured.

## Proposed change

Run controlled comparisons before promoting any additional Matt-style workflow or making the current skills more automatic.

## Expected benefit

- Identify which skills reduce failed implementations or irrelevant exploration.
- Detect overactivation and unnecessary workflow overhead early.
- Tune descriptions and stop conditions using evidence rather than preference.

## Risks and failure modes

- Comparing different tasks as though they were equivalent.
- Optimizing command count while reducing correctness.
- Letting an evaluator reward verbose documentation instead of successful delivery.
- Changing several skills at once and losing causal attribution.

## Evaluation plan

- Fixed task or fixture: use repeated representative tasks from bounded edits, bug diagnosis, feature specification, and conflict resolution.
- Baseline: current workflow without explicit adapted-skill invocation.
- Metric or review rubric: task success, scope adherence, unnecessary files read, command count, user interruptions, validation quality, and final-review findings.
- Keep or reject threshold: keep a skill change only when it improves material outcomes without creating a significant new failure mode.

## Status history

- 2026-07-20 — proposed

## Related notes

- [[Projects/Codex Workflow]]
- [[Decisions/0001 - Adopt a curated engineering workflow pack]]