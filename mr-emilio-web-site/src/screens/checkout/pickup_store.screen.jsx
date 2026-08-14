import {
  FiAlertTriangle,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiNavigation,
} from "react-icons/fi";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MainHeader } from "../../components/main_header/main_header.component";

import { CheckoutBackHeader } from "../../components/layout/checkout_back_header/checkout_back_header.component";

import storeIcon from "../../assets/checkout/icons/storeIcon.svg";

import { useWarehouse } from "../../infrastructure/services/warehouse/use-warehouse.hook";

import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";

import { FULFILLMENT_METHODS } from "../../infrastructure/services/checkout/checkout.helpers";

import {
  PickupStoreTransition,
  PickupStorePage,
  PickupStoreContainer,
  PickupStoreHeader,
  PickupStoreTitle,
  PickupStoreSubtitle,
  StoreSection,
  StoreSectionLabel,
  StoreCard,
  StoreCardLayout,
  StoreIconColumn,
  StoreIconContainer,
  StoreIconImage,
  StoreMainContent,
  StoreSelectionColumn,
  StoreCardHeader,
  StoreRadio,
  StoreInformation,
  StoreName,
  StoreRecommendedBadge,
  StoreAddress,
  StoreMeta,
  StoreMetaItem,
  StoreDistanceWarning,
  StoreDistanceWarningIcon,
  StoreDistanceWarningContent,
  StoreDistanceWarningTitle,
  StoreDistanceWarningText,
  StoreHours,
  StoreHoursIcon,
  StoreHoursContent,
  StoreHoursLabel,
  StoreHoursValue,
  PickupStoreEmptyState,
  PickupStoreContinueButton,
} from "./pickup_store.styles";

const TRANSITION_DURATION_MS = 260;

