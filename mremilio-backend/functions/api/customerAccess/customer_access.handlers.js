/* eslint-disable */

const crypto = require("crypto");

const {
  CUSTOMER_ACCESS_CODE_LENGTH,
  CUSTOMER_ACCESS_CODE_TTL_MINUTES,
  CUSTOMER_ACCESS_SESSION_TTL_HOURS,
  CUSTOMER_ACCESS_SESSION_TYPE,
} = require("./customer_access.constants");

const createCustomerAccessError = (
  message,
  statusCode = 500,
  details = null
) => {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.details = details;

  return error;
};

const normalizeEmail = (email) => {
  if (typeof email !== "string") {
    return "";
  }

  return email.trim().toLowerCase();
};

const validateEmail = (email) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throw createCustomerAccessError("Email is required", 400);
  }

  return normalizedEmail;
};

const createVerificationCode = () => {
  const minimum = 10 ** (CUSTOMER_ACCESS_CODE_LENGTH - 1);

  const maximum = 10 ** CUSTOMER_ACCESS_CODE_LENGTH;

  return String(crypto.randomInt(minimum, maximum));
};

const createVerificationCodeHash = (code) => {
  return crypto.createHash("sha256").update(String(code)).digest("hex");
};

const verifyVerificationCode = ({ code, codeHash }) => {
  if (typeof code !== "string" || typeof codeHash !== "string") {
    return false;
  }

  const submittedHash = createVerificationCodeHash(code.trim());

  const submittedBuffer = Buffer.from(submittedHash, "hex");

  const storedBuffer = Buffer.from(codeHash, "hex");

  if (submittedBuffer.length !== storedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(submittedBuffer, storedBuffer);
};

const createChallengeExpiration = () => {
  const expiresAt = new Date(
    Date.now() + CUSTOMER_ACCESS_CODE_TTL_MINUTES * 60 * 1000
  );

  return expiresAt.toISOString();
};

const createCustomerAccessSessionToken = ({ customerId }) => {
  if (typeof customerId !== "string" || !customerId.trim()) {
    throw createCustomerAccessError(
      "Customer id is required to create an access session",
      500
    );
  }

  const sessionSecret = process.env.CUSTOMER_ACCESS_SESSION_SECRET;

  if (!sessionSecret) {
    throw createCustomerAccessError(
      "Customer access session secret is not configured",
      500
    );
  }

  const expiresAt = new Date(
    Date.now() + CUSTOMER_ACCESS_SESSION_TTL_HOURS * 60 * 60 * 1000
  ).toISOString();

  const payload = {
    customerId: customerId.trim(),
    type: CUSTOMER_ACCESS_SESSION_TYPE,
    expiresAt,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );

  const signature = crypto
    .createHmac("sha256", sessionSecret)
    .update(encodedPayload)
    .digest("base64url");

  return {
    token: `${encodedPayload}.${signature}`,
    expiresAt,
  };
};

const parseCustomerAccessSessionToken = (token) => {
  if (typeof token !== "string" || !token.trim()) {
    return null;
  }

  const sessionSecret = process.env.CUSTOMER_ACCESS_SESSION_SECRET;

  if (!sessionSecret) {
    return null;
  }

  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", sessionSecret)
    .update(encodedPayload)
    .digest("base64url");

  const providedBuffer = Buffer.from(providedSignature);

  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  let payload;

  try {
    payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );
  } catch {
    return null;
  }

  if (
    payload?.type !== CUSTOMER_ACCESS_SESSION_TYPE ||
    typeof payload?.customerId !== "string"
  ) {
    return null;
  }

  const expiresAtMs = Date.parse(payload.expiresAt);

  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now()) {
    return null;
  }

  return payload;
};

const serializeCustomerOrder = (order) => {
  if (!order || typeof order !== "object") {
    return null;
  }

  return {
    id: order.id || null,

    orderNumber: order.orderNumber || null,

    status: order.status || null,

    statusHistory: Array.isArray(order.statusHistory)
      ? order.statusHistory.map((entry) => ({
          status: entry?.status || null,
          createdAt: entry?.createdAt || null,
        }))
      : [],

    customer: {
      firstName: order.customer?.firstName || "",
      lastName: order.customer?.lastName || "",
      email: order.customer?.email || "",
      phone: order.customer?.phone || "",
    },

    fulfillment: order.fulfillment || null,

    fulfillmentVerification: {
      version: Number.isInteger(Number(order.fulfillmentVerification?.version))
        ? Number(order.fulfillmentVerification.version)
        : 1,

      status: order.fulfillmentVerification?.status || null,

      activatedAt: order.fulfillmentVerification?.activatedAt || null,

      usedAt: order.fulfillmentVerification?.usedAt || null,
    },

    items: Array.isArray(order.items) ? order.items : [],

    pricing: order.pricing || null,

    payment: {
      status: order.payment?.status || null,

      paymentMethodType: order.payment?.paymentMethodType || null,

      card: order.payment?.card
        ? {
            brand: order.payment.card.brand || null,
            last4: order.payment.card.last4 || null,
          }
        : null,

      paidAt: order.payment?.paidAt || null,
    },

    createdAt: order.createdAt || null,

    updatedAt: order.updatedAt || null,
  };
};

const serializeCustomerOrders = (orders) => {
  if (!Array.isArray(orders)) {
    return [];
  }

  return orders.map(serializeCustomerOrder).filter(Boolean);
};
module.exports = {
  createCustomerAccessError,
  normalizeEmail,
  validateEmail,
  createVerificationCode,
  createVerificationCodeHash,
  verifyVerificationCode,
  createChallengeExpiration,
  createCustomerAccessSessionToken,
  parseCustomerAccessSessionToken,
  serializeCustomerOrders,
};
