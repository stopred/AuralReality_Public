# 기술 시스템

## 문제

Aural Reality는 불안정한 현실 맥락을 안정적인 청각 연출로 바꿔야 합니다.

입력값은 깔끔하지 않습니다.

- GPS는 zone 경계 근처에서 흔들릴 수 있습니다.
- 청취자(listener)는 걷다가 멈추고, 되돌아가거나 경로를 벗어날 수 있습니다.
- 날씨 데이터는 바뀌거나 stale 상태가 될 수 있습니다.
- 모바일 기기는 경로(route), 오디오(audio), 권한(permission), app lifecycle 상태를 잃을 수 있습니다.

이 입력을 그대로 사운드에 연결하면 layer가 깜빡이거나, 잘못된 순간에 시작되고
멈출 수 있습니다. 걷는 중 듣는 오디오 경험에서는 이것이 단순 UX 문제가 아니라
safety와 trust 문제입니다.

## 설계

비공개 제품 시스템은 결정적 runtime과 evidence gate를 중심으로 구성되어
있습니다.

```text
context input
  -> public-safe normalized state
  -> deterministic decision
  -> authored audio-layer plan
  -> fail-closed gate / evidence output
```

runtime은 사람이 걷는 동안 LLM이 콘텐츠를 자유롭게 발명하도록 두지 않습니다.
대신 작가(author)가 허용된 layer, transition, condition을 먼저 정의하고, runtime은 그
경계 안에서만 선택합니다.

## 핵심 기법

### State Machine

시스템은 높은 수준의 청취 상태를 명확히 나눕니다.

- context unavailable
- waiting for eligible weather / place
- zone candidate
- active zone
- safety blocked
- evidence pending
- playback boundary reached

### Hysteresis

zone 전환에는 enter threshold와 exit threshold를 따로 둡니다. GPS가 장소 경계에서
흔들릴 때 상태가 계속 켜졌다 꺼지는 boundary chatter를 줄이기 위해서입니다.

### Author-Defined Rules

사운드 동작은 작품 안에서 정의된 규칙으로 제한됩니다.

- weather gate
- time / daypart rule
- walk / still behavior
- dwell / accumulation rule
- safety state
- work-specific layer definition

### Fail-Closed Safety

필수 조건이 없거나 stale 상태이면, 시스템은 경험이 준비된 척하지 않고 block합니다.

예시:

- unknown location -> block
- stale weather -> block
- participant / consent state 없음 -> block
- device evidence 없음 -> block
- token / signed URL / endpoint 노출 -> public evidence reject

## 공개 예제

축약된 공개 예제는 아래 파일에 있습니다.

[examples/context-runtime/context-engine.mjs](../examples/context-runtime/context-engine.mjs)

이 예제는 다음을 보여줍니다.

- zone hysteresis
- weather freshness gate
- motion-aware layer planning
- privacy-safe evidence output

의도적으로 비공개 제품 코드(private product code), 원본 오디오(source audio),
app integration, live streaming, mobile-native playback은 포함하지 않았습니다.
