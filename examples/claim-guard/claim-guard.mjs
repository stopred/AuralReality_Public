const FORBIDDEN_TRUE_FLAGS = [
  "launchReady",
  "catalogCounted",
  "listenerStreamingApproved",
  "nativePlaybackAccepted",
  "physicalDeviceEvidenceAccepted",
  "fieldTestAccepted",
  "publicLaunchApproved",
  "signedUrlExposed",
  "tokenValueLogged",
  "rawCoordinatesStored",
  "rawWeatherPayloadStored",
  "privateParticipantDataStored",
];

const SECRET_LIKE_PATTERNS = [
  /\bBearer\s+[A-Za-z0-9._~-]+/i,
  /\bsignedUrl\s*[:=]\s*https?:\/\//i,
  /\btoken\s*[:=]\s*[A-Za-z0-9._~-]{12,}/i,
  /\bsecret\s*[:=]\s*[A-Za-z0-9._~-]{8,}/i,
  /\b(lat|latitude|lng|longitude)\s*[:=]\s*-?\d{1,3}(?:\.\d+)?/i,
];

export function scanPublicEvidence(value, path = "evidence") {
  const issues = [];

  function visit(node, currentPath) {
    if (Array.isArray(node)) {
      node.forEach((item, index) => visit(item, `${currentPath}[${index}]`));
      return;
    }

    if (node && typeof node === "object") {
      for (const [key, child] of Object.entries(node)) {
        const nextPath = `${currentPath}.${key}`;
        if (FORBIDDEN_TRUE_FLAGS.includes(key) && child === true) {
          issues.push({
            path: nextPath,
            code: "FORBIDDEN_PUBLIC_CLAIM",
            message: `${key} must not be true in public-safe evidence.`,
          });
        }
        visit(child, nextPath);
      }
      return;
    }

    if (typeof node === "string") {
      for (const pattern of SECRET_LIKE_PATTERNS) {
        if (pattern.test(node)) {
          issues.push({
            path: currentPath,
            code: "SECRET_OR_PRIVATE_MATERIAL",
            message: "Public evidence contains token, signed URL, secret, or raw coordinate-like material.",
          });
          break;
        }
      }
    }
  }

  visit(value, path);
  return {
    isValid: issues.length === 0,
    issues,
  };
}

export function assertPublicEvidence(value) {
  const result = scanPublicEvidence(value);
  if (!result.isValid) {
    const message = result.issues
      .map((issue) => `${issue.code} at ${issue.path}`)
      .join("; ");
    throw new Error(message);
  }
  return result;
}
