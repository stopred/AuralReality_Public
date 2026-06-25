# 검증 증거

이 문서는 SparkClaw 리뷰에 사용할 수 있는 공개 안전(public-safe) 검증 스냅샷을
기록합니다.

## 비공개 작업 공간(workspace) 스냅샷

날짜: 2026-06-25

| 항목 | 값 |
| --- | ---: |
| 비공개 workspace commit 수 | 1,250 |
| 비공개 workspace tracked file 수 | 8,958 |
| test file 수 | 979 |
| AUR spec 문서 수 | 3,435 |
| Codex prompt library 수 | 27 |
| Harness 검사 파일 수 | 20,886 |
| Harness issue 수 | 0 |
| focused streaming / gate test | 35 / 35 passed |
| `npm run typecheck` | passed |
| `npm run harness:check` | passed |

## 이 숫자가 의미하는 것

이 숫자는 비공개 작업 공간(workspace) 안에 실제 구현, test, governance infrastructure가
존재한다는 뜻입니다.

하지만 아래를 의미하지는 않습니다.

- public launch
- native playback acceptance
- listener streaming approval
- field-test acceptance
- `launch_ready` catalog count
- legal / store / privacy finality

## 공개 예제 테스트

이 공개 저장소에는 축약 예제를 검증하는 작은 실행 가능 test suite가 포함되어
있습니다.

실행:

```bash
npm test
npm run demo
```
