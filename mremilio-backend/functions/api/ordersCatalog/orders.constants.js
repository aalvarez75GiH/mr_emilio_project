/* eslint-disable */

const ORDER_STATUSES = Object.freeze({
  PAYMENT_PROCESSING: "payment_processing",
  CONFIRMED: "confirmed",
  PAYMENT_FAILED: "payment_failed",

  /**
   * Payment succeeded, but a post-payment backend operation
   * requires manual or automated recovery.
   *
   * Example:
   * - inventory could not be committed after payment.
   */
  REQUIRES_ATTENTION: "requires_attention",
});

const PAYMENT_STATUSES = Object.freeze({
  PROCESSING: "processing",
  PAID: "paid",
  FAILED: "failed",
});

const ORDER_TIMELINE_STATUSES = Object.freeze({
  ORDER_PLACED: "order_placed",
  CONFIRMED: "confirmed",
  PICKED_UP: "picked_up",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
});

const ORDER_CURRENCY = "usd";

const FULFILLMENT_VERIFICATION_STATUSES = Object.freeze({
  PENDING: "pending",
  ACTIVE: "active",
  USED: "used",
});

const FULFILLMENT_COMPLETION_METHODS = Object.freeze({
  QR_SCAN: "qr_scan",
  DELIVERY_PHOTO: "delivery_photo",
});

module.exports = {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  ORDER_CURRENCY,
  ORDER_TIMELINE_STATUSES,
  FULFILLMENT_VERIFICATION_STATUSES,
  FULFILLMENT_COMPLETION_METHODS,
};
