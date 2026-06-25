# Technical System

## Problem

Aural Reality has to translate unstable real-world context into stable authored
audio behavior.

The inputs are not clean:

- GPS can drift near a zone boundary.
- A listener can walk, pause, turn around, or leave a path.
- Weather can change or become stale.
- A mobile device can lose route, audio, permission, or app lifecycle state.

If those inputs are mapped directly to sound, the listener may hear layers
flicker, start, stop, or change at the wrong moment. For a walking audio
experience, that is not just a UX problem. It is also a safety and trust problem.

## Design

The private product system is organized around a deterministic runtime and
evidence gates.

```text
context input
  -> public-safe normalized state
  -> deterministic decision
  -> authored audio-layer plan
  -> fail-closed gate / evidence output
```

The runtime does not let an LLM freely invent content while a person is walking.
Instead, authors define the allowed layers, transitions, and conditions. The
runtime chooses within those boundaries.

## Key Techniques

### State Machine

The system models high-level listening states such as:

- context unavailable;
- waiting for eligible weather / place;
- zone candidate;
- active zone;
- safety blocked;
- evidence pending;
- playback boundary reached.

### Hysteresis

Zone transitions use enter and exit thresholds. This reduces boundary chatter
when GPS drifts around the edge of a place.

### Author-Defined Rules

Sound behavior is constrained by the authored work:

- weather gates;
- time / daypart rules;
- walk / still behavior;
- dwell / accumulation rules;
- safety state;
- work-specific layer definitions.

### Fail-Closed Safety

When a required condition is missing or stale, the system blocks rather than
pretending the experience is ready.

Examples:

- unknown location -> block;
- stale weather -> block;
- missing participant / consent state -> block;
- missing device evidence -> block;
- token / signed URL / endpoint exposure -> reject public evidence.

## Public Example

The simplified public example is here:

[examples/context-runtime/context-engine.mjs](../examples/context-runtime/context-engine.mjs)

It demonstrates:

- zone hysteresis;
- weather freshness gate;
- motion-aware layer planning;
- privacy-safe evidence output.

It intentionally does not include private product code, source audio, app
integration, live streaming, or mobile-native playback.
