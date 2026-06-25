# AI-native 개발 방식

## 원칙

Aural Reality에서 AI agent는 무감독 의사결정자가 아니라 규율 있는 협업자입니다.

핵심 규칙은 다음과 같습니다.

> AI는 기획, 코드, QA, 문서화를 빠르게 만들 수 있다. 하지만 작가성, 윤리, 안전,
> 개인정보, 제품 방향, launch claim은 사람이 책임진다.

## runtime LLM 생성을 미룬 이유

현재 사용자-facing runtime은 listener가 걷는 동안 GPT나 Claude를 호출해 새로운
story text를 생성하지 않습니다.

이것은 의도적인 결정입니다.

야외 청취 경험에는 다음 제약이 있습니다.

- tone은 작가가 통제해야 합니다.
- safety copy는 예측 가능해야 합니다.
- 감정은 동의 없이 추론하면 안 됩니다.
- private context가 밖으로 새면 안 됩니다.
- output은 테스트 가능하고 재현 가능해야 합니다.

그래서 MVP runtime은 deterministic context-aware rule을 사용하고, AI는 주로 개발
과정에서 사용합니다.

## AI agent 역할 분리

| 역할 | AI가 돕는 일 | 사람이 책임지는 일 |
| --- | --- | --- |
| Planner | spec, roadmap, 지원서 초안 | 최종 제품 판단 |
| Code assistant | 구현 초안, refactor, test | 구조(architecture)와 scope 승인 |
| QA reviewer | risk list, regression idea, false-claim check | pass/fail 결정 |
| Documentation editor | ADR/AUR/spec 정리와 요약 | truth boundary와 priority |
| Research assistant | competitor scan, positioning draft | 전략적 해석 |
| Release-claim critic | overclaim 표현 탐지 | launch와 evidence acceptance |

## 비공개 작업 공간(workspace) governance

비공개 제품 작업 공간(workspace)은 다음 장치를 사용합니다.

- `AGENTS.md`: 프로젝트 헌법
- ADR 문서: architecture decision 기록
- AUR spec: 구현 lane 단위의 작업 경계
- Core Spine board: 제품 경로 진행 상황
- Codex prompt library: 반복 가능한 AI-agent 작업 단위
- check harness: false claim과 unsafe evidence reject

## 평가 지표

평가 기준은 "모델이 자신 있게 말했는가?"가 아닙니다.

평가 기준은 다음입니다.

> AI-assisted output이 typecheck, test, harness check, evidence boundary를
> 통과했는가?

그래서 이 공개 저장소에는 축약된 `claim guard` 예제가 포함되어 있습니다.

[examples/claim-guard/claim-guard.mjs](../examples/claim-guard/claim-guard.mjs)
