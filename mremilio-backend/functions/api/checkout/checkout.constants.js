/* eslint-disable */

const CHECKOUT_FULFILLMENT_METHODS = Object.freeze({
  PICKUP: "pickup",
  LOCAL_DELIVERY: "local_delivery",
});

const CHECKOUT_FULFILLMENT_METHOD_VALUES = Object.freeze(
  Object.values(CHECKOUT_FULFILLMENT_METHODS)
);

const CHECKOUT_CURRENCY = "usd";

module.exports = {
  CHECKOUT_FULFILLMENT_METHODS,
  CHECKOUT_FULFILLMENT_METHOD_VALUES,
  CHECKOUT_CURRENCY,
};
