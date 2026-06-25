const DEFAULT_EXIT_BUFFER_METERS = 10;
const DEFAULT_STABLE_SAMPLE_COUNT = 2;

export function distanceMeters(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function evaluateZoneHysteresis({
  previousZoneId,
  zones,
  sample,
  stableSampleCount = DEFAULT_STABLE_SAMPLE_COUNT,
  exitBufferMeters = DEFAULT_EXIT_BUFFER_METERS,
}) {
  if (!sample || sample.accuracy === "unknown" || sample.isStale) {
    return {
      zoneId: previousZoneId ?? null,
      status: "blocked_low_confidence",
      publicEvidence: "location_state_low_confidence",
    };
  }

  const ranked = zones
    .map((zone) => ({
      zone,
      distance: distanceMeters(sample.point, zone.center),
    }))
    .sort((a, b) => a.distance - b.distance);

  const nearest = ranked[0];
  if (!nearest) {
    return {
      zoneId: null,
      status: "blocked_no_zone",
      publicEvidence: "no_zone_configured",
    };
  }

  const insideEnterRadius = nearest.distance <= nearest.zone.enterRadiusMeters;
  const stableEnough = sample.stableSamples >= stableSampleCount;

  if (!previousZoneId) {
    return insideEnterRadius && stableEnough
      ? {
          zoneId: nearest.zone.id,
          status: "entered",
          publicEvidence: "zone_entered_public_safe",
        }
      : {
          zoneId: null,
          status: "waiting_for_stable_enter",
          publicEvidence: "zone_waiting",
        };
  }

  const current = zones.find((zone) => zone.id === previousZoneId);
  if (!current) {
    return {
      zoneId: null,
      status: "blocked_previous_zone_missing",
      publicEvidence: "zone_config_mismatch",
    };
  }

  const distanceFromCurrent = distanceMeters(sample.point, current.center);
  const exitRadius = current.enterRadiusMeters + exitBufferMeters;

  if (distanceFromCurrent <= exitRadius) {
    return {
      zoneId: current.id,
      status: "stays_active",
      publicEvidence: "zone_stable",
    };
  }

  if (insideEnterRadius && stableEnough) {
    return {
      zoneId: nearest.zone.id,
      status: "switched_zone",
      publicEvidence: "zone_switched_public_safe",
    };
  }

  return {
    zoneId: null,
    status: "exited_without_new_stable_zone",
    publicEvidence: "zone_exited",
  };
}

export function decideWeatherGate(weather) {
  if (!weather || weather.freshness !== "fresh") {
    return {
      allowed: false,
      reason: "weather_stale_or_missing",
    };
  }

  if (weather.condition !== "rain") {
    return {
      allowed: false,
      reason: "not_rain",
    };
  }

  return {
    allowed: true,
    reason: "fresh_rain",
  };
}

export function planAudioLayers({ zoneState, weatherGate, motionState }) {
  if (!weatherGate.allowed) {
    return {
      decision: "blocked",
      reason: weatherGate.reason,
      layers: [],
      claims: {
        nativePlaybackAccepted: false,
        listenerStreamingApproved: false,
        launchReady: false,
      },
    };
  }

  if (!zoneState.zoneId || !["entered", "stays_active", "switched_zone"].includes(zoneState.status)) {
    return {
      decision: "blocked",
      reason: "zone_not_ready",
      layers: [],
      claims: {
        nativePlaybackAccepted: false,
        listenerStreamingApproved: false,
        launchReady: false,
      },
    };
  }

  const walking = motionState === "walking";

  return {
    decision: "plan_only",
    reason: "public_safe_demo_plan",
    layers: [
      { id: "rain-bed", gain: walking ? 0.72 : 0.58 },
      { id: "soft-pulse", gain: walking ? 0.36 : 0.18 },
      { id: "narrative-window", gain: walking ? 0.0 : 0.64 },
    ],
    claims: {
      nativePlaybackAccepted: false,
      listenerStreamingApproved: false,
      launchReady: false,
    },
  };
}

export function runContextRuntimeDemo(input) {
  const zoneState = evaluateZoneHysteresis(input);
  const weatherGate = decideWeatherGate(input.weather);
  return {
    zoneState,
    weatherGate,
    audioPlan: planAudioLayers({
      zoneState,
      weatherGate,
      motionState: input.motionState,
    }),
    publicEvidence: {
      rawCoordinatesStored: false,
      rawWeatherPayloadStored: false,
      privateParticipantDataStored: false,
      evidenceKind: "public_safe_demo",
    },
  };
}
