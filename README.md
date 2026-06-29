# Aural Reality 공개 증거 채널

[![공개 증거 채널 검증](https://github.com/stopred/AuralReality_Public/actions/workflows/verify.yml/badge.svg)](https://github.com/stopred/AuralReality_Public/actions/workflows/verify.yml)

**Aural Reality**는 현실의 장소, 날씨, 시간, 움직임을 작가가 설계한 청취 경험으로
바꾸는 위치 기반 적응형 오디오 플랫폼입니다. 오디오 투어가 장소를 설명한다면,
Aural Reality는 장소가 다르게 들리게 만듭니다.

이 저장소는 전체 제품 저장소가 아닙니다. SparkClaw와 초기 리뷰어에게 공개해도
되는 범위만 정리한 **공개 안전 증거 채널(public-safe evidence channel)**입니다.
비공개 원본 오디오(source audio), 미공개 제품 코드, 인증 정보(credential),
실서비스 인프라(live infrastructure) 세부 정보, 내부 운영 문서는 노출하지 않고,
기술 방향과 AI-native 개발 방식, 검증 문화, 대표 코드 패턴만 확인할 수 있게
구성했습니다.

## 이 저장소를 만든 이유

비공개 Aural Reality 작업 공간(workspace)에는 구현 이력, 내부 기획, 미공개 제품 상세,
검증 경계, 운영 문서가 함께 들어 있습니다. 전체를 공개하면 리뷰에 꼭 필요하지
않은 위험까지 함께 공개하게 됩니다.

그래서 이 공개 저장소는 한 가지 질문에 답하기 위해 만들었습니다.

> 창업자가 실제로 복잡한 기술 시스템을 설계하고 만들었는가? 그리고 AI agent를
> 단순 코드 생성기가 아니라 규율 있는 개발팀처럼 사용했는가?

## 리뷰어가 확인할 수 있는 것

- 제품과 기술 구조 개요
- 공개 가능한 구조 설명(architecture note)
- 대표적인 결정적 runtime 로직
- 축약된 과장/허위 완료 주장(overclaim / false-claim) `claim guard`
- AI-native 개발 운영 방식
- 비공개 작업 공간(workspace)에서 확인한 검증 스냅샷
- SparkClaw 지원서에 바로 활용할 수 있는 기술 역량 설명

## 공개하지 않는 것

- 비공개 원본 오디오(source audio), stem, mix session
- 원본 위치(raw location), route, sensor, weather, microphone, tester, participant data
- token, signed URL, endpoint, cloud project ref, bucket name, secret
- 전체 Creator Tool / mobile app / Worker / Supabase 구현 코드
- 내부 사업 전략, 법무 메모, private incident note, 운영 runbook
- native playback, listener streaming, public launch, `launch_ready`,
  catalog count, field-test acceptance가 완료되었다는 주장

자세한 경계는 [공개 범위 경계](docs/public-disclosure-boundary.md)를 참고하세요.

## 기술 역량 요약

가장 복잡했던 부분은 불안정한 현실 입력을 안정적인 청각 연출로 바꾸는
`runtime`과 검증 구조입니다.

```text
현실 입력
  -> 공개 가능한 정규화 상태
  -> deterministic runtime decision
  -> 작가가 설계한 sound-layer plan
  -> fail-closed safety / evidence gate
```

어려운 이유는 현실 입력이 깔끔하지 않기 때문입니다.

- GPS는 zone 경계에서 흔들릴 수 있습니다.
- 사용자는 걷다가 멈추고, 경로를 벗어나거나 되돌아갈 수 있습니다.
- 날씨는 threshold 근처에서 바뀔 수 있습니다.
- 청취 제품은 flicker, overclaim, private data 노출이 없어야 합니다.

비공개 제품 작업 공간(workspace)에서는 이 문제를 다음 방식으로 다룹니다.

- state machine
- zone hysteresis
- 작가가 정의한 rule boundary
- privacy-first evidence shape
- typecheck / test / harness gate
- AI agent가 성급한 완료 주장을 하지 못하게 하는 governance 문서

공개 가능한 축약 예제는 아래에서 볼 수 있습니다.

- [examples/context-runtime/context-engine.mjs](examples/context-runtime/context-engine.mjs)
- [examples/claim-guard/claim-guard.mjs](examples/claim-guard/claim-guard.mjs)

## AI-native 운영 방식

Aural Reality는 현재 사용자-facing runtime에서 GPT/Claude를 실시간 콘텐츠 생성기로
사용하지 않습니다. 이것은 기능 부족이 아니라 안전, 작가성, 예측 가능성을 위한
의도적인 선택입니다.

대신 AI는 개발 과정에서 규율 있는 팀원처럼 사용합니다.

- 기획 보조자
- 코드 보조자
- QA 리뷰어
- 문서 편집자
- 리서치 보조자
- release-claim critic

비공개 작업 공간(workspace)에서는 `AGENTS.md`, ADR/AUR spec, prompt library, check harness를
통해 AI가 만든 결과를 그대로 믿지 않고 검증합니다.

자세히 보기: [AI-native 개발 방식](docs/ai-native-workflow.md)

## 검증 스냅샷

이 공개 채널에 사용한 최신 비공개 작업 공간(workspace) 검증 스냅샷입니다.

- `npm run typecheck`: passed
- `npm run harness:check`: passed
- Harness checked files: `20,886`
- Harness issues: `0`
- Focused streaming / gate tests: `35 / 35` passed
- 비공개 workspace tracked files: `8,958`
- 비공개 workspace commits: `1,250`
- 비공개 workspace test files: `979`
- Codex prompt libraries: `27`
- AUR spec documents: `3,435`

이 숫자는 구현과 검증 문화가 존재한다는 리뷰용 증거입니다. public launch,
native playback acceptance, listener streaming approval, field-test acceptance,
`launch_ready` catalog count를 의미하지 않습니다.

자세히 보기: [검증 증거](docs/validation-evidence.md)

## 5분 리뷰 동선

1. 이 `README`를 읽습니다.
2. [기술 시스템](docs/technical-system.md)을 읽습니다.
3. [AI-native 개발 방식](docs/ai-native-workflow.md)을 읽습니다.
4. 공개 가능한 예제 두 개를 확인합니다.
   - [context-engine.mjs](examples/context-runtime/context-engine.mjs)
   - [claim-guard.mjs](examples/claim-guard/claim-guard.mjs)
5. 로컬에서 검증을 실행합니다.

```bash
npm run verify
```

## 현재 단계

Aural Reality는 **비공개 테스트 검증 단계(private test validation stage)**에 있습니다.

현재 목표는 public launch를 주장하는 것이 아닙니다. 비공개 테스트 참여자를
섭외해, 첫 작품인 `rain_comfort_walk` / "비가 열리는 5분"이 실제 장소를 다르게
들리게 만들 수 있는지 통제된 조건에서 안전하고 측정 가능한 방식으로 검증하는
것입니다.

## 공개 저장소 상태

이 저장소는 SparkClaw, 투자자, 리뷰어, 협업 후보자가 비공개 제품 작업 공간(workspace)에
접근하지 않고도 시스템의 핵심 방향과 검증 태도를 볼 수 있도록 만든 공개 채널입니다.

## 라이선스 / 권리

현재 오픈소스 라이선스를 부여하지 않습니다. 모든 권리는 Aural Reality 창업자에게
있습니다. 공개 예제는 리뷰와 논의를 위한 참고 자료로만
제공됩니다.
