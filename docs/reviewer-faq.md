# 리뷰어 FAQ

## 이 저장소가 전체 제품 저장소인가요?

아닙니다. 이 저장소는 공개 안전 증거 채널(public-safe evidence channel)입니다.

비공개 작업 공간(workspace)에는 미공개 앱 코드(app code), Creator Tool code,
evidence model, 원본 오디오 처리(source-audio handling), live-infrastructure
boundary가 포함되어 있고, 이런 자료는
그대로 공개하지 않는 편이 안전합니다.

## 왜 전체 저장소를 공개하지 않나요?

위치 기반 오디오 플랫폼에는 민감한 자료가 포함될 수 있기 때문입니다.

- 원본 오디오(source audio)
- 내부 release gate
- 비공개 operator note
- test evidence boundary
- 실서비스 인프라 설정(live infrastructure configuration)
- 향후 사업 전략(future business strategy)
- safety / privacy guardrail

전체를 공개하면 리뷰어 이해도는 크게 늘지 않으면서 불필요한 위험만 커질 수
있습니다.

## Aural Reality는 runtime에서 generative AI를 사용하나요?

아직 사용하지 않습니다. 사용자-facing runtime은 deterministic 구조로 설계했습니다.

걷는 중 듣는 제품에서 예측 불가능한 real-time LLM output은 tone, safety, privacy,
authorship 문제를 만들 수 있습니다. 현재 AI는 주로 개발 과정에서 사용합니다.

## 처음 무엇을 보면 되나요?

1. [README](../README.md)
2. [기술 시스템](technical-system.md)
3. [AI-native 개발 방식](ai-native-workflow.md)
4. [검증 증거](validation-evidence.md)
5. [공개 예제](../examples)
