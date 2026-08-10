import { useCallback, useEffect, useMemo, useState } from "react";

import { WarehouseContext } from "./warehouse.context";

import { useGeolocation } from "../geolocation/use-geolocation.hook";

import {
  getClosestWarehouseRequest,
  getWarehouseByIdRequest,
  getWarehousesByDistanceRequest,
} from "./warehouse.requests";

import {
  normalizeClosestWarehouseResponse,
  normalizeWarehousesByDistanceResponse,
} from "./warehouse.helpers";

const DEFAULT_WAREHOUSE_ID = "main-warehouse-cumming";

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

  useEffect(() => {
    const abortController = new AbortController();

    const initializeWarehouse = async () => {
      if (hasResolvedLocation && coordinates) {
        const locationSource =
          location?.source === "storage"
            ? WAREHOUSE_RESOLUTION_SOURCES.STORED_LOCATION
            : WAREHOUSE_RESOLUTION_SOURCES.BROWSER_LOCATION;

        await Promise.all([
          resolveClosestWarehouse(coordinates, {
            signal: abortController.signal,
            source: locationSource,
          }),

          resolveWarehousesByDistance(coordinates, {
            signal: abortController.signal,
          }),
        ]);

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

  const warehouse = resolvedWarehouse;

  const customerContext = resolvedCustomerContext;

  const isUsingDefaultWarehouse =
    warehouseResolutionSource === WAREHOUSE_RESOLUTION_SOURCES.DEFAULT;

  const hasResolvedWarehouse = Boolean(warehouse);

  const isResolvingLocationOrWarehouse =
    isGeolocationLoading || isWarehouseLoading;

  const combinedWarehouseError = warehouseError || geolocationError || null;

  const reloadWarehouse = useCallback(() => {
    if (hasResolvedLocation && coordinates) {
      const locationSource =
        location?.source === "storage"
          ? WAREHOUSE_RESOLUTION_SOURCES.STORED_LOCATION
          : WAREHOUSE_RESOLUTION_SOURCES.BROWSER_LOCATION;

      return Promise.all([
        resolveClosestWarehouse(coordinates, {
          source: locationSource,
        }),

        resolveWarehousesByDistance(coordinates),
      ]);
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

      warehouseResolutionSource,
      isUsingDefaultWarehouse,

      isWarehouseLoading,
      warehouseError,

      isResolvingLocationOrWarehouse,
      combinedWarehouseError,

      hasResolvedWarehouse,

      resolveWarehouse: resolveClosestWarehouse,

      resolveClosestWarehouse,
      resolveWarehousesByDistance,
      resolveDefaultWarehouse,
      reloadWarehouse,

      customerCoordinates: coordinates,

      defaultWarehouseId: DEFAULT_WAREHOUSE_ID,
    }),
    [
      warehouse,
      customerContext,
      warehousesByDistance,
      warehouseResolutionSource,
      isUsingDefaultWarehouse,
      isWarehouseLoading,
      warehouseError,
      isResolvingLocationOrWarehouse,
      combinedWarehouseError,
      hasResolvedWarehouse,
      resolveClosestWarehouse,
      resolveWarehousesByDistance,
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
