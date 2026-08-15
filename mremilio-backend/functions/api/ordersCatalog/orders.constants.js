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

const ORDER_CURRENCY = "usd";

module.exports = {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  ORDER_CURRENCY,
};
