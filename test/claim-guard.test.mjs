import test from "node:test";
import assert from "node:assert/strict";
import { scanPublicEvidence } from "../examples/claim-guard/claim-guard.mjs";

test("claim guard rejects premature launch-ready claims", () => {
  const result = scanPublicEvidence({
    launchReady: true,
  });

  assert.equal(result.isValid, false);
  assert.equal(result.issues[0].code, "FORBIDDEN_PUBLIC_CLAIM");
});

test("claim guard rejects token-like material", () => {
  const result = scanPublicEvidence({
    logLine: "Authorization: Bearer abcdefghijklmnop",
  });

  assert.equal(result.isValid, false);
  assert.equal(result.issues[0].code, "SECRET_OR_PRIVATE_MATERIAL");
});

test("claim guard accepts public-safe negative flags", () => {
  const result = scanPublicEvidence({
    launchReady: false,
    nativePlaybackAccepted: false,
    publicEvidence: "zone_entered_public_safe",
  });

  assert.equal(result.isValid, true);
});
