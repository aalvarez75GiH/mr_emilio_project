export const CHECKOUT_MODES = Object.freeze({
  GUEST: "guest",
  AUTHENTICATED: "authenticated",
});

export const FULFILLMENT_METHODS = Object.freeze({
  PICKUP: "pickup",
  LOCAL_DELIVERY: "local_delivery",
});

export const DELIVERY_PRICE_PER_MILE = 1;

export const calculateLocalDeliveryFee = (distanceMiles) => {
  const normalizedDistance = Number(distanceMiles);

  if (!Number.isFinite(normalizedDistance) || normalizedDistance <= 0) {
    return 0;
  }

  return Number((normalizedDistance * DELIVERY_PRICE_PER_MILE).toFixed(2));
};

export const createInitialCheckoutState = () => ({
  checkoutMode: null,

  customer: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },

  fulfillmentMethod: null,

  pickup: {
    selectedWarehouseId: null,
    selectedWarehouse: null,

    customerContext: {
      distance: {
        miles: null,
        meters: null,
        duration: null,
        source: null,
      },

      fulfillment: {
        pickup: {
          available: null,
          preparationTimeMinutes: null,
        },

        pickupDistanceWarning: {
          shouldDisplay: false,
          reason: null,
          distanceMiles: null,
          thresholdMiles: null,
          messageKey: null,
        },
      },
    },
  },

  delivery: {
    address: {
      street: "",
      unit: "",
      city: "",
      state: "",
      postalCode: "",
    },

    resolvedAddress: null,

    coordinates: null,

    fulfillingWarehouseId: null,
    fulfillingWarehouse: null,

    distanceMiles: null,

    deliveryFeeInCents: 0,
    deliveryFee: 0,

    available: null,
    unavailableReason: null,
  },

  pricing: {
    subtotal: 0,
    deliveryFee: 0,
    tax: 0,
    total: 0,
  },

  payment: null,
});

export const buildDeliveryAddressString = (address = {}) => {
  const street =
    typeof address.street === "string" ? address.street.trim() : "";

  const unit = typeof address.unit === "string" ? address.unit.trim() : "";

  const city = typeof address.city === "string" ? address.city.trim() : "";

  const state =
    typeof address.state === "string" ? address.state.trim().toUpperCase() : "";

  const postalCode =
    typeof address.postalCode === "string" ? address.postalCode.trim() : "";

  return [street, unit, city, state, postalCode].filter(Boolean).join(", ");
};
