import { FiChevronRight } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ScreenTransition } from "../../components/common/screen_transition/screen_transition.styles";
import { MainHeader } from "../../components/main_header/main_header.component";
import { BackHeader } from "../../components/common/back_header/back_header.component";
import { FULFILLMENT_METHODS } from "../../infrastructure/services/checkout/checkout.helpers";

import {
  PickupStorePage,
  PickupStoreContainer,
  PickupStoreHeader,
  PickupStoreTitle,
  PickupStoreSubtitle,
  PickupStoreEmptyState,
  PickupStoreContinueButton,
} from "./pickup_store.styles";
import { StoreSelectionCard } from "../../components/store_selection/store_selection_card.component";
import { filterWarehouseEntriesForCart } from "../../infrastructure/services/cart/cart.helpers";

import { useWarehouse } from "../../infrastructure/services/warehouse/use-warehouse.hook";
import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";
import { useCart } from "../../infrastructure/services/cart/use-cart.hook";

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
    selectSessionWarehouse,
  } = useWarehouse();

  const { checkout, selectFulfillmentMethod, selectPickupWarehouse } =
    useCheckout();

  const { cartItems } = useCart();

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

    const pickupAvailableStores = pickupWarehousesByDrivingDistance.filter(
      (entry) => entry?.customerContext?.fulfillment?.pickup?.available === true
    );

    return filterWarehouseEntriesForCart(pickupAvailableStores, cartItems);
  }, [pickupWarehousesByDrivingDistance, cartItems]);

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

    const candidateStore = {
      warehouse,
      customerContext,
    };

    const eligibleStores = filterWarehouseEntriesForCart(
      [candidateStore],
      cartItems
    );

    return eligibleStores[0] || null;
  }, [customerCoordinates, warehouse, customerContext, cartItems]);

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
    if (!storeEntry?.warehouse?.id) {
      return;
    }

    selectSessionWarehouse(storeEntry);

    selectFulfillmentMethod(FULFILLMENT_METHODS.PICKUP);

    selectPickupWarehouse(storeEntry);
  };
  // const handleStoreSelection = (storeEntry) => {
  //   selectFulfillmentMethod(FULFILLMENT_METHODS.PICKUP);

  //   selectPickupWarehouse(storeEntry);
  // };

  const handleContinue = () => {
    if (!checkout.pickup.selectedWarehouseId) {
      return;
    }

    navigateWithTransition("/checkout/information", "forward");
  };

  const isLoadingPickupStores =
    Boolean(customerCoordinates) && isPickupWarehousesLoading;

  return (
    <ScreenTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <BackHeader
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

                const isSelected = selectedWarehouseId === store.id;

                const isClosest = index === 0;

                const sectionLabel =
                  index === 0
                    ? "Closest store"
                    : index === 1
                    ? "Other stores"
                    : null;

                return (
                  <StoreSelectionCard
                    key={store.id}
                    storeEntry={storeEntry}
                    isSelected={isSelected}
                    isClosest={isClosest}
                    sectionLabel={sectionLabel}
                    onSelect={handleStoreSelection}
                  />
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
    </ScreenTransition>
  );
};
