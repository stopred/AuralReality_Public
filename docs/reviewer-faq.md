# Reviewer FAQ

## Is this the full product repository?

No. This is a public-safe evidence channel.

The private workspace includes unreleased app code, Creator Tool code, evidence
models, source-audio handling, and live-infrastructure boundaries that should
not be public.

## Why not publish the full repository?

Because a location-aware audio platform can contain sensitive materials:

- source audio;
- internal release gates;
- private operator notes;
- test evidence boundaries;
- live infrastructure configuration;
- future business strategy;
- safety and privacy guardrails.

Publishing all of that would create avoidable risk without improving reviewer
understanding.

## Does Aural Reality use generative AI in the runtime?

Not yet. The user-facing runtime is deterministic by design.

For a walking listener, unpredictable real-time LLM output can create tone,
safety, privacy, and authorship problems. AI is currently used primarily in the
development process.

## What should I look at first?

1. [README](../README.md)
2. [Technical System](technical-system.md)
3. [AI-Native Workflow](ai-native-workflow.md)
4. [Validation Evidence](validation-evidence.md)
5. [Public examples](../examples)
