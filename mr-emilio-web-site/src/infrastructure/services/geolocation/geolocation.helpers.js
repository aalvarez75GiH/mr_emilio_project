export const GEOLOCATION_PERMISSION_STATUS = Object.freeze({
  PROMPT: "prompt",
  GRANTED: "granted",
  DENIED: "denied",
  UNSUPPORTED: "unsupported",
  UNKNOWN: "unknown",
});

export const GEOLOCATION_ERROR_CODES = Object.freeze({
  PERMISSION_DENIED: "permissionDenied",
  POSITION_UNAVAILABLE: "positionUnavailable",
  TIMEOUT: "timeout",
  UNSUPPORTED: "unsupported",
  SECURE_CONTEXT_REQUIRED: "secureContextRequired",
  INVALID_POSITION: "invalidPosition",
  UNKNOWN: "unknown",
});

export const DEFAULT_GEOLOCATION_OPTIONS = Object.freeze({
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 5 * 60 * 1000,
});

const isFiniteCoordinate = (value) => Number.isFinite(Number(value));

export const validateCoordinates = (coordinates, fieldName = "coordinates") => {
  if (
    !coordinates ||
    typeof coordinates !== "object" ||
    Array.isArray(coordinates)
  ) {
    throw new Error(`"${fieldName}" must be a coordinates object`);
  }

  const lat = Number(coordinates.lat);
  const lng = Number(coordinates.lng);

  if (!isFiniteCoordinate(lat)) {
    throw new Error(`"${fieldName}.lat" must be a valid number`);
  }

  if (!isFiniteCoordinate(lng)) {
    throw new Error(`"${fieldName}.lng" must be a valid number`);
  }

  if (lat < -90 || lat > 90) {
    throw new Error(`"${fieldName}.lat" must be between -90 and 90`);
  }

  if (lng < -180 || lng > 180) {
    throw new Error(`"${fieldName}.lng" must be between -180 and 180`);
  }

  return {
    lat,
    lng,
  };
};

export const normalizeBrowserPosition = (position) => {
  const latitude = position?.coords?.latitude;
  const longitude = position?.coords?.longitude;

  const coordinates = validateCoordinates(
    {
      lat: latitude,
      lng: longitude,
    },
    "browserPosition"
  );

  const accuracy = Number(position?.coords?.accuracy);

  const altitude = Number(position?.coords?.altitude);
  const altitudeAccuracy = Number(position?.coords?.altitudeAccuracy);

  const heading = Number(position?.coords?.heading);
  const speed = Number(position?.coords?.speed);

  const timestamp = Number(position?.timestamp);

  return {
    coordinates,

    accuracyMeters: Number.isFinite(accuracy) ? accuracy : null,

    altitudeMeters: Number.isFinite(altitude) ? altitude : null,

    altitudeAccuracyMeters: Number.isFinite(altitudeAccuracy)
      ? altitudeAccuracy
      : null,

    headingDegrees: Number.isFinite(heading) ? heading : null,

    speedMetersPerSecond: Number.isFinite(speed) ? speed : null,

    timestamp: Number.isFinite(timestamp) ? timestamp : Date.now(),

    resolvedAt: new Date().toISOString(),
  };
};

export const normalizeGeolocationError = (error) => {
  const browserErrorCode = Number(error?.code);

  if (browserErrorCode === 1) {
    return {
      code: GEOLOCATION_ERROR_CODES.PERMISSION_DENIED,

      message:
        "Location permission was denied. You can allow location access in your browser settings or choose a pickup location manually.",

      originalError: error || null,
    };
  }

  if (browserErrorCode === 2) {
    return {
      code: GEOLOCATION_ERROR_CODES.POSITION_UNAVAILABLE,

      message:
        "Your current location could not be determined. Please try again or choose a pickup location manually.",

      originalError: error || null,
    };
  }

  if (browserErrorCode === 3) {
    return {
      code: GEOLOCATION_ERROR_CODES.TIMEOUT,

      message: "The location request took too long. Please try again.",

      originalError: error || null,
    };
  }

  if (error?.code === GEOLOCATION_ERROR_CODES.UNSUPPORTED) {
    return {
      code: GEOLOCATION_ERROR_CODES.UNSUPPORTED,

      message: "Location services are not supported by this browser.",

      originalError: error || null,
    };
  }

  if (error?.code === GEOLOCATION_ERROR_CODES.INVALID_POSITION) {
    return {
      code: GEOLOCATION_ERROR_CODES.INVALID_POSITION,

      message: "The browser returned an invalid location.",

      originalError: error || null,
    };
  }

  if (error?.code === GEOLOCATION_ERROR_CODES.SECURE_CONTEXT_REQUIRED) {
    return {
      code: GEOLOCATION_ERROR_CODES.SECURE_CONTEXT_REQUIRED,

      message: "Location requires a secure HTTPS connection.",

      originalError: error || null,
    };
  }

  return {
    code: GEOLOCATION_ERROR_CODES.UNKNOWN,

    message:
      error?.message || "Something went wrong while requesting your location.",

    originalError: error || null,
  };
};