export const PickupStore = () => {
  const navigate = useNavigate();

  const {
    warehouse,
    customerContext,

    pickupWarehousesByDrivingDistance,
    isPickupWarehousesLoading,
    pickupWarehousesError,

    customerCoordinates,

    resolvePickupWarehousesByDrivingDistance,
  } = useWarehouse();

  const { checkout, selectFulfillmentMethod, selectPickupWarehouse } =
    useCheckout();

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  /**
   * This screen represents the Pickup fulfillment path.
   */
  useEffect(() => {
    if (checkout.fulfillmentMethod !== FULFILLMENT_METHODS.PICKUP) {
      selectFulfillmentMethod(FULFILLMENT_METHODS.PICKUP);
    }
  }, [checkout.fulfillmentMethod, selectFulfillmentMethod]);

  /**
   * Driving distance is customer-facing pickup information.
   *
   * We intentionally request it only when this screen mounts
   * instead of during the global WarehouseProvider initialization.
   */
  useEffect(() => {
    if (!customerCoordinates) {
      return undefined;
    }

    const abortController = new AbortController();

    resolvePickupWarehousesByDrivingDistance(customerCoordinates, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, [customerCoordinates, resolvePickupWarehousesByDrivingDistance]);

  /**
   * Google Routes results are authoritative for the pickup
   * store list whenever customer coordinates are available.
   */
  const pickupStores = useMemo(() => {
    if (!Array.isArray(pickupWarehousesByDrivingDistance)) {
      return [];
    }

    return pickupWarehousesByDrivingDistance.filter(
      (entry) => entry?.customerContext?.fulfillment?.pickup?.available === true
    );
  }, [pickupWarehousesByDrivingDistance]);

  /**
   * Fallback is only intended for customers whose location
   * could not be resolved.
   *
   * We do not use this fallback while Google Routes is loading,
   * otherwise the screen could temporarily show the old
   * Haversine/default warehouse result as if it were the final
   * pickup-store ordering.
   */
  const fallbackStore = useMemo(() => {
    if (customerCoordinates) {
      return null;
    }

    if (!warehouse) {
      return null;
    }

    if (customerContext?.fulfillment?.pickup?.available !== true) {
      return null;
    }

    return {
      warehouse,
      customerContext,
    };
  }, [customerCoordinates, warehouse, customerContext]);

  const stores = useMemo(() => {
    if (customerCoordinates) {
      return pickupStores;
    }

    return fallbackStore ? [fallbackStore] : [];
  }, [customerCoordinates, pickupStores, fallbackStore]);

  const selectedWarehouseId = checkout.pickup.selectedWarehouseId;

  console.log("warehouse", warehouse);

  const navigateWithTransition = (path, direction) => {
    setTransitionState({
      isExiting: true,
      direction,
    });

    window.setTimeout(() => {
      navigate(path);
    }, TRANSITION_DURATION_MS);
  };

  const handleBack = () => {
    navigateWithTransition("/checkout/delivery", "back");
  };

  const handleStoreSelection = (storeEntry) => {
    selectFulfillmentMethod(FULFILLMENT_METHODS.PICKUP);

    selectPickupWarehouse(storeEntry);
  };

  const handleContinue = () => {
    if (!checkout.pickup.selectedWarehouseId) {
      return;
    }

    navigateWithTransition("/checkout/information", "forward");
  };

  const isLoadingPickupStores =
    Boolean(customerCoordinates) && isPickupWarehousesLoading;

  return (
    <PickupStoreTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <CheckoutBackHeader
        label="Delivery type"
        ariaLabel="Return to delivery options"
        onBack={handleBack}
      />

      <PickupStorePage>
        <PickupStoreContainer>
          <PickupStoreHeader>
            <PickupStoreTitle>Select a Store</PickupStoreTitle>

            <PickupStoreSubtitle>
              Choose the location most convenient for you.
            </PickupStoreSubtitle>
          </PickupStoreHeader>

          {isLoadingPickupStores ? (
            <PickupStoreEmptyState>
              Finding stores near you...
            </PickupStoreEmptyState>
          ) : pickupWarehousesError &&
            customerCoordinates &&
            stores.length === 0 ? (
            <PickupStoreEmptyState>
              We could not calculate pickup store distances right now. Please
              try again.
            </PickupStoreEmptyState>
          ) : stores.length === 0 ? (
            <PickupStoreEmptyState>
              We could not find a store currently available for pickup.
            </PickupStoreEmptyState>
          ) : (
            <>
              {stores.map((storeEntry, index) => {
                const store = storeEntry.warehouse;

                const distanceMiles =
                  storeEntry.customerContext?.distance?.miles;

                const pickupDistanceWarning =
                  storeEntry.customerContext?.fulfillment
                    ?.pickupDistanceWarning;

                const shouldShowDistanceWarning =
                  pickupDistanceWarning?.shouldDisplay === true;

                const openingTime = store.warehouse_information?.opening_time;

                const closingTime = store.warehouse_information?.closing_time;

                const isSelected = selectedWarehouseId === store.id;

                const isClosest = index === 0;

                const normalizedDistanceMiles = Number(distanceMiles);

                const hasValidDistance = Number.isFinite(
                  normalizedDistanceMiles
                );

                const distanceLabel = hasValidDistance
                  ? `${normalizedDistanceMiles.toFixed(1)} miles away`
                  : null;

                const cardAriaLabel = [
                  store.warehouse_name,
                  store.physical_address,
                  distanceLabel,
                  shouldShowDistanceWarning
                    ? "This store is farther than the recommended pickup distance."
                    : null,
                  isSelected ? "Selected" : "Not selected",
                ]
                  .filter(Boolean)
                  .join(". ");

                return (
                  <StoreSection key={store.id}>
                    {index === 0 && (
                      <StoreSectionLabel>Closest store</StoreSectionLabel>
                    )}

                    {index === 1 && (
                      <StoreSectionLabel>Other stores</StoreSectionLabel>
                    )}

                    <StoreCard
                      type="button"
                      $selected={isSelected}
                      aria-pressed={isSelected}
                      aria-label={cardAriaLabel}
                      onClick={() => handleStoreSelection(storeEntry)}
                    >
                      <StoreCardLayout>
                        <StoreIconColumn>
                          <StoreIconContainer>
                            <StoreIconImage
                              src={storeIcon}
                              alt=""
                              aria-hidden="true"
                            />
                          </StoreIconContainer>
                        </StoreIconColumn>

                        <StoreMainContent>
                          <StoreCardHeader>
                            <StoreInformation>
                              <StoreName>{store.warehouse_name}</StoreName>

                              {isClosest && (
                                <StoreRecommendedBadge>
                                  Closest to you
                                </StoreRecommendedBadge>
                              )}
                            </StoreInformation>
                          </StoreCardHeader>

                          <StoreAddress>
                            <FiMapPin aria-hidden="true" />

                            <span>{store.physical_address}</span>
                          </StoreAddress>

                          {hasValidDistance && (
                            <StoreMeta>
                              <StoreMetaItem>
                                <FiNavigation aria-hidden="true" />
                                {normalizedDistanceMiles.toFixed(1)} miles away
                              </StoreMetaItem>
                            </StoreMeta>
                          )}
                          {shouldShowDistanceWarning && (
                            <StoreDistanceWarning>
                              <StoreDistanceWarningIcon aria-hidden="true">
                                <FiAlertTriangle />
                              </StoreDistanceWarningIcon>

                              <StoreDistanceWarningContent>
                                <StoreDistanceWarningTitle>
                                  This store is farther away
                                </StoreDistanceWarningTitle>

                                <StoreDistanceWarningText>
                                  Take into consideration that this store is{" "}
                                  {normalizedDistanceMiles.toFixed(1)} miles
                                  away! You can still choose this store, up to
                                  you.
                                </StoreDistanceWarningText>
                              </StoreDistanceWarningContent>
                            </StoreDistanceWarning>
                          )}

                          {(openingTime || closingTime) && (
                            <StoreHours>
                              <StoreHoursIcon aria-hidden="true">
                                <FiClock />
                              </StoreHoursIcon>

                              <StoreHoursContent>
                                <StoreHoursLabel>Pickup hours</StoreHoursLabel>

                                <StoreHoursValue>
                                  {openingTime || "Opening time unavailable"}

                                  {openingTime && closingTime ? " – " : ""}

                                  {closingTime || "Closing time unavailable"}
                                </StoreHoursValue>
                              </StoreHoursContent>
                            </StoreHours>
                          )}
                        </StoreMainContent>

                        <StoreSelectionColumn>
                          <StoreRadio
                            $selected={isSelected}
                            aria-hidden="true"
                          />
                        </StoreSelectionColumn>
                      </StoreCardLayout>
                    </StoreCard>
                  </StoreSection>
                );
              })}

              <PickupStoreContinueButton
                type="button"
                disabled={!selectedWarehouseId}
                onClick={handleContinue}
              >
                Continue
                <FiChevronRight />
              </PickupStoreContinueButton>
            </>
          )}
        </PickupStoreContainer>
      </PickupStorePage>
    </PickupStoreTransition>
  );
};
