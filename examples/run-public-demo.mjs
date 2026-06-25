import { runContextRuntimeDemo } from "./context-runtime/context-engine.mjs";
import { assertPublicEvidence } from "./claim-guard/claim-guard.mjs";

const result = runContextRuntimeDemo({
  previousZoneId: null,
  zones: [
    {
      id: "rain-walk-gate",
      center: { x: 0, y: 0 },
      enterRadiusMeters: 18,
    },
  ],
  sample: {
    point: { x: 4, y: 7 },
    accuracy: "coarse",
    stableSamples: 3,
    isStale: false,
  },
  weather: {
    condition: "rain",
    freshness: "fresh",
  },
  motionState: "walking",
});

assertPublicEvidence(result);

console.log(JSON.stringify(result, null, 2));
