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

  const selectPickupWarehouse = useCallback((storeEntry) => {
    if (!storeEntry || typeof storeEntry !== "object") {
      return;
    }

    const warehouse = storeEntry.warehouse;

    if (!warehouse || typeof warehouse !== "object") {
      return;
    }

    const customerContext =
      storeEntry.customerContext &&
      typeof storeEntry.customerContext === "object"
        ? storeEntry.customerContext
        : {};

    const distance = customerContext.distance || {};

    const pickup = customerContext.fulfillment?.pickup || {};

    const pickupDistanceWarning =
      customerContext.fulfillment?.pickupDistanceWarning || {};

    const distanceMiles = Number(distance.miles);
    const distanceMeters = Number(distance.meters);

    const preparationTimeMinutes = Number(pickup.preparationTimeMinutes);

    const warningDistanceMiles = Number(pickupDistanceWarning.distanceMiles);

    const warningThresholdMiles = Number(pickupDistanceWarning.thresholdMiles);

    setCheckout((currentCheckout) => ({
      ...currentCheckout,

      pickup: {
        selectedWarehouseId:
          warehouse.id ||
          warehouse.warehouse_id ||
          warehouse.warehouseId ||
          null,

        selectedWarehouse: warehouse,

        customerContext: {
          distance: {
            miles: Number.isFinite(distanceMiles) ? distanceMiles : null,

            meters: Number.isFinite(distanceMeters) ? distanceMeters : null,

            duration:
              typeof distance.duration === "string" ? distance.duration : null,

            source:
              typeof distance.source === "string" ? distance.source : null,
          },

          fulfillment: {
            pickup: {
              available: pickup.available === true,

              preparationTimeMinutes: Number.isInteger(preparationTimeMinutes)
                ? preparationTimeMinutes
                : null,
            },

            pickupDistanceWarning: {
              shouldDisplay: pickupDistanceWarning.shouldDisplay === true,

              reason: pickupDistanceWarning.reason || null,

              distanceMiles: Number.isFinite(warningDistanceMiles)
                ? warningDistanceMiles
                : null,

              thresholdMiles: Number.isFinite(warningThresholdMiles)
                ? warningThresholdMiles
                : null,

              messageKey: pickupDistanceWarning.messageKey || null,
            },
          },
        },
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

  const setPaymentPreparation = useCallback(
    ({ confirmationTokenId, paymentMethodType = null }) => {
      setCheckout((currentCheckout) => ({
        ...currentCheckout,

        payment: {
          ...currentCheckout.payment,

          confirmationTokenId: confirmationTokenId || null,

          paymentMethodType: paymentMethodType || null,

          preparedAt: confirmationTokenId ? new Date().toISOString() : null,
        },
      }));
    },
    []
  );

  const setReviewPreparation = useCallback((reviewResponse) => {
    if (
      !reviewResponse ||
      typeof reviewResponse !== "object" ||
      Array.isArray(reviewResponse)
    ) {
      return;
    }

    setCheckout((currentCheckout) => ({
      ...currentCheckout,

      review: {
        status: reviewResponse.status || null,

        currency: reviewResponse.currency || "usd",

        items: Array.isArray(reviewResponse.items) ? reviewResponse.items : [],

        fulfillment: reviewResponse.fulfillment || null,

        pricing: {
          subtotalInCents: Number.isInteger(
            Number(reviewResponse.pricing?.subtotalInCents)
          )
            ? Number(reviewResponse.pricing.subtotalInCents)
            : 0,

          deliveryFeeInCents: Number.isInteger(
            Number(reviewResponse.pricing?.deliveryFeeInCents)
          )
            ? Number(reviewResponse.pricing.deliveryFeeInCents)
            : 0,

          taxInCents: Number.isInteger(
            Number(reviewResponse.pricing?.taxInCents)
          )
            ? Number(reviewResponse.pricing.taxInCents)
            : 0,

          amountBeforeTaxInCents: Number.isInteger(
            Number(reviewResponse.pricing?.amountBeforeTaxInCents)
          )
            ? Number(reviewResponse.pricing.amountBeforeTaxInCents)
            : 0,

          totalInCents: Number.isInteger(
            Number(reviewResponse.pricing?.totalInCents)
          )
            ? Number(reviewResponse.pricing.totalInCents)
            : 0,
        },

        tax: {
          calculated: reviewResponse.tax?.calculated === true,

          calculationId: reviewResponse.tax?.calculationId || null,

          expiresAt: reviewResponse.tax?.expiresAt ?? null,
        },

        preparedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setCompletedOrder = useCallback((order) => {
    if (!order || typeof order !== "object" || Array.isArray(order)) {
      return;
    }

    setCheckout((currentCheckout) => ({
      ...currentCheckout,

      completedOrder: order,
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

      setPaymentPreparation,
      setReviewPreparation,
      setCompletedOrder,

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
      setPaymentPreparation,
      setReviewPreparation,
      setCompletedOrder,
      resetCheckout,
    ]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
