import { useCallback, useEffect, useMemo, useState } from "react";

import { WarehouseContext } from "./warehouse.context";

import { useGeolocation } from "../geolocation/use-geolocation.hook";

import {
  getClosestWarehouseRequest,
  getWarehouseByIdRequest,
  getWarehousesByDistanceRequest,
  getPickupWarehousesByDrivingDistanceRequest,
} from "./warehouse.requests";

import {
  normalizeClosestWarehouseResponse,
  normalizeWarehousesByDistanceResponse,
  normalizePickupWarehousesByDrivingDistanceResponse,
} from "./warehouse.helpers";

const DEFAULT_WAREHOUSE_ID = "main-warehouse-cumming";
const SESSION_WAREHOUSE_ID_STORAGE_KEY = "mr-emilio-session-warehouse-id";

const WAREHOUSE_RESOLUTION_SOURCES = Object.freeze({
  DEFAULT: "default",
  STORED_LOCATION: "storedLocation",
  BROWSER_LOCATION: "browserLocation",
  MANUAL_LOCATION: "manualLocation",
});

const isCanceledRequest = (error) =>
  error?.name === "CanceledError" ||
  error?.name === "AbortError" ||
  error?.code === "ERR_CANCELED";

const getSessionWarehouseId = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const warehouseId = window.sessionStorage.getItem(
      SESSION_WAREHOUSE_ID_STORAGE_KEY
    );

    return typeof warehouseId === "string" && warehouseId.trim()
      ? warehouseId.trim()
      : null;
  } catch (error) {
    console.warn("Unable to read the session warehouse selection:", error);

    return null;
  }
};

const setSessionWarehouseId = (warehouseId) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (typeof warehouseId === "string" && warehouseId.trim()) {
      window.sessionStorage.setItem(
        SESSION_WAREHOUSE_ID_STORAGE_KEY,
        warehouseId.trim()
      );

      return;
    }

    window.sessionStorage.removeItem(SESSION_WAREHOUSE_ID_STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to store the session warehouse selection:", error);
  }
};

const clearSessionWarehouseId = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(SESSION_WAREHOUSE_ID_STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to clear the session warehouse selection:", error);
  }
};

const normalizeDefaultWarehouseResponse = (warehouse) => {
  if (!warehouse || typeof warehouse !== "object" || Array.isArray(warehouse)) {
    return null;
  }

  return {
    warehouse,

    customerContext: {
      distance: {
        miles: null,
      },

      fulfillment: {
        pickup: {
          available:
            warehouse.active === true &&
            warehouse.status === "open" &&
            warehouse.fulfillment?.pickup?.enabled === true,

          preparationTimeMinutes:
            warehouse.fulfillment?.pickup?.preparationTimeMinutes ?? null,
        },

        localDelivery: {
          available: false,

          radiusMiles:
            warehouse.fulfillment?.localDelivery?.radiusMiles ?? null,

          estimatedTimeMinutes:
            warehouse.fulfillment?.localDelivery?.estimatedTimeMinutes ?? null,

          provider: warehouse.fulfillment?.localDelivery?.provider ?? null,

          reason: "CUSTOMER_LOCATION_REQUIRED",
        },

        pickupDistanceWarning: {
          shouldDisplay: false,
          reason: null,
          distanceMiles: null,

          deliveryRadiusMiles:
            warehouse.fulfillment?.localDelivery?.radiusMiles ?? null,

          messageKey: null,
        },
      },
    },
  };
};

