/* eslint-disable */

const firebaseController = require("../../fb");
const customersCatalogControllers = require("../customersCatalog/customers.controllers");

const {
  buildPendingOrderPayload,
  validateOrderStatusTransition,
  resolveQrFulfillmentCompletion,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  ORDER_TIMELINE_STATUSES,
} = require("./orders.handlers");

const {
  FULFILLMENT_VERIFICATION_STATUSES,
  FULFILLMENT_COMPLETION_METHODS,
} = require("./orders.constants");

const {
  verifyFulfillmentVerificationCredential,
} = require("./fulfillment_verification.helpers");

const ORDERS_COLLECTION = "ordersCatalog";

const SYSTEM_COUNTERS_COLLECTION = "systemCounters";

const ORDER_COUNTER_DOCUMENT = "ordersCatalog";

const ORDER_NUMBER_PREFIX = "ME-";

const ORDER_NUMBER_START = 100001;

const formatOrderNumber = (number) => {
  if (!Number.isInteger(number) || number < ORDER_NUMBER_START) {
    throw new Error(`Invalid order sequence number: ${number}`);
  }

  return `${ORDER_NUMBER_PREFIX}${number}`;
};

const getOrderById = async (orderId) => {
  if (!orderId) {
    return null;
  }

  const snapshot = await firebaseController.db
    .collection(ORDERS_COLLECTION)
    .doc(String(orderId))
    .get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data();
};

const getOrdersByCustomerId = async (customerId) => {
  if (typeof customerId !== "string" || !customerId.trim()) {
    return [];
  }

  const snapshot = await firebaseController.db
    .collection(ORDERS_COLLECTION)
    .where("customer.customerId", "==", customerId.trim())
    .get();

  const orders = [];

  snapshot.forEach((doc) => {
    orders.push(doc.data());
  });

  orders.sort((a, b) => {
    const aCreatedAt = Date.parse(a?.createdAt || "");
    const bCreatedAt = Date.parse(b?.createdAt || "");

    const normalizedA = Number.isFinite(aCreatedAt) ? aCreatedAt : 0;

    const normalizedB = Number.isFinite(bCreatedAt) ? bCreatedAt : 0;

    return normalizedB - normalizedA;
  });

  return orders;
};

const createPendingOrder = async ({
  customer,
  fulfillment,
  items,
  pricing,
  tax,
  confirmationTokenId,
  paymentMethodType,
  defaultDeliveryAddress = null,
}) => {
  const resolvedCustomer =
    await customersCatalogControllers.resolveGuestCustomer({
      customer,
      defaultDeliveryAddress,
    });

  const orderCustomer = {
    customerId: resolvedCustomer.id,

    userId: resolvedCustomer.userId || null,

    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
  };

  const counterRef = firebaseController.db
    .collection(SYSTEM_COUNTERS_COLLECTION)
    .doc(ORDER_COUNTER_DOCUMENT);

  const order = await firebaseController.db.runTransaction(
    async (transaction) => {
      const counterSnapshot = await transaction.get(counterRef);

      let nextNumber = ORDER_NUMBER_START;

      if (counterSnapshot.exists) {
        nextNumber = Number(counterSnapshot.data()?.nextNumber);

        if (!Number.isInteger(nextNumber) || nextNumber < ORDER_NUMBER_START) {
          throw new Error("The ordersCatalog sequence counter is invalid");
        }
      }

      const orderNumber = formatOrderNumber(nextNumber);

      const pendingOrder = buildPendingOrderPayload({
        orderNumber,

        customer: orderCustomer,

        fulfillment,
        items,
        pricing,
        tax,

        confirmationTokenId,
        paymentMethodType,
      });

      const orderRef = firebaseController.db
        .collection(ORDERS_COLLECTION)
        .doc(pendingOrder.id);

      /**
       * Reserve the current number for this order
       * and advance the counter atomically.
       *
       * If another checkout tries to create an order
       * simultaneously, Firestore retries one of the
       * transactions against the new counter value.
       */
      transaction.set(
        counterRef,
        {
          nextNumber: nextNumber + 1,

          updatedAt: new Date().toISOString(),
        },
        {
          merge: true,
        }
      );

      transaction.create(orderRef, pendingOrder);

      return pendingOrder;
    }
  );

  return order;
};

