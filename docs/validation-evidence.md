# Validation Evidence

This file records the public-safe validation snapshot used for SparkClaw review.

## Private Workspace Snapshot

Date: 2026-06-25

| Metric | Value |
| --- | ---: |
| Private workspace commits | 1,250 |
| Private workspace tracked files | 8,958 |
| Test files | 979 |
| AUR spec documents | 3,435 |
| Codex prompt libraries | 27 |
| Harness checked files | 20,886 |
| Harness issues | 0 |
| Focused streaming / gate tests | 35 / 35 passed |
| `npm run typecheck` | passed |
| `npm run harness:check` | passed |

## What These Numbers Mean

They mean that the private workspace has real implementation, tests, and
governance infrastructure.

They do **not** mean:

- public launch;
- native playback acceptance;
- listener streaming approval;
- field-test acceptance;
- launch-ready catalog count;
- legal / store / privacy finality.

## Public Example Tests

This public repository includes a small runnable test suite for the simplified
examples.

Run:

```bash
npm test
npm run demo
```
