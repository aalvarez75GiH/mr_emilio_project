/* eslint-disable */

const express = require("express");

const ordersControllers = require("./orders.controllers");

const ordersCatalogRouter = express.Router();

const sendErrorResponse = (res, error) => {
  const statusCode = error.statusCode || 500;

  console.error("ORDERS CATALOG ERROR:", error);

  return res.status(statusCode).json({
    status: "Failed",

    error: error.message || "Something went wrong",

    details: error.details || null,
  });
};

const requireOrderStatusTestingAccess = (req, res, next) => {
  /**
   * Firebase Functions emulator:
   *
   * Allow Postman testing without an API key.
   */
  if (process.env.FUNCTIONS_EMULATOR === "true") {
    return next();
  }

  /**
   * Remote Firebase environment:
   *
   * Until the admin application/authentication exists,
   * require a temporary secret.
   */
  const configuredTestKey = process.env.ORDER_STATUS_TEST_KEY;

  const providedTestKey = req.headers["x-order-status-test-key"];

  if (
    !configuredTestKey ||
    typeof providedTestKey !== "string" ||
    providedTestKey !== configuredTestKey
  ) {
    return res.status(403).json({
      status: "Failed",

      error: "Order status modification is not authorized",

      details: null,
    });
  }

  return next();
};

ordersCatalogRouter.post(
  "/verify-fulfillment",

  requireOrderStatusTestingAccess,

  async (req, res) => {
    try {
      const result = await ordersControllers.completeOrderWithQr({
        credential: req.body?.credential,
      });

      return res.status(200).json(result);
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  }
);

ordersCatalogRouter.post(
  "/:id/status",

  requireOrderStatusTestingAccess,

  async (req, res) => {
    try {
      const order = await ordersControllers.updateOrderStatus({
        orderId: req.params.id,

        status: req.body?.status,
      });

      return res.status(200).json({
        status: "success",

        order,
      });
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  }
);

ordersCatalogRouter.get("/:id", async (req, res) => {
  try {
    const order = await ordersControllers.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: "Failed",
        error: "Order was not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

module.exports = ordersCatalogRouter;
