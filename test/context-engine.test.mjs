import test from "node:test";
import assert from "node:assert/strict";
import {
  evaluateZoneHysteresis,
  planAudioLayers,
  runContextRuntimeDemo,
} from "../examples/context-runtime/context-engine.mjs";
import { scanPublicEvidence } from "../examples/claim-guard/claim-guard.mjs";

test("zone hysteresis waits for stable enter samples", () => {
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

test("zone hysteresis keeps current zone inside exit buffer", () => {
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

test("audio plan stays blocked when weather gate is closed", () => {
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

test("public demo output contains no forbidden public claims", () => {
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
