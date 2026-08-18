/* eslint-disable */

const { randomUUID } = require("crypto");

const firebaseController = require("../../fb");

const customersCatalogControllers = require("../customersCatalog/customers.controllers");

const emailService = require("../email/email_service");

const emailTemplates = require("../email/email_templates");
const ordersCatalogControllers = require("../ordersCatalog/orders.controllers");

const {
  CUSTOMER_ACCESS_CHALLENGES_COLLECTION,
  CUSTOMER_ACCESS_CODE_TTL_MINUTES,
  CUSTOMER_ACCESS_MAX_ATTEMPTS,
  CUSTOMER_ACCESS_CHALLENGE_STATUSES,
} = require("./customer_access.constants");

const {
  validateEmail,
  createVerificationCode,
  createVerificationCodeHash,
  createChallengeExpiration,
  createCustomerAccessError,
  verifyVerificationCode,
  createCustomerAccessSessionToken,
  serializeCustomerOrders,
} = require("./customer_access.handlers");

/**
 * Request access to a guest customer's orders.
 *
 * Flow:
 *
 * 1. Normalize and validate email.
 * 2. Find the customer in customersCatalog.
 * 3. Generate a short-lived verification code.
 * 4. Store only the code hash in Firestore.
 * 5. Email the plaintext code to the customer.
 *
 * IMPORTANT:
 *
 * The verification code itself is never persisted.
 */
const requestCustomerAccessCode = async ({ email }) => {
  const normalizedEmail = validateEmail(email);

  const customer = await customersCatalogControllers.getCustomerByEmail(
    normalizedEmail
  );

  /**
   * Do not reveal whether an email exists in
   * customersCatalog.
   *
   * The frontend should receive the same general
   * response whether or not a customer was found.
   */
  if (!customer) {
    return {
      status: "verification_requested",

      message:
        "If an order history exists for this email, a verification code has been sent.",
    };
  }

  const verificationCode = createVerificationCode();

  const codeHash = createVerificationCodeHash(verificationCode);

  const challengeId = `challenge_${randomUUID()}`;

  const now = new Date().toISOString();

  const expiresAt = createChallengeExpiration();

  const challengeDocument = {
    id: challengeId,

    customerId: customer.id,

    email: normalizedEmail,

    codeHash,

    status: CUSTOMER_ACCESS_CHALLENGE_STATUSES.PENDING,

    attempts: 0,

    maxAttempts: CUSTOMER_ACCESS_MAX_ATTEMPTS,

    expiresAt,

    usedAt: null,

    createdAt: now,
    updatedAt: now,
  };

  const challengeRef = firebaseController.db
    .collection(CUSTOMER_ACCESS_CHALLENGES_COLLECTION)
    .doc(challengeId);

  await challengeRef.set(challengeDocument);

  const emailContent = emailTemplates.buildCustomerAccessCodeEmail({
    firstName: customer.firstName,

    verificationCode,

    expiresInMinutes: CUSTOMER_ACCESS_CODE_TTL_MINUTES,
  });

  try {
    await emailService.sendEmail({
      to: normalizedEmail,

      subject: emailContent.subject,

      text: emailContent.text,

      html: emailContent.html,
    });
  } catch (error) {
    /**
     * The challenge cannot be used if its email
     * was never successfully delivered.
     */
    await challengeRef.delete();

    console.error("CUSTOMER ACCESS VERIFICATION EMAIL ERROR:", {
      customerId: customer.id,

      challengeId,

      message: error?.message || null,
    });

    throw error;
  }

  return {
    status: "verification_requested",

    message:
      "If an order history exists for this email, a verification code has been sent.",

    challengeId,
  };
};
const verifyCustomerAccessCode = async ({ challengeId, code }) => {
  if (typeof challengeId !== "string" || !challengeId.trim()) {
    throw createCustomerAccessError("Challenge id is required", 400);
  }

  if (typeof code !== "string" || !code.trim()) {
    throw createCustomerAccessError("Verification code is required", 400);
  }

  const challengeRef = firebaseController.db
    .collection(CUSTOMER_ACCESS_CHALLENGES_COLLECTION)
    .doc(challengeId.trim());

  const challengeSnapshot = await challengeRef.get();

  if (!challengeSnapshot.exists) {
    throw createCustomerAccessError(
      "The verification code is invalid or expired",
      400
    );
  }

  const challenge = challengeSnapshot.data();

  const now = new Date();

  const expiresAt = new Date(challenge.expiresAt);

  if (
    challenge.status !== CUSTOMER_ACCESS_CHALLENGE_STATUSES.PENDING ||
    challenge.usedAt ||
    Number.isNaN(expiresAt.getTime()) ||
    expiresAt <= now
  ) {
    await challengeRef.set(
      {
        status: CUSTOMER_ACCESS_CHALLENGE_STATUSES.EXPIRED,
        updatedAt: now.toISOString(),
      },
      {
        merge: true,
      }
    );

    throw createCustomerAccessError(
      "The verification code is invalid or expired",
      400
    );
  }

  const currentAttempts = Number(challenge.attempts || 0);

  const maxAttempts = Number(
    challenge.maxAttempts || CUSTOMER_ACCESS_MAX_ATTEMPTS
  );

  if (currentAttempts >= maxAttempts) {
    await challengeRef.set(
      {
        status: CUSTOMER_ACCESS_CHALLENGE_STATUSES.LOCKED,
        updatedAt: now.toISOString(),
      },
      {
        merge: true,
      }
    );

    throw createCustomerAccessError("Too many verification attempts", 429);
  }

  const codeIsValid = verifyVerificationCode({
    code: code.trim(),
    codeHash: challenge.codeHash,
  });

  if (!codeIsValid) {
    const nextAttempts = currentAttempts + 1;

    const isLocked = nextAttempts >= maxAttempts;

    await challengeRef.set(
      {
        attempts: nextAttempts,

        status: isLocked
          ? CUSTOMER_ACCESS_CHALLENGE_STATUSES.LOCKED
          : CUSTOMER_ACCESS_CHALLENGE_STATUSES.PENDING,

        updatedAt: now.toISOString(),
      },
      {
        merge: true,
      }
    );

    throw createCustomerAccessError(
      isLocked
        ? "Too many verification attempts"
        : "The verification code is invalid or expired",
      isLocked ? 429 : 400
    );
  }

  const verifiedAt = now.toISOString();

  await challengeRef.set(
    {
      status: CUSTOMER_ACCESS_CHALLENGE_STATUSES.VERIFIED,

      usedAt: verifiedAt,

      updatedAt: verifiedAt,
    },
    {
      merge: true,
    }
  );

  const session = createCustomerAccessSessionToken({
    customerId: challenge.customerId,
  });

  return {
    status: "verified",

    sessionToken: session.token,

    expiresAt: session.expiresAt,
  };
};

const getCustomerOrders = async ({ customerId }) => {
  if (typeof customerId !== "string" || !customerId.trim()) {
    throw createCustomerAccessError(
      "A verified customer session is required",
      401
    );
  }

  const orders = await ordersCatalogControllers.getOrdersByCustomerId(
    customerId.trim()
  );
  const customerOrders = serializeCustomerOrders(orders);

  return {
    status: "success",
    customerOrders,
  };
};

module.exports = {
  requestCustomerAccessCode,
  verifyCustomerAccessCode,
  getCustomerOrders,
};
