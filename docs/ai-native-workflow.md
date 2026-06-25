# AI-Native Workflow

## Principle

Aural Reality uses AI agents as disciplined collaborators, not as unsupervised
decision makers.

The core rule is:

> AI can accelerate planning, code, QA, and documentation. Human judgment owns
> authorship, ethics, safety, privacy, product direction, and launch claims.

## Why Runtime LLM Generation Is Deferred

The user-facing runtime does not currently call GPT or Claude to generate new
story text while a listener is walking.

That is intentional.

Outdoor listening has constraints:

- tone must stay authored;
- safety copy must be controlled;
- emotion must not be inferred without consent;
- private context must not leak;
- output must be predictable and testable.

For that reason, the MVP uses deterministic context-aware rules in the runtime
and uses AI mainly in the development process.

## Agent Roles

| Role | AI helps with | Human owns |
| --- | --- | --- |
| Planner | specs, roadmaps, application answers | final product judgment |
| Code assistant | implementation drafts, refactors, tests | architecture and scope approval |
| QA reviewer | risk lists, regression ideas, false-claim checks | pass/fail decision |
| Documentation editor | ADR/AUR/spec formatting and summaries | truth boundary and priority |
| Research assistant | competitor scans, positioning drafts | strategic interpretation |
| Release-claim critic | detects overclaim language | launch and evidence acceptance |

## Private Workspace Governance

The private product workspace uses:

- `AGENTS.md` as project constitution;
- ADR documents for architectural decisions;
- AUR specs for implementation lanes;
- Core Spine board for product-path progress;
- Codex prompt libraries for repeatable AI-agent tasks;
- a check harness to reject false claims and unsafe evidence.

## Evaluation Metric

The metric is not "did the model sound confident?"

The metric is:

> Did the AI-assisted output survive typecheck, tests, harness checks, and the
> project's evidence boundaries?

This is why the public repo includes the simplified claim guard example:

[examples/claim-guard/claim-guard.mjs](../examples/claim-guard/claim-guard.mjs)
