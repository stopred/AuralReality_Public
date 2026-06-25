import test from "node:test";
import assert from "node:assert/strict";
import {
  evaluateZoneHysteresis,
  planAudioLayers,
  runContextRuntimeDemo,
} from "../examples/context-runtime/context-engine.mjs";
import { scanPublicEvidence } from "../examples/claim-guard/claim-guard.mjs";

test("zone hysteresis는 안정적인 enter sample을 기다린다", () => {
  const result = evaluateZoneHysteresis({
    previousZoneId: null,
    zones: [{ id: "z1", center: { x: 0, y: 0 }, enterRadiusMeters: 10 }],
    sample: {
      point: { x: 2, y: 2 },
      accuracy: "coarse",
      stableSamples: 1,
      isStale: false,
    },
  });

  assert.equal(result.status, "waiting_for_stable_enter");
  assert.equal(result.zoneId, null);
});

test("zone hysteresis는 exit buffer 안에서 현재 zone을 유지한다", () => {
  const result = evaluateZoneHysteresis({
    previousZoneId: "z1",
    zones: [{ id: "z1", center: { x: 0, y: 0 }, enterRadiusMeters: 10 }],
    sample: {
      point: { x: 16, y: 0 },
      accuracy: "coarse",
      stableSamples: 3,
      isStale: false,
    },
    exitBufferMeters: 10,
  });

  assert.equal(result.status, "stays_active");
  assert.equal(result.zoneId, "z1");
});

test("weather gate가 닫혀 있으면 audio plan은 blocked 상태를 유지한다", () => {
  const result = planAudioLayers({
    zoneState: { zoneId: "z1", status: "entered" },
    weatherGate: { allowed: false, reason: "not_rain" },
    motionState: "walking",
  });

  assert.equal(result.decision, "blocked");
  assert.equal(result.claims.nativePlaybackAccepted, false);
  assert.equal(result.claims.listenerStreamingApproved, false);
  assert.equal(result.claims.launchReady, false);
});

test("public demo output에는 금지된 public claim이 없다", () => {
  const result = runContextRuntimeDemo({
    previousZoneId: null,
    zones: [{ id: "z1", center: { x: 0, y: 0 }, enterRadiusMeters: 10 }],
    sample: {
      point: { x: 1, y: 1 },
      accuracy: "coarse",
      stableSamples: 3,
      isStale: false,
    },
    weather: { condition: "rain", freshness: "fresh" },
    motionState: "still",
  });

  assert.equal(scanPublicEvidence(result).isValid, true);
});
