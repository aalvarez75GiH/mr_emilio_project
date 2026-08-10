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
  },

  delivery: {
    address: {
      street: "",
      unit: "",
      city: "",
      state: "",
      postalCode: "",
    },

    distanceMiles: null,
    deliveryFee: 0,
  },

  pricing: {
    subtotal: 0,
    deliveryFee: 0,
    tax: 0,
    total: 0,
  },

  payment: null,
});
