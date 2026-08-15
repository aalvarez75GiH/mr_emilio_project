/* eslint-disable */

const express = require("express");

const checkoutControllers = require("./checkout.controllers");

const checkoutRouter = express.Router();

const sendErrorResponse = (res, error) => {
  const statusCode = error.statusCode || 500;

  console.error("CHECKOUT ERROR:", error);

  return res.status(statusCode).json({
    status: "Failed",

    error: error.message || "Something went wrong",

    details: error.details || null,
  });
};

/**
 * POST /api/checkout/prepare-review
 *
 * Creates an authoritative checkout
 * snapshot before the customer reaches
 * Review.
 *
 * IMPORTANT:
 *
 * - Does not charge the customer.
 * - Does not create an order.
 * - Does not decrement inventory.
 * - Does not trust browser prices.
 *
 * Stripe Tax will be added to this
 * operation next.
 */
checkoutRouter.post("/prepare-review", async (req, res) => {
  try {
    const result = await checkoutControllers.prepareReview(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});
/**
 * POST /api/checkout/place-order
 *
 * Finalizes the prepared Stripe payment.
 *
 * IMPORTANT:
 *
 * This endpoint will eventually also:
 * - revalidate checkout;
 * - create the website order;
 * - decrement inventory.
 */
checkoutRouter.post("/place-order", async (req, res) => {
  try {
    const result = await checkoutControllers.placeOrder(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

module.exports = checkoutRouter;
