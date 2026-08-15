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