export const getBrowserGeolocationSupport = () => {
  if (typeof window === "undefined") {
    return {
      supported: false,
      secureContext: false,
      geolocation: null,
      reason: GEOLOCATION_ERROR_CODES.UNSUPPORTED,
    };
  }

  const secureContext = window.isSecureContext === true;

  if (!secureContext) {
    return {
      supported: false,
      secureContext: false,
      geolocation: null,
      reason: GEOLOCATION_ERROR_CODES.SECURE_CONTEXT_REQUIRED,
    };
  }

  const geolocation = window.navigator?.geolocation || null;

  if (!geolocation) {
    return {
      supported: false,
      secureContext: true,
      geolocation: null,
      reason: GEOLOCATION_ERROR_CODES.UNSUPPORTED,
    };
  }

  return {
    supported: true,
    secureContext: true,
    geolocation,
    reason: null,
  };
};

export const getCurrentBrowserPosition = (
  options = DEFAULT_GEOLOCATION_OPTIONS
) =>
  new Promise((resolve, reject) => {
    const { supported, secureContext, geolocation, reason } =
      getBrowserGeolocationSupport();

    if (!secureContext) {
      reject({
        code: GEOLOCATION_ERROR_CODES.SECURE_CONTEXT_REQUIRED,

        message: "Location requires a secure HTTPS connection.",
      });

      return;
    }

    if (!supported || !geolocation) {
      reject({
        code: reason || GEOLOCATION_ERROR_CODES.UNSUPPORTED,

        message: "Browser geolocation is not supported.",
      });

      return;
    }

    geolocation.getCurrentPosition(
      (position) => {
        try {
          resolve(normalizeBrowserPosition(position));
        } catch (error) {
          reject({
            code: GEOLOCATION_ERROR_CODES.INVALID_POSITION,

            message: error.message,
            originalError: error,
          });
        }
      },

      (error) => {
        reject(normalizeGeolocationError(error));
      },

      {
        ...DEFAULT_GEOLOCATION_OPTIONS,
        ...options,
      }
    );
  });

export const getGeolocationPermissionStatus = async () => {
  if (typeof window === "undefined") {
    return GEOLOCATION_PERMISSION_STATUS.UNSUPPORTED;
  }

  const { supported } = getBrowserGeolocationSupport();

  if (!supported) {
    return GEOLOCATION_PERMISSION_STATUS.UNSUPPORTED;
  }

  const permissionsApi = window.navigator?.permissions;

  if (!permissionsApi || typeof permissionsApi.query !== "function") {
    return GEOLOCATION_PERMISSION_STATUS.UNKNOWN;
  }

  try {
    const permission = await permissionsApi.query({
      name: "geolocation",
    });

    if (permission.state === GEOLOCATION_PERMISSION_STATUS.GRANTED) {
      return GEOLOCATION_PERMISSION_STATUS.GRANTED;
    }

    if (permission.state === GEOLOCATION_PERMISSION_STATUS.DENIED) {
      return GEOLOCATION_PERMISSION_STATUS.DENIED;
    }

    return GEOLOCATION_PERMISSION_STATUS.PROMPT;
  } catch {
    return GEOLOCATION_PERMISSION_STATUS.UNKNOWN;
  }
};
