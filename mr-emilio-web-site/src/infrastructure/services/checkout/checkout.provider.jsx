import { useCallback, useEffect, useMemo, useState } from "react";

import { CheckoutContext } from "./checkout.context";

import {
  CHECKOUT_MODES,
  FULFILLMENT_METHODS,
  calculateLocalDeliveryFee,
  createInitialCheckoutState,
} from "./checkout.helpers";

const CHECKOUT_STORAGE_KEY = "mr-emilio-checkout";

const readStoredCheckout = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedCheckout = window.localStorage.getItem(CHECKOUT_STORAGE_KEY);

    if (!storedCheckout) {
      return null;
    }

    const parsedCheckout = JSON.parse(storedCheckout);

    if (
      !parsedCheckout ||
      typeof parsedCheckout !== "object" ||
      Array.isArray(parsedCheckout)
    ) {
      window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);

      return null;
    }

    return parsedCheckout;
  } catch (error) {
    console.error("Unable to restore checkout state:", error);

    window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);

    return null;
  }
};

const persistCheckout = (checkout) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkout));
  } catch (error) {
    console.error("Unable to persist checkout state:", error);
  }
};

export const CheckoutProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(() => {
    const storedCheckout = readStoredCheckout();

    return storedCheckout || createInitialCheckoutState();
  });

  useEffect(() => {
    persistCheckout(checkout);
  }, [checkout]);

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

  const setLocalDeliveryQuote = useCallback((quote) => {
    if (!quote || typeof quote !== "object") {
      return;
    }

    const deliveryFeeInCents = Number(quote.deliveryFee?.amountInCents ?? 0);

    const deliveryFee = Number(quote.deliveryFee?.amount ?? 0);

    setCheckout((currentCheckout) => ({
      ...currentCheckout,

      delivery: {
        ...currentCheckout.delivery,

        resolvedAddress: quote.address?.formattedAddress || null,

        coordinates: quote.address?.coordinates || null,

        fulfillingWarehouseId: quote.warehouse?.id || null,

        fulfillingWarehouse: quote.warehouse || null,

        distanceMiles: Number.isFinite(Number(quote.distance?.miles))
          ? Number(quote.distance.miles)
          : null,

        deliveryFeeInCents: Number.isInteger(deliveryFeeInCents)
          ? deliveryFeeInCents
          : 0,

        deliveryFee: Number.isFinite(deliveryFee) ? deliveryFee : 0,

        available: quote.available === true,

        unavailableReason: quote.reason || null,
      },

      pricing: {
        ...currentCheckout.pricing,

        deliveryFee: Number.isFinite(deliveryFee) ? deliveryFee : 0,
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
      setLocalDeliveryQuote,

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
      setLocalDeliveryQuote,
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
