import { useEffect, useMemo, useRef, useState } from "react";

import { useGeolocation } from "../../../infrastructure/services/geolocation/use-geolocation.hook";
import { useWarehouse } from "../../../infrastructure/services/warehouse/use-warehouse.hook";

import { GEOLOCATION_ERROR_CODES } from "../../../infrastructure/services/geolocation/geolocation.helpers";

import { LocationSelectorBanner } from "./location_selector_banner";

import {
  LOCATION_SELECTOR_VARIANTS,
  getWarehouseLocationLabel,
} from "./location_selector.helpers";

import {
  LocationSelectorSection,
  LocationSelectorSectionInner,
} from "./location_selector.styles";

const LOADING_INDICATOR_DELAY_MS = 250;

export const LocationSelector = ({
  variant = LOCATION_SELECTOR_VARIANTS.BANNER,
}) => {
  const {
    warehouse,
    customerContext,
    isUsingDefaultWarehouse,
    isWarehouseLoading,
    warehouseError,
  } = useWarehouse();

  const {
    requestCurrentLocation,
    isGeolocationLoading,
    geolocationError,
    permissionStatus,
  } = useGeolocation();

  const [buttonState, setButtonState] = useState("idle");

  const previousLoading = useRef(false);

  const warehouseLocation = useMemo(
    () => getWarehouseLocationLabel(warehouse),
    [warehouse]
  );

  const distanceMiles = customerContext?.distance?.miles;

  const isLoading = isWarehouseLoading || isGeolocationLoading;

  const locationWasDenied = permissionStatus === "denied";

  useEffect(() => {
    let loadingTimeoutId;
    let successStartTimeoutId;
    let successEndTimeoutId;

    if (isLoading) {
      loadingTimeoutId = window.setTimeout(() => {
        setButtonState("loading");
      }, LOADING_INDICATOR_DELAY_MS);
    }

    if (previousLoading.current && !isLoading) {
      successStartTimeoutId = window.setTimeout(() => {
        setButtonState("success");

        successEndTimeoutId = window.setTimeout(() => {
          setButtonState("idle");
        }, 1100);
      }, 0);
    }

    previousLoading.current = isLoading;

    return () => {
      window.clearTimeout(loadingTimeoutId);
      window.clearTimeout(successStartTimeoutId);
      window.clearTimeout(successEndTimeoutId);
    };
  }, [isLoading]);

  const errorMessage = useMemo(() => {
    if (!warehouseError && !geolocationError) {
      return "";
    }

    if (
      geolocationError?.code === GEOLOCATION_ERROR_CODES.SECURE_CONTEXT_REQUIRED
    ) {
      return "";
    }

    if (locationWasDenied) {
      return "Location access was blocked. You can continue shopping from the current store.";
    }

    return "We could not update your location. You can continue shopping from the current store.";
  }, [warehouseError, geolocationError, locationWasDenied]);

  const message = isUsingDefaultWarehouse
    ? "Showing products available from this store. Use your location to check for a closer pickup location and local delivery."
    : "Products, pickup and delivery options are based on this store.";

  const actionLabel = isUsingDefaultWarehouse
    ? "Use my location"
    : "Update location";

  const handleLocationRequest = async () => {
    if (typeof window !== "undefined" && window.isSecureContext !== true) {
      console.info(
        "Geolocation was not requested because this page is not using HTTPS."
      );

      return;
    }

    setButtonState("idle");

    await requestCurrentLocation();
  };

  if (!warehouse) {
    return null;
  }

  if (variant === LOCATION_SELECTOR_VARIANTS.BANNER) {
    return (
      <LocationSelectorSection>
        <LocationSelectorSectionInner>
          <LocationSelectorBanner
            warehouseName={warehouse.warehouse_name}
            warehouseLocation={warehouseLocation}
            distanceMiles={distanceMiles}
            isUsingDefaultWarehouse={isUsingDefaultWarehouse}
            isLoading={isLoading}
            buttonState={buttonState}
            actionLabel={actionLabel}
            message={message}
            errorMessage={errorMessage}
            onAction={handleLocationRequest}
          />
        </LocationSelectorSectionInner>
      </LocationSelectorSection>
    );
  }

  return null;
};
