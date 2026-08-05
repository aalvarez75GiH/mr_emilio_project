import { useMemo } from "react";

import { useGeolocation } from "../../../infrastructure/services/geolocation/se-geolocation.hook";
import { useWarehouse } from "../../../infrastructure/services/warehouse/se-warehouse.hook";

import {
  ShoppingContextSection,
  ShoppingContextContainer,
  LocationIconWrapper,
  ShoppingContextContent,
  ShoppingContextEyebrow,
  WarehouseInformation,
  WarehouseName,
  WarehouseLocation,
  WarehouseStatusList,
  WarehouseStatusItem,
  WarehouseStatusDot,
  ShoppingContextMessage,
  ShoppingContextAction,
  ShoppingContextActionLabel,
  ShoppingContextError,
} from "./shopping_context.styles";

const LocationPinIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 10C20 15.25 12 22 12 22C12 22 4 15.25 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
};

const ArrowIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const getAddressComponent = (warehouse, componentType) => {
  const addressComponents = warehouse?.geo?.address_components;

  if (!Array.isArray(addressComponents)) {
    return "";
  }

  const matchingComponent = addressComponents.find((component) =>
    component?.types?.includes(componentType)
  );

  return matchingComponent?.short_name || matchingComponent?.long_name || "";
};

const getWarehouseLocationLabel = (warehouse) => {
  const city = getAddressComponent(warehouse, "locality");

  const state = getAddressComponent(warehouse, "administrative_area_level_1");

  if (city && state) {
    return `${city}, ${state}`;
  }

  if (city) {
    return city;
  }

  return warehouse?.geo?.formatted_address || warehouse?.physical_address || "";
};

export const ShoppingContext = () => {
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

  const warehouseLocation = useMemo(
    () => getWarehouseLocationLabel(warehouse),
    [warehouse]
  );

  const distanceMiles = customerContext?.distance?.miles;

  const pickupAvailable =
    customerContext?.fulfillment?.pickup?.available === true;

  const localDeliveryAvailable =
    customerContext?.fulfillment?.localDelivery?.available === true;

  const localDeliveryReason =
    customerContext?.fulfillment?.localDelivery?.reason;

  const isLoading = isWarehouseLoading || isGeolocationLoading;

  const locationWasDenied = permissionStatus === "denied";

  const handleLocationRequest = async () => {
    await requestCurrentLocation();
  };

  if (!warehouse && isWarehouseLoading) {
    return null;
  }

  if (!warehouse) {
    return null;
  }

  return (
    <ShoppingContextSection>
      <ShoppingContextContainer>
        <LocationIconWrapper>
          <LocationPinIcon />
        </LocationIconWrapper>

        <ShoppingContextContent>
          <ShoppingContextEyebrow>Your Store</ShoppingContextEyebrow>

          <WarehouseInformation>
            <WarehouseName>{warehouse.warehouse_name}</WarehouseName>

            {warehouseLocation && (
              <WarehouseLocation>
                {warehouseLocation}

                {Number.isFinite(distanceMiles) &&
                  ` · ${distanceMiles.toFixed(1)} miles away`}
              </WarehouseLocation>
            )}
          </WarehouseInformation>

          {!isUsingDefaultWarehouse && (
            <WarehouseStatusList>
              <WarehouseStatusItem>
                <WarehouseStatusDot $available={pickupAvailable} />

                {pickupAvailable ? "Pickup available" : "Pickup unavailable"}
              </WarehouseStatusItem>

              <WarehouseStatusItem>
                <WarehouseStatusDot $available={localDeliveryAvailable} />

                {localDeliveryAvailable
                  ? "Local delivery available"
                  : localDeliveryReason === "OUTSIDE_DELIVERY_RADIUS"
                  ? "Outside local delivery area"
                  : "Local delivery unavailable"}
              </WarehouseStatusItem>
            </WarehouseStatusList>
          )}

          <ShoppingContextMessage>
            {isUsingDefaultWarehouse
              ? "Showing inventory and prices from our main location. Use your location to find a closer pickup location and check local delivery."
              : "Inventory, prices, pickup and delivery options are based on this location."}
          </ShoppingContextMessage>

          {(warehouseError || geolocationError) && (
            <ShoppingContextError role="status">
              {locationWasDenied
                ? "Location access was blocked. You can continue shopping from our main location."
                : "We could not update your location. You can continue shopping from the current store."}
            </ShoppingContextError>
          )}
        </ShoppingContextContent>

        <ShoppingContextAction
          type="button"
          onClick={handleLocationRequest}
          disabled={isLoading}
        >
          <ShoppingContextActionLabel>
            {isLoading
              ? "Finding your store..."
              : isUsingDefaultWarehouse
              ? "Use my location"
              : "Update location"}
          </ShoppingContextActionLabel>

          {!isLoading && <ArrowIcon />}
        </ShoppingContextAction>
      </ShoppingContextContainer>
    </ShoppingContextSection>
  );
};
