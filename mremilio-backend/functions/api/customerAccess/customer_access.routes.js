/* eslint-disable */

const express = require("express");

const customerAccessControllers = require("./customer_access.controllers");

const customerAccessRouter = express.Router();

const {
  CUSTOMER_ACCESS_SESSION_COOKIE_NAME,
  CUSTOMER_ACCESS_SESSION_TTL_HOURS,
} = require("./customer_access.constants");

const {
  parseCustomerAccessSessionToken,
} = require("./customer_access.handlers");

const sendErrorResponse = (res, error) => {
  const statusCode = error.statusCode || 500;

  console.error("CUSTOMER ACCESS ERROR:", error);

  return res.status(statusCode).json({
    status: "Failed",

    error: error.message || "Something went wrong",

    details: error.details || null,
  });
};

const requireCustomerAccessSession = (req, res, next) => {
  const rawCookieHeader = req.headers?.cookie || "";

  const cookies = rawCookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean);

  const sessionCookie = cookies.find((cookie) =>
    cookie.startsWith(`${CUSTOMER_ACCESS_SESSION_COOKIE_NAME}=`)
  );

  if (!sessionCookie) {
    return res.status(401).json({
      status: "Failed",

      error: "A verified customer session is required",

      details: null,
    });
  }

  const encodedToken = sessionCookie.substring(
    CUSTOMER_ACCESS_SESSION_COOKIE_NAME.length + 1
  );

  const token = decodeURIComponent(encodedToken);

  const session = parseCustomerAccessSessionToken(token);

  if (!session) {
    return res.status(401).json({
      status: "Failed",

      error: "Your customer access session is invalid or expired",

      details: null,
    });
  }

  req.customerAccess = {
    customerId: session.customerId,

    type: session.type,

    expiresAt: session.expiresAt,
  };

  return next();
};

/**
 * GET /api/customer-access/orders
 *
 * Returns orders belonging to the customer established
 * by the verified guest-access session.
 *
 * IMPORTANT:
 *
 * customerId is NEVER accepted from query params,
 * request body, or frontend state.
 */
customerAccessRouter.get(
  "/orders",

  requireCustomerAccessSession,

  async (req, res) => {
    try {
      const result = await customerAccessControllers.getCustomerOrders({
        customerId: req.customerAccess.customerId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  }
);

/**
 * POST /api/customer-access/request-code
 *
 * Starts guest access verification for My Orders.
 *
 * IMPORTANT:
 *
 * - Does not expose customerId.
 * - Does not expose whether the email belongs to a customer.
 * - Generates a short-lived verification challenge.
 * - Sends the verification code by email.
 */
customerAccessRouter.post("/request-code", async (req, res) => {
  try {
    const result = await customerAccessControllers.requestCustomerAccessCode(
      req.body
    );

    return res.status(200).json(result);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});
customerAccessRouter.post("/verify-code", async (req, res) => {
  try {
    const result = await customerAccessControllers.verifyCustomerAccessCode(
      req.body
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie(CUSTOMER_ACCESS_SESSION_COOKIE_NAME, result.sessionToken, {
      httpOnly: true,

      secure: isProduction,

      sameSite: "lax",

      maxAge: CUSTOMER_ACCESS_SESSION_TTL_HOURS * 60 * 60 * 1000,

      path: "/",
    });

    return res.status(200).json({
      status: result.status,
      expiresAt: result.expiresAt,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

module.exports = customerAccessRouter;
