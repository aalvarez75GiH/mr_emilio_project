/* eslint-disable */

const crypto = require("crypto");

const FULFILLMENT_VERIFICATION_SECRET_ENV = "FULFILLMENT_VERIFICATION_SECRET";

const FULFILLMENT_VERIFICATION_VERSION = 1;

const getFulfillmentVerificationSecret = () => {
  const secret = process.env[FULFILLMENT_VERIFICATION_SECRET_ENV];

  if (typeof secret !== "string" || secret.trim().length < 32) {
    throw new Error(
      `${FULFILLMENT_VERIFICATION_SECRET_ENV} must contain at least 32 characters`
    );
  }

  return secret.trim();
};

const encodeBase64Url = (value) => {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const decodeBase64Url = (value) => {
  const normalizedValue = String(value || "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const paddingLength = (4 - (normalizedValue.length % 4)) % 4;

  const paddedValue = normalizedValue + "=".repeat(paddingLength);

  return Buffer.from(paddedValue, "base64").toString("utf8");
};

const createSignature = (encodedPayload) => {
  const secret = getFulfillmentVerificationSecret();

  return crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const compareSignatures = (providedSignature, expectedSignature) => {
  if (
    typeof providedSignature !== "string" ||
    typeof expectedSignature !== "string"
  ) {
    return false;
  }

  const providedBuffer = Buffer.from(providedSignature, "utf8");

  const expectedBuffer = Buffer.from(expectedSignature, "utf8");

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
};

const createFulfillmentVerificationCredential = (order) => {
  if (!order || typeof order !== "object" || Array.isArray(order)) {
    throw new Error(
      "A confirmed order is required to create a fulfillment verification credential"
    );
  }

  const orderId = typeof order.id === "string" ? order.id.trim() : "";

  const orderNumber =
    typeof order.orderNumber === "string" ? order.orderNumber.trim() : "";

  const verificationVersion = Number(order.fulfillmentVerification?.version);

  const verificationStatus = order.fulfillmentVerification?.status;

  if (!orderId) {
    throw new Error(
      "Order id is required to create a fulfillment verification credential"
    );
  }

  if (!orderNumber) {
    throw new Error(
      "Order number is required to create a fulfillment verification credential"
    );
  }

  if (verificationStatus !== "active") {
    throw new Error("Fulfillment verification is not active for this order");
  }

  const payload = {
    version:
      Number.isInteger(verificationVersion) && verificationVersion > 0
        ? verificationVersion
        : FULFILLMENT_VERIFICATION_VERSION,

    orderId,

    orderNumber,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));

  const signature = createSignature(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

const verifyFulfillmentVerificationCredential = (credential) => {
  if (typeof credential !== "string" || !credential.trim()) {
    return {
      valid: false,
      reason: "CREDENTIAL_REQUIRED",
      payload: null,
    };
  }

  const credentialParts = credential.trim().split(".");

  if (credentialParts.length !== 2) {
    return {
      valid: false,
      reason: "INVALID_CREDENTIAL_FORMAT",
      payload: null,
    };
  }

  const [encodedPayload, providedSignature] = credentialParts;

  const expectedSignature = createSignature(encodedPayload);

  if (!compareSignatures(providedSignature, expectedSignature)) {
    return {
      valid: false,
      reason: "INVALID_CREDENTIAL_SIGNATURE",
      payload: null,
    };
  }

  let payload;

  try {
    payload = JSON.parse(decodeBase64Url(encodedPayload));
  } catch (error) {
    return {
      valid: false,
      reason: "INVALID_CREDENTIAL_PAYLOAD",
      payload: null,
    };
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      reason: "INVALID_CREDENTIAL_PAYLOAD",
      payload: null,
    };
  }

  if (
    !Number.isInteger(Number(payload.version)) ||
    Number(payload.version) <= 0
  ) {
    return {
      valid: false,
      reason: "INVALID_CREDENTIAL_VERSION",
      payload: null,
    };
  }

  if (typeof payload.orderId !== "string" || !payload.orderId.trim()) {
    return {
      valid: false,
      reason: "INVALID_CREDENTIAL_ORDER_ID",
      payload: null,
    };
  }

  if (typeof payload.orderNumber !== "string" || !payload.orderNumber.trim()) {
    return {
      valid: false,
      reason: "INVALID_CREDENTIAL_ORDER_NUMBER",
      payload: null,
    };
  }

  return {
    valid: true,

    reason: null,

    payload: {
      version: Number(payload.version),

      orderId: payload.orderId.trim(),

      orderNumber: payload.orderNumber.trim(),
    },
  };
};

module.exports = {
  createFulfillmentVerificationCredential,
  verifyFulfillmentVerificationCredential,
};
