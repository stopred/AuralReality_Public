# SparkClaw 리뷰 노트

이 저장소는 Aural Reality의 전체 제품 저장소가 아니라, SparkClaw와 초기
리뷰어에게 공개해도 되는 범위만 정리한 공개 증거 채널입니다.

전체 비공개 저장소에는 미공개 앱 코드, Creator Tool, 원본 오디오(source audio),
streaming infrastructure, tester/evidence boundary, 내부 운영 문서가 포함되어 있습니다.
그 내용을 그대로 공개하지 않고, 이 저장소에는 기술 방향, 대표 코드 패턴,
AI-native 개발 운영 방식, 검증 스냅샷만 공개 가능한 형태로 정리했습니다.

## 5분 리뷰 동선

1. [README](../README.md)를 읽습니다.
2. [기술 시스템](technical-system.md)에서 runtime 구조를 확인합니다.
3. [AI-native 개발 방식](ai-native-workflow.md)에서 AI agent 활용 방식을 확인합니다.
4. [context-engine.mjs](../examples/context-runtime/context-engine.mjs)와
   [claim-guard.mjs](../examples/claim-guard/claim-guard.mjs)를 봅니다.
5. 로컬에서 `npm run verify`를 실행합니다.

## 직접 작성한 코드 / 설계한 시스템 중 가장 복잡했던 부분

제가 직접 설계하고 개발한 부분 중 가장 복잡했던 것은 **현실의 맥락을 안정적인
청각 연출로 바꾸는 runtime engine과 검증 시스템**입니다.

Aural Reality는 단순한 오디오 재생 앱이 아닙니다. 사용자가 실제 장소를 걷고
있을 때 날씨, 시간, 위치 zone, 이동 상태, 청취 안전 상태를 바탕으로 작가가 의도한
sound layer를 열고 닫는 청각 작품 플랫폼입니다. 예를 들어 비 오는 날 특정
장소에서만 열리는 7분짜리 청각 작품처럼, 현실 조건을 작품의 장면과 사운드
연출로 번역하는 구조를 만들었습니다.

기술적으로 어려웠던 이유는 입력값이 불안정하기 때문입니다. GPS는 zone 경계에서
흔들리고, 사용자는 걷다가 멈추며, 날씨 데이터는 threshold 근처에서 바뀔 수
있습니다. 이런 값을 오디오에 바로 연결하면 사운드가 갑자기 켜졌다 꺼지거나,
장면이 깜빡이는 문제가 생깁니다. 야외 보행 중 듣는 서비스에서는 이것이 단순 UX
문제가 아니라 안전과 신뢰의 문제입니다.

이를 해결하기 위해 state machine, zone hysteresis, 작가 정의 규칙, fail-closed
evidence gate를 사용했습니다. zone 경계에서는 바로 상태를 바꾸지 않고 enter/exit
여유 폭을 두어 채터링을 줄였고, 날씨와 움직임, 누적 청취 상태는 작가가 미리
정의한 경계 안에서만 sound layer를 바꾸도록 했습니다. 즉 AI가 임의로 감정이나
장소의 의미를 해석해 콘텐츠를 생성하는 방식이 아니라, 안전하고 예측 가능한
규칙 안에서 현실 맥락을 연출로 바꾸는 구조입니다.

또 하나 중요하게 설계한 것은 **검증되지 않은 것을 완료된 것처럼 말하지 못하게
하는 시스템**입니다. local test 통과가 실제 Android 기기 재생 검증을 뜻하지
않고, simulator 결과가 field-test acceptance를 뜻하지도 않습니다. 그래서
비공개 저장소에는 `launch_ready`, listener streaming, native playback,
catalog count, token/signed URL 노출, private data leakage 같은 위험한 표현과
증거 오인을 검사하는 harness가 있습니다.

이 공개 저장소에는 그 핵심 사고방식을 보여주는 축약 예제가 포함되어 있습니다.
`examples/context-runtime/context-engine.mjs`는 zone hysteresis와 weather gate를,
`examples/claim-guard/claim-guard.mjs`는 public evidence에서 금지해야 할 claim과
secret-like material을 검사하는 방식을 보여줍니다.

## 단순 GPT/Claude API 호출 외 AI 최적화

Aural Reality의 현재 AI 최적화는 "runtime에서 대형 언어모델을 호출해 즉석
콘텐츠를 생성하는 것"이 아닙니다. 오히려 MVP에서는 그 방식을 의도적으로
미뤘습니다. 야외 보행 중 듣는 작품은 tone, safety, privacy, authorship이
흔들리면 안 되기 때문입니다.

대신 최적화는 두 층으로 나누었습니다.

첫째, 사용자-facing runtime은 deterministic context-aware engine으로
설계했습니다. 위치, 날씨, 시간, 움직임 같은 현실 입력을 읽되, LLM이 즉석에서
이야기를 만들지 않고 작가가 정의한 layer/rule 안에서만 반응합니다. 이 선택은
추론 비용을 줄이고, 응답을 예측 가능하게 만들며, 안전과 작가성을 지키는 방향의
최적화입니다.

둘째, 개발 과정에서는 AI agent를 막 쓰지 않고 운영 규칙과 검증 기준 안에서
사용했습니다. AI는 기획 보조자, 코드 보조자, QA 리뷰어, 문서 편집자,
release-claim critic 역할을 맡지만, 결과물은 typecheck, test, harness,
ADR/AUR spec 기준을 통과해야만 받아들입니다. 즉 평가 지표는 "AI가 그럴듯하게
말했는가"가 아니라 "AI가 만든 산출물이 검증 가능한가"입니다.

## 검증 스냅샷

2026-06-25 기준 비공개 작업 공간(workspace)에서 확인한 공개 가능 스냅샷은 다음과 같습니다.

| 항목 | 값 |
| --- | ---: |
| `npm run typecheck` | passed |
| `npm run harness:check` | passed |
| Harness 검사 파일 수 | 20,886 |
| Harness issue 수 | 0 |
| focused streaming / gate test | 35 / 35 passed |
| 비공개 workspace tracked file 수 | 8,958 |
| 비공개 workspace commit 수 | 1,250 |
| test file 수 | 979 |
| Codex prompt library 수 | 27 |
| AUR spec 문서 수 | 3,435 |

위 숫자는 구현과 검증 문화가 존재한다는 증거이지, public launch, native playback
acceptance, listener streaming approval, field-test acceptance, `launch_ready`
catalog count를 의미하지 않습니다.

## 공개하지 않는 것

- 비공개 원본 오디오(source audio) / stem / mix session
- 원본 위치(raw location), route, sensor, weather, microphone, tester, participant data
- token, signed URL, endpoint, bucket, project ref, secret
- 전체 mobile app / Creator Tool / Worker / Supabase implementation
- internal commercial strategy, legal note, private incident note, live ops runbook

이 경계 때문에 공개 저장소는 전체 코드를 덜 보여주는 것이 아니라, 심사자가 봐도
안전한 방식으로 핵심 기술성과 검증 태도를 보여주는 채널입니다.