export const WarehouseProvider = ({ children }) => {
  const {
    coordinates,
    location,
    hasResolvedLocation,
    isGeolocationLoading,
    geolocationError,
  } = useGeolocation();

  const [resolvedWarehouse, setResolvedWarehouse] = useState(null);

  const [resolvedCustomerContext, setResolvedCustomerContext] = useState(null);

  const [warehousesByDistance, setWarehousesByDistance] = useState([]);

  const [
    pickupWarehousesByDrivingDistance,
    setPickupWarehousesByDrivingDistance,
  ] = useState([]);

  const [isPickupWarehousesLoading, setIsPickupWarehousesLoading] =
    useState(false);

  const [pickupWarehousesError, setPickupWarehousesError] = useState(null);

  const [warehouseResolutionSource, setWarehouseResolutionSource] =
    useState(null);

  const [isWarehouseLoading, setIsWarehouseLoading] = useState(true);

  const [warehouseError, setWarehouseError] = useState(null);

  const resolveDefaultWarehouse = useCallback(async ({ signal } = {}) => {
    setIsWarehouseLoading(true);
    setWarehouseError(null);

    try {
      const warehouseResponse = await getWarehouseByIdRequest(
        DEFAULT_WAREHOUSE_ID,
        {
          signal,
        }
      );

      if (signal?.aborted) {
        return null;
      }

      const normalizedResponse =
        normalizeDefaultWarehouseResponse(warehouseResponse);

      if (!normalizedResponse) {
        throw new Error(
          "The default warehouse response could not be normalized."
        );
      }

      setResolvedWarehouse(normalizedResponse.warehouse);

      setResolvedCustomerContext(normalizedResponse.customerContext);

      setWarehouseResolutionSource(WAREHOUSE_RESOLUTION_SOURCES.DEFAULT);

      setWarehousesByDistance([]);

      return normalizedResponse;
    } catch (requestError) {
      if (signal?.aborted || isCanceledRequest(requestError)) {
        return null;
      }

      console.error("Error resolving default warehouse:", requestError);

      setResolvedWarehouse(null);
      setResolvedCustomerContext(null);
      setWarehousesByDistance([]);
      setWarehouseResolutionSource(null);
      setWarehouseError(requestError);

      return null;
    } finally {
      if (!signal?.aborted) {
        setIsWarehouseLoading(false);
      }
    }
  }, []);

  const resolveClosestWarehouse = useCallback(
    async (
      nextCoordinates,
      { signal, source = WAREHOUSE_RESOLUTION_SOURCES.BROWSER_LOCATION } = {}
    ) => {
      if (!nextCoordinates) {
        return null;
      }

      setIsWarehouseLoading(true);
      setWarehouseError(null);

      try {
        const response = await getClosestWarehouseRequest(nextCoordinates, {
          signal,
        });

        if (signal?.aborted) {
          return null;
        }

        const normalizedResponse = normalizeClosestWarehouseResponse(response);

        if (!normalizedResponse) {
          throw new Error(
            "The closest warehouse response could not be normalized."
          );
        }

        setResolvedWarehouse(normalizedResponse.warehouse);

        setResolvedCustomerContext(normalizedResponse.customerContext);

        setWarehouseResolutionSource(source);

        return normalizedResponse;
      } catch (requestError) {
        if (signal?.aborted || isCanceledRequest(requestError)) {
          return null;
        }

        console.error("Error resolving closest warehouse:", requestError);

        setWarehouseError(requestError);

        return null;
      } finally {
        if (!signal?.aborted) {
          setIsWarehouseLoading(false);
        }
      }
    },
    []
  );

  const resolveWarehousesByDistance = useCallback(
    async (nextCoordinates, { signal } = {}) => {
      if (!nextCoordinates) {
        setWarehousesByDistance([]);

        return [];
      }

      try {
        const response = await getWarehousesByDistanceRequest(nextCoordinates, {
          signal,
        });

        if (signal?.aborted) {
          return [];
        }

        const normalizedWarehouses =
          normalizeWarehousesByDistanceResponse(response);

        setWarehousesByDistance(normalizedWarehouses);

        return normalizedWarehouses;
      } catch (requestError) {
        if (signal?.aborted || isCanceledRequest(requestError)) {
          return [];
        }

        console.error("Error resolving warehouses by distance:", requestError);

        setWarehousesByDistance([]);

        return [];
      }
    },
    []
  );

  const selectSessionWarehouse = useCallback((storeEntry) => {
    const selectedWarehouse = storeEntry?.warehouse;

    const selectedCustomerContext = storeEntry?.customerContext;

    if (
      !selectedWarehouse ||
      typeof selectedWarehouse !== "object" ||
      !selectedWarehouse.id
    ) {
      throw new Error(
        "A valid store is required to change the shopping store."
      );
    }

    setResolvedWarehouse(selectedWarehouse);

    setResolvedCustomerContext(
      selectedCustomerContext && typeof selectedCustomerContext === "object"
        ? selectedCustomerContext
        : null
    );

    setWarehouseResolutionSource(WAREHOUSE_RESOLUTION_SOURCES.MANUAL_LOCATION);

    setWarehouseError(null);

    setSessionWarehouseId(selectedWarehouse.id);

    return {
      warehouse: selectedWarehouse,

      customerContext:
        selectedCustomerContext && typeof selectedCustomerContext === "object"
          ? selectedCustomerContext
          : null,
    };
  }, []);

  const clearSessionWarehouseSelection = useCallback(() => {
    clearSessionWarehouseId();

    setWarehouseResolutionSource(null);
  }, []);

  const resolvePickupWarehousesByDrivingDistance = useCallback(
    async (nextCoordinates, { signal } = {}) => {
      if (!nextCoordinates) {
        setPickupWarehousesByDrivingDistance([]);

        return [];
      }

      setIsPickupWarehousesLoading(true);
      setPickupWarehousesError(null);

      try {
        const response = await getPickupWarehousesByDrivingDistanceRequest(
          nextCoordinates,
          {
            signal,
          }
        );

        if (signal?.aborted) {
          return [];
        }

        const normalizedWarehouses =
          normalizePickupWarehousesByDrivingDistanceResponse(response);

        setPickupWarehousesByDrivingDistance(normalizedWarehouses);

        return normalizedWarehouses;
      } catch (requestError) {
        if (signal?.aborted || isCanceledRequest(requestError)) {
          return [];
        }

        console.error(
          "Error resolving pickup warehouses by driving distance:",
          requestError
        );

        setPickupWarehousesByDrivingDistance([]);
        setPickupWarehousesError(requestError);

        return [];
      } finally {
        if (!signal?.aborted) {
          setIsPickupWarehousesLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const abortController = new AbortController();

    const initializeWarehouse = async () => {
      if (hasResolvedLocation && coordinates) {
        const locationSource =
          location?.source === "storage"
            ? WAREHOUSE_RESOLUTION_SOURCES.STORED_LOCATION
            : WAREHOUSE_RESOLUTION_SOURCES.BROWSER_LOCATION;

        const sessionWarehouseId = getSessionWarehouseId();

        setIsWarehouseLoading(true);
        setWarehouseError(null);
        const resolvedWarehouses = await resolveWarehousesByDistance(
          coordinates,
          {
            signal: abortController.signal,
          }
        );

        if (abortController.signal.aborted) {
          return;
        }

        if (sessionWarehouseId) {
          const sessionStoreEntry = resolvedWarehouses.find(
            (entry) => entry?.warehouse?.id === sessionWarehouseId
          );

          if (sessionStoreEntry) {
            setResolvedWarehouse(sessionStoreEntry.warehouse);

            setResolvedCustomerContext(
              sessionStoreEntry.customerContext || null
            );

            setWarehouseResolutionSource(
              WAREHOUSE_RESOLUTION_SOURCES.MANUAL_LOCATION
            );

            setWarehouseError(null);
            setIsWarehouseLoading(false);

            return;
          }

          clearSessionWarehouseId();
        }

        await resolveClosestWarehouse(coordinates, {
          signal: abortController.signal,
          source: locationSource,
        });

        return;
      }

      await resolveDefaultWarehouse({
        signal: abortController.signal,
      });
    };

    initializeWarehouse();

    return () => {
      abortController.abort();
    };
  }, [
    coordinates,
    hasResolvedLocation,
    location?.source,
    resolveClosestWarehouse,
    resolveDefaultWarehouse,
    resolveWarehousesByDistance,
  ]);
  // useEffect(() => {
  //   const abortController = new AbortController();

  //   const initializeWarehouse = async () => {
  //     if (hasResolvedLocation && coordinates) {
  //       const locationSource =
  //         location?.source === "storage"
  //           ? WAREHOUSE_RESOLUTION_SOURCES.STORED_LOCATION
  //           : WAREHOUSE_RESOLUTION_SOURCES.BROWSER_LOCATION;

  //       await Promise.all([
  //         resolveClosestWarehouse(coordinates, {
  //           signal: abortController.signal,
  //           source: locationSource,
  //         }),

  //         resolveWarehousesByDistance(coordinates, {
  //           signal: abortController.signal,
  //         }),
  //       ]);

  //       return;
  //     }

  //     await resolveDefaultWarehouse({
  //       signal: abortController.signal,
  //     });
  //   };

  //   initializeWarehouse();

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [
  //   coordinates,
  //   hasResolvedLocation,
  //   location?.source,
  //   resolveClosestWarehouse,
  //   resolveDefaultWarehouse,
  //   resolveWarehousesByDistance,
  // ]);

  const warehouse = resolvedWarehouse;

  const customerContext = resolvedCustomerContext;

  const isUsingDefaultWarehouse =
    warehouseResolutionSource === WAREHOUSE_RESOLUTION_SOURCES.DEFAULT;

  const isUsingSessionWarehouse =
    warehouseResolutionSource === WAREHOUSE_RESOLUTION_SOURCES.MANUAL_LOCATION;

  const hasResolvedWarehouse = Boolean(warehouse);

  const isResolvingLocationOrWarehouse =
    isGeolocationLoading || isWarehouseLoading;

  const combinedWarehouseError = warehouseError || geolocationError || null;

  const reloadWarehouse = useCallback(async () => {
    if (hasResolvedLocation && coordinates) {
      const locationSource =
        location?.source === "storage"
          ? WAREHOUSE_RESOLUTION_SOURCES.STORED_LOCATION
          : WAREHOUSE_RESOLUTION_SOURCES.BROWSER_LOCATION;

      const sessionWarehouseId = getSessionWarehouseId();

      const resolvedWarehouses = await resolveWarehousesByDistance(coordinates);

      if (sessionWarehouseId) {
        const sessionStoreEntry = resolvedWarehouses.find(
          (entry) => entry?.warehouse?.id === sessionWarehouseId
        );

        if (sessionStoreEntry) {
          setResolvedWarehouse(sessionStoreEntry.warehouse);

          setResolvedCustomerContext(sessionStoreEntry.customerContext || null);

          setWarehouseResolutionSource(
            WAREHOUSE_RESOLUTION_SOURCES.MANUAL_LOCATION
          );

          setWarehouseError(null);

          return sessionStoreEntry;
        }

        clearSessionWarehouseId();
      }

      return resolveClosestWarehouse(coordinates, {
        source: locationSource,
      });
    }

    return resolveDefaultWarehouse();
  }, [
    coordinates,
    hasResolvedLocation,
    location?.source,
    resolveClosestWarehouse,
    resolveDefaultWarehouse,
    resolveWarehousesByDistance,
  ]);
  const contextValue = useMemo(
    () => ({
      warehouse,
      customerContext,

      warehousesByDistance,

      pickupWarehousesByDrivingDistance,
      isPickupWarehousesLoading,
      pickupWarehousesError,

      warehouseResolutionSource,
      isUsingDefaultWarehouse,

      isUsingSessionWarehouse,

      selectSessionWarehouse,
      clearSessionWarehouseSelection,

      isWarehouseLoading,
      warehouseError,

      isResolvingLocationOrWarehouse,
      combinedWarehouseError,

      hasResolvedWarehouse,

      resolveWarehouse: resolveClosestWarehouse,

      resolveClosestWarehouse,
      resolveWarehousesByDistance,
      resolvePickupWarehousesByDrivingDistance,
      resolveDefaultWarehouse,
      reloadWarehouse,

      customerCoordinates: coordinates,

      defaultWarehouseId: DEFAULT_WAREHOUSE_ID,
    }),
    [
      warehouse,
      customerContext,

      warehousesByDistance,

      pickupWarehousesByDrivingDistance,
      isPickupWarehousesLoading,
      pickupWarehousesError,

      warehouseResolutionSource,
      isUsingDefaultWarehouse,
      isUsingSessionWarehouse,

      selectSessionWarehouse,
      clearSessionWarehouseSelection,

      isWarehouseLoading,
      warehouseError,

      isResolvingLocationOrWarehouse,
      combinedWarehouseError,

      hasResolvedWarehouse,

      resolveClosestWarehouse,
      resolveWarehousesByDistance,
      resolvePickupWarehousesByDrivingDistance,
      resolveDefaultWarehouse,
      reloadWarehouse,

      coordinates,
    ]
  );

  return (
    <WarehouseContext.Provider value={contextValue}>
      {children}
    </WarehouseContext.Provider>
  );
};