const markOrderAsPaid = async ({
  orderId,
  paymentIntentId,
  latestChargeId,
  card,
}) => {
  const orderRef = firebaseController.db
    .collection(ORDERS_COLLECTION)
    .doc(String(orderId));

  const existingOrder = await orderRef.get();

  if (!existingOrder.exists) {
    return null;
  }

  const existingOrderData = existingOrder.data();

  const now = new Date().toISOString();

  const existingStatusHistory = Array.isArray(existingOrderData.statusHistory)
    ? existingOrderData.statusHistory
    : [];

  const alreadyConfirmed = existingStatusHistory.some(
    (entry) => entry?.status === ORDER_TIMELINE_STATUSES.CONFIRMED
  );

  const nextStatusHistory = alreadyConfirmed
    ? existingStatusHistory
    : [
        ...existingStatusHistory,
        {
          status: ORDER_TIMELINE_STATUSES.CONFIRMED,
          createdAt: now,
        },
      ];

  await orderRef.set(
    {
      status: ORDER_STATUSES.CONFIRMED,

      statusHistory: nextStatusHistory,

      fulfillmentVerification: {
        ...existingOrderData.fulfillmentVerification,

        version:
          Number(existingOrderData.fulfillmentVerification?.version) || 1,

        status: FULFILLMENT_VERIFICATION_STATUSES.ACTIVE,

        activatedAt:
          existingOrderData.fulfillmentVerification?.activatedAt || now,

        usedAt: existingOrderData.fulfillmentVerification?.usedAt || null,
      },

      payment: {
        ...existingOrderData.payment,

        status: PAYMENT_STATUSES.PAID,

        paymentIntentId: paymentIntentId || null,

        latestChargeId: latestChargeId || null,

        card: card
          ? {
              brand: card.brand || null,
              last4: card.last4 || null,
            }
          : null,

        paidAt: existingOrderData.payment?.paidAt || now,

        failure: null,
      },

      updatedAt: now,
    },
    {
      merge: true,
    }
  );

  const updatedOrder = await orderRef.get();

  return updatedOrder.data();
};

const markOrderAsRequiresAttention = async ({
  orderId,
  paymentIntentId,
  latestChargeId,
  reason,
  details = null,
}) => {
  const orderRef = firebaseController.db
    .collection(ORDERS_COLLECTION)
    .doc(String(orderId));

  const existingOrder = await orderRef.get();

  if (!existingOrder.exists) {
    return null;
  }

  const now = new Date().toISOString();

  await orderRef.set(
    {
      status: ORDER_STATUSES.REQUIRES_ATTENTION,

      payment: {
        ...existingOrder.data().payment,

        /**
         * Payment already succeeded.
         *
         * Do NOT mark this payment as failed merely because
         * a later backend operation failed.
         */
        status: PAYMENT_STATUSES.PAID,

        paymentIntentId: paymentIntentId || null,

        latestChargeId: latestChargeId || null,

        paidAt: existingOrder.data().payment?.paidAt || now,

        failure: null,
      },

      recovery: {
        required: true,

        reason: reason || "UNKNOWN_POST_PAYMENT_FAILURE",

        details: details && typeof details === "object" ? details : null,

        createdAt: now,

        resolvedAt: null,
      },

      updatedAt: now,
    },
    {
      merge: true,
    }
  );

  const updatedOrder = await orderRef.get();

  return updatedOrder.data();
};

const markOrderAsPaymentFailed = async ({
  orderId,
  paymentIntentId = null,
  failure = null,
}) => {
  const orderRef = firebaseController.db
    .collection(ORDERS_COLLECTION)
    .doc(String(orderId));

  const existingOrder = await orderRef.get();

  if (!existingOrder.exists) {
    return null;
  }

  const now = new Date().toISOString();

  await orderRef.set(
    {
      status: ORDER_STATUSES.PAYMENT_FAILED,

      payment: {
        ...existingOrder.data().payment,

        status: PAYMENT_STATUSES.FAILED,

        paymentIntentId,

        failure: failure && typeof failure === "object" ? failure : null,
      },

      updatedAt: now,
    },
    {
      merge: true,
    }
  );

  const updatedOrder = await orderRef.get();

  return updatedOrder.data();
};

const updateOrderStatus = async ({ orderId, status }) => {
  if (typeof orderId !== "string" || !orderId.trim()) {
    const error = new Error("Order id is required");

    error.statusCode = 400;

    throw error;
  }

  const normalizedOrderId = orderId.trim();

  const orderRef = firebaseController.db
    .collection(ORDERS_COLLECTION)
    .doc(normalizedOrderId);

  const updatedOrder = await firebaseController.db.runTransaction(
    async (transaction) => {
      const orderSnapshot = await transaction.get(orderRef);

      if (!orderSnapshot.exists) {
        const error = new Error("Order was not found");

        error.statusCode = 404;

        throw error;
      }

      const existingOrder = orderSnapshot.data();

      const transition = validateOrderStatusTransition({
        order: existingOrder,

        nextStatus: status,
      });

      /**
       * Idempotency:
       *
       * Repeating:
       *
       * confirmed -> out_for_delivery
       *
       * after the order is already out_for_delivery
       * should not create another timeline entry.
       */
      if (transition.isNoop) {
        return existingOrder;
      }

      const now = new Date().toISOString();

      const existingStatusHistory = Array.isArray(existingOrder.statusHistory)
        ? existingOrder.statusHistory
        : [];

      const nextStatusHistory = [
        ...existingStatusHistory,

        {
          status: transition.nextStatus,

          createdAt: now,
        },
      ];

      transaction.set(
        orderRef,

        {
          status: transition.nextStatus,

          statusHistory: nextStatusHistory,

          updatedAt: now,
        },

        {
          merge: true,
        }
      );

      return {
        ...existingOrder,

        status: transition.nextStatus,

        statusHistory: nextStatusHistory,

        updatedAt: now,
      };
    }
  );

  return updatedOrder;
};

