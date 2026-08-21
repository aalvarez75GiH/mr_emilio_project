import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MainHeader } from "../../components/main_header/main_header.component";
import { BackHeader } from "../../components/common/back_header/back_header.component";
import { ScreenTransition } from "../../components/common/screen_transition/screen_transition.styles";
import { StoreSelectionCard } from "../../components/store_selection/store_selection_card.component";

import { useWarehouse } from "../../infrastructure/services/warehouse/use-warehouse.hook";
import { useCart } from "../../infrastructure/services/cart/use-cart.hook";

import { filterWarehouseEntriesForCart } from "../../infrastructure/services/cart/cart.helpers";

import {
  ChangeStorePage,
  ChangeStoreContainer,
  ChangeStoreHeader,
  ChangeStoreTitle,
  ChangeStoreSubtitle,
  ChangeStoreCartNotice,
  ChangeStoreCartNoticeTitle,
  ChangeStoreCartNoticeText,
  ChangeStoreList,
  ChangeStoreEmptyState,
  ChangeStoreContinueButton,
} from "./change_store.styles";

const TRANSITION_DURATION_MS = 260;

export const ChangeStore = () => {
  const navigate = useNavigate();

  const {
    warehouse,
    warehousesByDistance,
    customerCoordinates,
    resolveWarehousesByDistance,
    selectSessionWarehouse,
  } = useWarehouse();

  const { cartItems } = useCart();

  const [isChangingStore, setIsChangingStore] = useState(false);

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const effectiveSelectedWarehouseId =
    selectedWarehouseId || warehouse?.id || null;

  useEffect(() => {
    if (!customerCoordinates) {
      return undefined;
    }

    const abortController = new AbortController();

    resolveWarehousesByDistance(customerCoordinates, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, [customerCoordinates, resolveWarehousesByDistance]);

  const currentWarehouseId = warehouse?.id || null;

  const availableStoreEntries = useMemo(() => {
    return filterWarehouseEntriesForCart(warehousesByDistance, cartItems);
  }, [warehousesByDistance, cartItems]);

  const currentStoreEntry = useMemo(() => {
    if (!currentWarehouseId) {
      return null;
    }

    return (
      warehousesByDistance.find(
        (entry) => entry?.warehouse?.id === currentWarehouseId
      ) || null
    );
  }, [warehousesByDistance, currentWarehouseId]);

  const alternativeStoreEntries = useMemo(() => {
    return availableStoreEntries.filter(
      (entry) => entry?.warehouse?.id !== currentWarehouseId
    );
  }, [availableStoreEntries, currentWarehouseId]);

  const selectedStoreEntry = useMemo(() => {
    if (effectiveSelectedWarehouseId === currentWarehouseId) {
      return currentStoreEntry;
    }

    return (
      alternativeStoreEntries.find(
        (entry) => entry?.warehouse?.id === effectiveSelectedWarehouseId
      ) || null
    );
  }, [
    alternativeStoreEntries,
    currentStoreEntry,
    currentWarehouseId,
    effectiveSelectedWarehouseId,
  ]);

  const hasCart = Array.isArray(cartItems) && cartItems.length > 0;

  const hasStoreChanged =
    Boolean(effectiveSelectedWarehouseId) &&
    Boolean(currentWarehouseId) &&
    effectiveSelectedWarehouseId !== currentWarehouseId;

  const handleBack = () => {
    setTransitionState({
      isExiting: true,
      direction: "back",
    });

    window.setTimeout(() => {
      navigate(-1);
    }, TRANSITION_DURATION_MS);
  };

  const handleStoreSelection = (storeEntry) => {
    const warehouseId = storeEntry?.warehouse?.id;

    if (!warehouseId) {
      return;
    }

    setSelectedWarehouseId(warehouseId);
  };

  const handleChangeStore = () => {
    if (!selectedStoreEntry || !hasStoreChanged || isChangingStore) {
      return;
    }

    setIsChangingStore(true);

    try {
      selectSessionWarehouse(selectedStoreEntry);

      setTransitionState({
        isExiting: true,
        direction: "back",
      });

      window.setTimeout(() => {
        navigate(-1);
      }, TRANSITION_DURATION_MS);
    } catch (error) {
      console.error("Unable to change shopping store:", error);

      setIsChangingStore(false);
    }
  };

  return (
    <ScreenTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <BackHeader
        label="Back"
        ariaLabel="Return to previous screen"
        onBack={handleBack}
      />

      <ChangeStorePage>
        <ChangeStoreContainer>
          <ChangeStoreHeader>
            <ChangeStoreTitle>Change your store</ChangeStoreTitle>

            <ChangeStoreSubtitle>
              Choose the store you want to shop from.
            </ChangeStoreSubtitle>
          </ChangeStoreHeader>

          {hasCart && (
            <ChangeStoreCartNotice>
              <ChangeStoreCartNoticeTitle>
                Your cart comes with you
              </ChangeStoreCartNoticeTitle>

              <ChangeStoreCartNoticeText>
                Only stores that can fulfill all the products and quantities
                currently in your cart are shown.
              </ChangeStoreCartNoticeText>
            </ChangeStoreCartNotice>
          )}

          {currentStoreEntry || alternativeStoreEntries.length > 0 ? (
            <ChangeStoreList>
              {currentStoreEntry && (
                <StoreSelectionCard
                  storeEntry={currentStoreEntry}
                  isSelected={
                    currentWarehouseId === effectiveSelectedWarehouseId
                  }
                  isClosest={
                    warehousesByDistance[0]?.warehouse?.id ===
                    currentWarehouseId
                  }
                  sectionLabel="Current store"
                  onSelect={handleStoreSelection}
                />
              )}

              {alternativeStoreEntries.map((storeEntry, index) => {
                const store = storeEntry?.warehouse;

                if (!store?.id) {
                  return null;
                }

                return (
                  <StoreSelectionCard
                    key={store.id}
                    storeEntry={storeEntry}
                    isSelected={store.id === effectiveSelectedWarehouseId}
                    isClosest={
                      warehousesByDistance[0]?.warehouse?.id === store.id
                    }
                    sectionLabel={index === 0 ? "Other stores" : null}
                    onSelect={handleStoreSelection}
                  />
                );
              })}
            </ChangeStoreList>
          ) : (
            <ChangeStoreEmptyState>
              {hasCart
                ? "No available store can currently fulfill all the products and quantities in your cart."
                : "We could not find any available stores right now."}
            </ChangeStoreEmptyState>
          )}

          <ChangeStoreContinueButton
            type="button"
            disabled={
              !selectedStoreEntry || !hasStoreChanged || isChangingStore
            }
            onClick={handleChangeStore}
          >
            {isChangingStore
              ? "Changing store..."
              : hasStoreChanged
              ? "Change store"
              : "Current store"}
          </ChangeStoreContinueButton>
        </ChangeStoreContainer>
      </ChangeStorePage>
    </ScreenTransition>
  );
};
