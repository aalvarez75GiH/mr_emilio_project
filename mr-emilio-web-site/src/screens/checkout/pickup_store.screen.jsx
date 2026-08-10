import {
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
  StoreHours,
  StoreHoursIcon,
  StoreHoursContent,
  StoreHoursLabel,
  StoreHoursValue,
  PickupStoreEmptyState,
  PickupStoreContinueButton,
} from "./pickup_store.styles";

const TRANSITION_DURATION_MS = 260;
import { FULFILLMENT_METHODS } from "../../infrastructure/services/checkout/checkout.helpers";

export const PickupStore = () => {
  const navigate = useNavigate();

  const {
    warehouse,
    customerContext,
    warehousesByDistance,
    isWarehouseLoading,
  } = useWarehouse();

  const { checkout, selectFulfillmentMethod, selectPickupWarehouse } =
    useCheckout();

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });
  useEffect(() => {
    if (checkout.fulfillmentMethod !== FULFILLMENT_METHODS.PICKUP) {
      selectFulfillmentMethod(FULFILLMENT_METHODS.PICKUP);
    }
  }, [checkout.fulfillmentMethod, selectFulfillmentMethod]);

  const pickupStores = useMemo(() => {
    return warehousesByDistance.filter(
      (entry) => entry.customerContext?.fulfillment?.pickup?.available === true
    );
  }, [warehousesByDistance]);

  const fallbackStore = useMemo(() => {
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
  }, [warehouse, customerContext]);

  const stores =
    pickupStores.length > 0
      ? pickupStores
      : fallbackStore
      ? [fallbackStore]
      : [];

  const selectedWarehouseId = checkout.pickup.selectedWarehouseId;

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
    selectPickupWarehouse(storeEntry.warehouse);
  };

  const handleContinue = () => {
    if (!checkout.pickup.selectedWarehouseId) {
      return;
    }

    navigateWithTransition("/checkout/information", "forward");
  };

  return (
    <PickupStoreTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <CheckoutBackHeader
        label="Delivery"
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

          {isWarehouseLoading && stores.length === 0 ? (
            <PickupStoreEmptyState>
              Finding stores near you...
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

                const openingTime = store.warehouse_information?.opening_time;

                const closingTime = store.warehouse_information?.closing_time;

                const isSelected = selectedWarehouseId === store.id;

                const isClosest = index === 0;

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
                                  Recommended
                                </StoreRecommendedBadge>
                              )}
                            </StoreInformation>
                          </StoreCardHeader>

                          <StoreAddress>
                            <FiMapPin aria-hidden="true" />

                            <span>{store.physical_address}</span>
                          </StoreAddress>

                          {Number.isFinite(Number(distanceMiles)) && (
                            <StoreMeta>
                              <StoreMetaItem>
                                <FiNavigation aria-hidden="true" />
                                {Number(distanceMiles).toFixed(1)} miles away
                              </StoreMetaItem>
                            </StoreMeta>
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