const completeOrderWithQr = async ({ credential }) => {
  const verification = verifyFulfillmentVerificationCredential(credential);

  if (!verification.valid) {
    const error = new Error(
      "The fulfillment verification credential is invalid"
    );

    error.statusCode = 400;

    error.details = {
      reason: verification.reason,
    };

    throw error;
  }

  const credentialPayload = verification.payload;

  const orderRef = firebaseController.db
    .collection(ORDERS_COLLECTION)
    .doc(credentialPayload.orderId);

  const completedOrder = await firebaseController.db.runTransaction(
    async (transaction) => {
      const orderSnapshot = await transaction.get(orderRef);

      if (!orderSnapshot.exists) {
        const error = new Error(
          "The order connected to this QR code was not found"
        );

        error.statusCode = 404;

        throw error;
      }

      const existingOrder = orderSnapshot.data();

      /**
       * The signed credential contains both the
       * Firestore order id and the customer-facing
       * order number.
       *
       * Both must match the authoritative order.
       */
      if (existingOrder.orderNumber !== credentialPayload.orderNumber) {
        const error = new Error("The QR code does not match this order");

        error.statusCode = 409;

        error.details = {
          reason: "ORDER_NUMBER_MISMATCH",
        };

        throw error;
      }

      const orderVerificationVersion = Number(
        existingOrder.fulfillmentVerification?.version
      );

      if (
        !Number.isInteger(orderVerificationVersion) ||
        orderVerificationVersion !== credentialPayload.version
      ) {
        const error = new Error(
          "The QR code version is no longer valid for this order"
        );

        error.statusCode = 409;

        error.details = {
          reason: "FULFILLMENT_VERIFICATION_VERSION_MISMATCH",

          credentialVersion: credentialPayload.version,

          orderVersion: Number.isInteger(orderVerificationVersion)
            ? orderVerificationVersion
            : null,
        };

        throw error;
      }

      const verificationStatus = existingOrder.fulfillmentVerification?.status;

      if (verificationStatus !== FULFILLMENT_VERIFICATION_STATUSES.ACTIVE) {
        const error = new Error(
          verificationStatus === FULFILLMENT_VERIFICATION_STATUSES.USED
            ? "This QR code has already been used"
            : "This QR code is not active"
        );

        error.statusCode = 409;

        error.details = {
          reason:
            verificationStatus === FULFILLMENT_VERIFICATION_STATUSES.USED
              ? "FULFILLMENT_VERIFICATION_ALREADY_USED"
              : "FULFILLMENT_VERIFICATION_NOT_ACTIVE",

          verificationStatus: verificationStatus || null,

          usedAt: existingOrder.fulfillmentVerification?.usedAt || null,
        };

        throw error;
      }

      const completion = resolveQrFulfillmentCompletion({
        order: existingOrder,
      });

      const now = new Date().toISOString();

      const existingStatusHistory = Array.isArray(existingOrder.statusHistory)
        ? existingOrder.statusHistory
        : [];

      const nextStatusHistory = [
        ...existingStatusHistory,

        {
          status: completion.timelineStatus,
          createdAt: now,
        },
      ];

      const nextFulfillmentVerification = {
        ...existingOrder.fulfillmentVerification,

        status: FULFILLMENT_VERIFICATION_STATUSES.USED,

        usedAt: now,
      };

      const fulfillmentCompletion = {
        method: FULFILLMENT_COMPLETION_METHODS.QR_SCAN,

        completedAt: now,
      };

      transaction.set(
        orderRef,

        {
          status: completion.nextStatus,

          statusHistory: nextStatusHistory,

          fulfillmentVerification: nextFulfillmentVerification,

          fulfillmentCompletion,

          updatedAt: now,
        },

        {
          merge: true,
        }
      );

      return {
        ...existingOrder,

        status: completion.nextStatus,

        statusHistory: nextStatusHistory,

        fulfillmentVerification: nextFulfillmentVerification,

        fulfillmentCompletion,

        updatedAt: now,
      };
    }
  );

  return {
    status: "fulfillment_completed",

    completion: {
      method: FULFILLMENT_COMPLETION_METHODS.QR_SCAN,

      orderStatus: completedOrder.status,

      completedAt: completedOrder.fulfillmentCompletion?.completedAt || null,
    },

    order: completedOrder,
  };
};

module.exports = {
  getOrderById,
  getOrdersByCustomerId,
  createPendingOrder,
  markOrderAsPaid,
  markOrderAsRequiresAttention,
  markOrderAsPaymentFailed,
  updateOrderStatus,
  completeOrderWithQr,
};
