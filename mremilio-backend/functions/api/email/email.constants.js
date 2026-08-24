/* eslint-disable */

const EMAIL_FROM_NAME = "Mr. Emilio";

const EMAIL_TYPES = {
  CUSTOMER_ACCESS_CODE: "customer_access_code",
  ORDER_CONFIRMATION: "order_confirmation",
  PICKUP_READY: "pickup_ready",
  DELIVERY_UPDATE: "delivery_update",
};

const EMAIL_BRAND_ASSETS = Object.freeze({
  ORDER_CONFIRMATION_BANNER:
    "https://firebasestorage.googleapis.com/v0/b/mr-emilio---backend.appspot.com/o/assets%2Fconfirmation_screen_logo.png?alt=media&token=592ebf2c-c86e-40f2-8468-f28e5b188665",
});

module.exports = {
  EMAIL_FROM_NAME,
  EMAIL_TYPES,
  EMAIL_BRAND_ASSETS,
};
