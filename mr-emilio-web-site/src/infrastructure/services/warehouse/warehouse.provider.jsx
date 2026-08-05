import { useCallback, useEffect, useMemo, useState } from "react";

import { WarehouseContext } from "./warehouse.context";

import { useGeolocation } from "../geolocation/se-geolocation.hook";

import { getClosestWarehouseRequest } from "./warehouse.requests";

import { normalizeClosestWarehouseResponse } from "./warehouse.helpers";

const isCanceledRequest = (error) =>
  error?.name === "CanceledError" ||
  error?.name === "AbortError" ||
  error?.code === "ERR_CANCELED";

export const WarehouseProvider = ({ children }) => {
  const {
    coordinates,
    hasResolvedLocation,
    isGeolocationLoading,
    geolocationError,
  } = useGeolocation();

  console.log(
    ` WarehouseProvider: coordinates=${JSON.stringify(
      coordinates
    )}, hasResolvedLocation=${hasResolvedLocation}, isGeolocationLoading=${isGeolocationLoading}, geolocationError=${geolocationError}`
  );
  const [resolvedWarehouse, setResolvedWarehouse] = useState(null);

  const [resolvedCustomerContext, setResolvedCustomerContext] = useState(null);

  const [isWarehouseLoading, setIsWarehouseLoading] = useState(false);

  const [warehouseError, setWarehouseError] = useState(null);

  const resolveWarehouse = useCallback(
    async (nextCoordinates, { signal } = {}) => {
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

        return normalizedResponse;
      } catch (requestError) {
        if (signal?.aborted || isCanceledRequest(requestError)) {
          return null;
        }

        console.error("Error resolving closest warehouse:", requestError);

        setResolvedWarehouse(null);
        setResolvedCustomerContext(null);
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

  useEffect(() => {
    if (!hasResolvedLocation || !coordinates) {
      return undefined;
    }

    const abortController = new AbortController();

    const resolveCurrentWarehouse = async () => {
      await resolveWarehouse(coordinates, {
        signal: abortController.signal,
      });
    };

    resolveCurrentWarehouse();

    return () => {
      abortController.abort();
    };
  }, [coordinates, hasResolvedLocation, resolveWarehouse]);

  /*
   * Do not expose a previously resolved warehouse when
   * the customer no longer has a resolved location.
   *
   * These values are derived instead of being cleared
   * synchronously inside the effect.
   */
  const warehouse = hasResolvedLocation ? resolvedWarehouse : null;

  const customerContext = hasResolvedLocation ? resolvedCustomerContext : null;

  const effectiveWarehouseError = hasResolvedLocation ? warehouseError : null;

  const effectiveWarehouseLoading = hasResolvedLocation
    ? isWarehouseLoading
    : false;

  const isResolvingLocationOrWarehouse =
    isGeolocationLoading || effectiveWarehouseLoading;

  const combinedWarehouseError =
    effectiveWarehouseError || geolocationError || null;

  const hasResolvedWarehouse = Boolean(warehouse);

  const reloadWarehouse = useCallback(() => {
    if (!coordinates) {
      return Promise.resolve(null);
    }

    return resolveWarehouse(coordinates);
  }, [coordinates, resolveWarehouse]);

  const contextValue = useMemo(
    () => ({
      warehouse,
      customerContext,

      isWarehouseLoading: effectiveWarehouseLoading,

      warehouseError: effectiveWarehouseError,

      isResolvingLocationOrWarehouse,
      combinedWarehouseError,

      hasResolvedWarehouse,

      resolveWarehouse,
      reloadWarehouse,

      customerCoordinates: coordinates,
    }),
    [
      warehouse,
      customerContext,
      effectiveWarehouseLoading,
      effectiveWarehouseError,
      isResolvingLocationOrWarehouse,
      combinedWarehouseError,
      hasResolvedWarehouse,
      resolveWarehouse,
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
