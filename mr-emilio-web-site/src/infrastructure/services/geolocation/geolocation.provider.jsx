import { useCallback, useEffect, useMemo, useState } from "react";

import { GeolocationContext } from "./geolocation.context";

import {
  GEOLOCATION_PERMISSION_STATUS,
  DEFAULT_GEOLOCATION_OPTIONS,
  getCurrentBrowserPosition,
  getGeolocationPermissionStatus,
  normalizeGeolocationError,
  validateCoordinates,
} from "./geolocation.helpers";

const GEOLOCATION_STORAGE_KEY = "mrEmilio:lastKnownLocation";

const STORED_LOCATION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const readStoredLocation = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(GEOLOCATION_STORAGE_KEY);

    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);

    const coordinates = validateCoordinates(
      parsedValue?.coordinates,
      "storedLocation.coordinates"
    );

    const timestamp = Number(parsedValue?.timestamp);

    if (!Number.isFinite(timestamp)) {
      window.localStorage.removeItem(GEOLOCATION_STORAGE_KEY);

      return null;
    }

    const ageInMilliseconds = Date.now() - timestamp;

    if (ageInMilliseconds > STORED_LOCATION_MAX_AGE_MS) {
      window.localStorage.removeItem(GEOLOCATION_STORAGE_KEY);

      return null;
    }

    return {
      coordinates,

      accuracyMeters: Number.isFinite(Number(parsedValue?.accuracyMeters))
        ? Number(parsedValue.accuracyMeters)
        : null,

      timestamp,

      resolvedAt:
        typeof parsedValue?.resolvedAt === "string"
          ? parsedValue.resolvedAt
          : new Date(timestamp).toISOString(),

      source: "storage",
    };
  } catch (error) {
    console.error("Unable to restore stored geolocation:", error);

    window.localStorage.removeItem(GEOLOCATION_STORAGE_KEY);

    return null;
  }
};

const persistLocation = (location) => {
  if (typeof window === "undefined" || !location?.coordinates) {
    return;
  }

  try {
    window.localStorage.setItem(
      GEOLOCATION_STORAGE_KEY,
      JSON.stringify({
        coordinates: location.coordinates,
        accuracyMeters: location.accuracyMeters ?? null,
        timestamp: location.timestamp ?? Date.now(),
        resolvedAt: location.resolvedAt ?? new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("Unable to persist geolocation:", error);
  }
};

const removeStoredLocation = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(GEOLOCATION_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to remove stored geolocation:", error);
  }
};

export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => readStoredLocation());

  const [permissionStatus, setPermissionStatus] = useState(
    GEOLOCATION_PERMISSION_STATUS.UNKNOWN
  );

  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);

  const [geolocationError, setGeolocationError] = useState(null);

  const requestCurrentLocation = useCallback(
    async ({ options = DEFAULT_GEOLOCATION_OPTIONS } = {}) => {
      setIsGeolocationLoading(true);
      setGeolocationError(null);

      try {
        const browserLocation = await getCurrentBrowserPosition(options);

        const nextLocation = {
          ...browserLocation,
          source: "browser",
        };

        setLocation(nextLocation);
        persistLocation(nextLocation);

        setPermissionStatus(GEOLOCATION_PERMISSION_STATUS.GRANTED);

        return nextLocation;
      } catch (error) {
        const normalizedError = normalizeGeolocationError(error);

        setGeolocationError(normalizedError);

        if (normalizedError.code === "permissionDenied") {
          setPermissionStatus(GEOLOCATION_PERMISSION_STATUS.DENIED);
        }

        return null;
      } finally {
        setIsGeolocationLoading(false);
      }
    },
    []
  );

  const clearLocation = useCallback(() => {
    setLocation(null);
    setGeolocationError(null);

    removeStoredLocation();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeGeolocation = async () => {
      const nextPermissionStatus = await getGeolocationPermissionStatus();

      if (!isMounted) {
        return;
      }

      setPermissionStatus(nextPermissionStatus);

      /**
       * Only refresh automatically when permission
       * was already granted.
       *
       * This prevents an unexpected browser permission
       * prompt when a new customer opens the website.
       */
      if (nextPermissionStatus === GEOLOCATION_PERMISSION_STATUS.GRANTED) {
        await requestCurrentLocation();
      }
    };

    initializeGeolocation();

    return () => {
      isMounted = false;
    };
  }, [requestCurrentLocation]);

  const coordinates = location?.coordinates ?? null;

  const hasResolvedLocation = Boolean(coordinates);

  const isUsingStoredLocation = location?.source === "storage";

  const isUsingBrowserLocation = location?.source === "browser";

  const contextValue = useMemo(
    () => ({
      location,
      coordinates,

      accuracyMeters: location?.accuracyMeters ?? null,

      locationTimestamp: location?.timestamp ?? null,

      locationResolvedAt: location?.resolvedAt ?? null,

      permissionStatus,

      isGeolocationLoading,
      geolocationError,

      hasResolvedLocation,
      isUsingStoredLocation,
      isUsingBrowserLocation,

      requestCurrentLocation,
      refreshCurrentLocation: requestCurrentLocation,

      clearLocation,
    }),
    [
      location,
      coordinates,
      permissionStatus,
      isGeolocationLoading,
      geolocationError,
      hasResolvedLocation,
      isUsingStoredLocation,
      isUsingBrowserLocation,
      requestCurrentLocation,
      clearLocation,
    ]
  );

  return (
    <GeolocationContext.Provider value={contextValue}>
      {children}
    </GeolocationContext.Provider>
  );
};
