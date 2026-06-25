# Aural Reality Public Evidence Channel

[![Verify Public Evidence Channel](https://github.com/stopred/AuralReality_Public/actions/workflows/verify.yml/badge.svg)](https://github.com/stopred/AuralReality_Public/actions/workflows/verify.yml)

Public-safe evidence repository for **Aural Reality**, a location-aware adaptive
audio platform by DecaTree Studio.

This repository is intentionally **not** the full private product repository.
It is a curated SparkClaw / investor review channel that shows the technical
direction, AI-native workflow, validation discipline, and representative code
patterns without exposing private source audio, unreleased product code,
credentials, live infrastructure details, or internal operating notes.

한국어 리뷰 노트: [docs/sparkclaw-review-note.ko.md](docs/sparkclaw-review-note.ko.md)

## One-Line

**Aural Reality turns real-world context into authored listening experiences.**

If an audio tour explains a place, Aural Reality makes the place sound different.

## Why This Exists

The private Aural Reality workspace contains a large amount of implementation
history, internal planning, unreleased product details, and evidence boundaries.
Publishing the whole workspace would create unnecessary risk.

This public repository exists to answer one question safely:

> Can reviewers see that the founder has actually designed and built a serious
> technical system, and has used AI agents as a disciplined development team?

## What Reviewers Can See Here

- Product and technical overview
- Public-safe architecture notes
- Representative deterministic runtime logic
- A simplified overclaim / false-claim guard
- AI-agent operating model
- Validation evidence summary from the private workspace
- SparkClaw-ready technical capability excerpts

## What Is Not Published Here

- Private source audio or stems
- Raw location, route, sensor, weather, microphone, tester, or participant data
- Tokens, signed URLs, endpoints, cloud project refs, bucket names, or secrets
- Full Creator Tool / mobile app / Worker / Supabase implementation code
- Internal commercial strategy, legal notes, private incident notes, or live
  operations runbooks
- Any claim that native playback, listener streaming, public launch,
  `launch_ready`, catalog count, or field-test acceptance has already completed

See [Public Disclosure Boundary](docs/public-disclosure-boundary.md).

## Technical Capability Snapshot

The most complex system is the runtime and validation architecture that turns
unstable real-world context into stable authored audio behavior:

```text
real-world context
  -> normalized public-safe state
  -> deterministic runtime decision
  -> authored sound-layer plan
  -> fail-closed safety / evidence gates
```

The hard part is that real-world inputs are noisy:

- GPS can drift around zone boundaries.
- A listener can walk, stop, turn, or leave the intended path.
- Weather can sit near a threshold.
- A listening product must not flicker, overclaim, or expose private data.

The production workspace addresses this with:

- state machines;
- zone hysteresis;
- author-defined rule boundaries;
- privacy-first evidence shapes;
- typecheck / test / harness gates;
- AI-agent governance documents that prevent premature claims.

Public-safe sample logic lives in:

- [examples/context-runtime/context-engine.mjs](examples/context-runtime/context-engine.mjs)
- [examples/claim-guard/claim-guard.mjs](examples/claim-guard/claim-guard.mjs)

## AI-Native Operating Model

Aural Reality does not currently use GPT/Claude as a real-time user-facing
content generator. That is an intentional safety and authorship decision.

Instead, AI is used in the development process as a disciplined team:

- planning assistant;
- code assistant;
- QA reviewer;
- documentation editor;
- research assistant;
- release-claim critic.

The private workspace uses project rules, ADR/AUR specs, prompt libraries, and a
check harness so AI-generated work is never accepted just because it sounds
plausible.

Read: [AI-Native Workflow](docs/ai-native-workflow.md).

## Validation Summary

Latest private-workspace verification snapshot used for this public channel:

- `npm run typecheck`: passed
- `npm run harness:check`: passed
- Harness checked files: `20,886`
- Harness issues: `0`
- Focused streaming / gate tests: `35 / 35` passed
- Private workspace tracked files: `8,958`
- Private workspace commits: `1,250`
- Test files in private workspace: `979`
- Codex prompt libraries: `27`
- AUR spec documents: `3,435`

These numbers are provided as review evidence, not as public launch claims.

Read: [Validation Evidence](docs/validation-evidence.md).

## Quick Review Path

For a 5-minute SparkClaw review:

1. Read this README.
2. Read [Technical System](docs/technical-system.md).
3. Read [AI-Native Workflow](docs/ai-native-workflow.md).
4. Skim the two public-safe examples:
   - [context-engine.mjs](examples/context-runtime/context-engine.mjs)
   - [claim-guard.mjs](examples/claim-guard/claim-guard.mjs)
5. Run:

```bash
npm run verify
```

## Current Stage

Aural Reality is in a **pre-public-launch validation stage**.

The near-term goal is not to claim public launch. The near-term goal is to prove
whether the first work, `rain_comfort_walk` / "비가 열리는 7분", can make a
real place feel different through a controlled, safe, measurable listening
experience.

## Public Repository Status

This repository is a public-facing evidence channel. It is meant to be shared
with SparkClaw, investors, reviewers, and collaborators who need a safe view of
the system without access to the private product workspace.

## License / Rights

No open-source license is granted at this time. All rights reserved by DecaTree
Studio / the Aural Reality founder. Public examples are provided for review and
discussion only.
