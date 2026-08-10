import { useCallback, useMemo, useState } from "react";

import { CheckoutContext } from "./checkout.context";

import {
  CHECKOUT_MODES,
  FULFILLMENT_METHODS,
  calculateLocalDeliveryFee,
  createInitialCheckoutState,
} from "./checkout.helpers";

export const CheckoutProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(createInitialCheckoutState);

  const setGuestCheckout = useCallback(() => {
    setCheckout((currentCheckout) => ({
      ...currentCheckout,
      checkoutMode: CHECKOUT_MODES.GUEST,
    }));
  }, []);

  const setAuthenticatedCheckout = useCallback(() => {
    setCheckout((currentCheckout) => ({
      ...currentCheckout,
      checkoutMode: CHECKOUT_MODES.AUTHENTICATED,
    }));
  }, []);

  const selectFulfillmentMethod = useCallback((method) => {
    if (!Object.values(FULFILLMENT_METHODS).includes(method)) {
      return;
    }

    setCheckout((currentCheckout) => ({
      ...currentCheckout,
      fulfillmentMethod: method,
    }));
  }, []);

  const selectPickupWarehouse = useCallback((warehouse) => {
    if (!warehouse) {
      return;
    }

    setCheckout((currentCheckout) => ({
      ...currentCheckout,

      pickup: {
        selectedWarehouseId:
          warehouse.id ||
          warehouse.warehouse_id ||
          warehouse.warehouseId ||
          null,

        selectedWarehouse: warehouse,
      },
    }));
  }, []);

  const updateDeliveryAddress = useCallback((address) => {
    setCheckout((currentCheckout) => ({
      ...currentCheckout,

      delivery: {
        ...currentCheckout.delivery,

        address: {
          ...currentCheckout.delivery.address,
          ...address,
        },
      },
    }));
  }, []);

  const setDeliveryDistance = useCallback((distanceMiles) => {
    const deliveryFee = calculateLocalDeliveryFee(distanceMiles);

    setCheckout((currentCheckout) => ({
      ...currentCheckout,

      delivery: {
        ...currentCheckout.delivery,

        distanceMiles,
        deliveryFee,
      },

      pricing: {
        ...currentCheckout.pricing,
        deliveryFee,
      },
    }));
  }, []);

  const updateCustomer = useCallback((customer) => {
    setCheckout((currentCheckout) => ({
      ...currentCheckout,

      customer: {
        ...currentCheckout.customer,
        ...customer,
      },
    }));
  }, []);

  const resetCheckout = useCallback(() => {
    setCheckout(createInitialCheckoutState());
  }, []);

  const value = useMemo(
    () => ({
      checkout,

      setGuestCheckout,
      setAuthenticatedCheckout,

      selectFulfillmentMethod,
      selectPickupWarehouse,

      updateDeliveryAddress,
      setDeliveryDistance,

      updateCustomer,

      resetCheckout,
    }),
    [
      checkout,
      setGuestCheckout,
      setAuthenticatedCheckout,
      selectFulfillmentMethod,
      selectPickupWarehouse,
      updateDeliveryAddress,
      setDeliveryDistance,
      updateCustomer,
      resetCheckout,
    ]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
