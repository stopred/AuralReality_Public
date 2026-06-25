# 공개 범위 경계

이 저장소는 SparkClaw와 초기 리뷰어에게 안전하게 공유할 수 있도록 만든 공개
채널입니다.

## 공개하는 것

- 제품과 구조(architecture)의 상위 개요
- 공개 가능한 기술 역량 설명
- 축약된 context runtime 예제
- 축약된 overclaim / false-claim `claim guard` 예제
- AI agent 운영 방식
- 비공개 작업 공간(workspace)에서 확인한 검증 스냅샷

## 공개하지 않는 것

- 전체 모바일 앱(mobile app) source code
- 전체 Creator Tool source code
- 전체 Supabase, R2, Worker, streaming implementation
- 비공개 원본 오디오(source audio), stem, mix session, 미공개 작품 asset
- 사업 전략이나 내부 운영 판단이 드러나는 internal prompt history
- 원본 위치 기록(raw location trace), sensor log, mic input, weather payload, participant data,
  device identifier, private tester note, incident detail
- secret, token, signed URL, bucket name, endpoint value, project ref,
  cloud account detail

## 왜 전체를 공개하지 않는가?

Aural Reality는 위치 기반 청취 제품입니다. 내부 자료 전체를 공개하면 리뷰에 꼭
필요하지 않은 정보까지 함께 노출됩니다.

- 검증 전 제품 전략
- 저작권이 있거나 비공개인 사운드 자료
- 아직 공개할 필요가 없는 기술 gate
- 내부 safety / incident handling note
- 공개되어서는 안 되는 live infrastructure detail

따라서 이 저장소의 목표는 좁고 분명합니다.

> 제품, creator, tester, 미래 listener를 보호하면서도, 실제 기술적 실체가 있음을
> 충분히 보여준다.

## 주장 경계

이 저장소는 아래 상태가 완료되었다고 주장하지 않습니다.

- public launch
- `launch_ready`
- catalog count
- listener streaming approval
- native playback acceptance
- physical-device evidence acceptance
- field-test acceptance
- legal / store / privacy finality
- live backend readiness
- production token issuance

위 milestone은 모두 비공개 작업 공간(workspace) 안의 별도 hard evidence가 있어야만 인정됩니다.
