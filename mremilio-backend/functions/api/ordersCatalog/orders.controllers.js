/* eslint-disable */

const firebaseController = require("../../fb");
const customersCatalogControllers = require("../customersCatalog/customers.controllers");

const {
  buildPendingOrderPayload,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  ORDER_TIMELINE_STATUSES,
} = require("./orders.handlers");

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
// const markOrderAsPaid = async ({
//   orderId,
//   paymentIntentId,
//   latestChargeId,
//   card,
// }) => {
//   const orderRef = firebaseController.db
//     .collection(ORDERS_COLLECTION)
//     .doc(String(orderId));

//   const existingOrder = await orderRef.get();

//   if (!existingOrder.exists) {
//     return null;
//   }

//   const now = new Date().toISOString();

//   await orderRef.set(
//     {
//       status: ORDER_STATUSES.CONFIRMED,

//       payment: {
//         ...existingOrder.data().payment,

//         status: PAYMENT_STATUSES.PAID,

//         paymentIntentId: paymentIntentId || null,

//         latestChargeId: latestChargeId || null,

//         card: card
//           ? {
//               brand: card.brand || null,
//               last4: card.last4 || null,
//             }
//           : null,

//         paidAt: now,

//         failure: null,
//       },

//       updatedAt: now,
//     },
//     {
//       merge: true,
//     }
//   );

//   const updatedOrder = await orderRef.get();

//   return updatedOrder.data();
// };

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

module.exports = {
  getOrderById,
  getOrdersByCustomerId,
  createPendingOrder,
  markOrderAsPaid,
  markOrderAsRequiresAttention,
  markOrderAsPaymentFailed,
};
