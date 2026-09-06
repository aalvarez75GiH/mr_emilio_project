/* eslint-disable */

const crypto = require("crypto");

const {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  ORDER_TIMELINE_STATUSES,
  ORDER_CURRENCY,
  FULFILLMENT_VERIFICATION_STATUSES,
} = require("./orders.constants");

const createOrderHandlerError = (message, statusCode = 500, details = null) => {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.details = details;

  return error;
};

const resolveQrFulfillmentCompletion = ({ order }) => {
  if (!isPlainObject(order)) {
    throw createOrderHandlerError(
      "A valid order is required to complete fulfillment",
      400
    );
  }

  const fulfillmentMethod = order.fulfillment?.method;
  const currentStatus = order.status;

  if (
    order.fulfillmentVerification?.status !==
    FULFILLMENT_VERIFICATION_STATUSES.ACTIVE
  ) {
    throw createOrderHandlerError(
      "Fulfillment verification is not active for this order",
      409,
      {
        verificationStatus: order.fulfillmentVerification?.status || null,
      }
    );
  }

  /**
   * Pickup
   *
   * confirmed -> picked_up
   */
  if (fulfillmentMethod === "pickup") {
    if (currentStatus !== ORDER_STATUSES.CONFIRMED) {
      throw createOrderHandlerError(
        `Pickup order cannot be completed by QR from status "${currentStatus}"`,
        409,
        {
          fulfillmentMethod,
          currentStatus,
          requiredStatus: ORDER_STATUSES.CONFIRMED,
        }
      );
    }

    return {
      nextStatus: ORDER_STATUSES.PICKED_UP,
      timelineStatus: ORDER_TIMELINE_STATUSES.PICKED_UP,
    };
  }

  /**
   * Local Delivery
   *
   * The driver must first start delivery:
   *
   * confirmed -> out_for_delivery
   *
   * QR completion is only allowed afterward:
   *
   * out_for_delivery -> delivered
   */
  if (fulfillmentMethod === "local_delivery") {
    if (currentStatus !== ORDER_STATUSES.OUT_FOR_DELIVERY) {
      throw createOrderHandlerError(
        `Local delivery order cannot be completed by QR from status "${currentStatus}"`,
        409,
        {
          fulfillmentMethod,
          currentStatus,
          requiredStatus: ORDER_STATUSES.OUT_FOR_DELIVERY,
        }
      );
    }

    return {
      nextStatus: ORDER_STATUSES.DELIVERED,
      timelineStatus: ORDER_TIMELINE_STATUSES.DELIVERED,
    };
  }

  throw createOrderHandlerError(
    `Unsupported fulfillment method "${fulfillmentMethod || "unknown"}"`,
    400
  );
};

const validateOrderStatusTransition = ({ order, nextStatus }) => {
  if (!isPlainObject(order)) {
    throw createOrderHandlerError(
      "A valid order is required to change order status",
      400
    );
  }

  const currentStatus = order.status;

  const fulfillmentMethod = order.fulfillment?.method;

  if (typeof nextStatus !== "string" || !nextStatus.trim()) {
    throw createOrderHandlerError("A target order status is required", 400);
  }

  const normalizedNextStatus = nextStatus.trim();

  const allowedOperationalStatuses = new Set([
    ORDER_STATUSES.PICKED_UP,
    ORDER_STATUSES.OUT_FOR_DELIVERY,
    ORDER_STATUSES.DELIVERED,
  ]);

  if (!allowedOperationalStatuses.has(normalizedNextStatus)) {
    throw createOrderHandlerError(
      `Order status "${normalizedNextStatus}" cannot be set through the fulfillment status operation`,
      400
    );
  }

  /**
   * Repeating the same request is treated as an
   * idempotent operation.
   */
  if (currentStatus === normalizedNextStatus) {
    return {
      allowed: true,

      isNoop: true,

      currentStatus,

      nextStatus: normalizedNextStatus,
    };
  }

  if (fulfillmentMethod === "pickup") {
    if (
      currentStatus === ORDER_STATUSES.CONFIRMED &&
      normalizedNextStatus === ORDER_STATUSES.PICKED_UP
    ) {
      return {
        allowed: true,

        isNoop: false,

        currentStatus,

        nextStatus: normalizedNextStatus,
      };
    }

    throw createOrderHandlerError(
      `Pickup order cannot transition from "${currentStatus}" to "${normalizedNextStatus}"`,
      409,
      {
        fulfillmentMethod,

        currentStatus,

        requestedStatus: normalizedNextStatus,

        allowedNextStatus:
          currentStatus === ORDER_STATUSES.CONFIRMED
            ? ORDER_STATUSES.PICKED_UP
            : null,
      }
    );
  }

  if (fulfillmentMethod === "local_delivery") {
    if (
      currentStatus === ORDER_STATUSES.CONFIRMED &&
      normalizedNextStatus === ORDER_STATUSES.OUT_FOR_DELIVERY
    ) {
      return {
        allowed: true,

        isNoop: false,

        currentStatus,

        nextStatus: normalizedNextStatus,
      };
    }

    if (
      currentStatus === ORDER_STATUSES.OUT_FOR_DELIVERY &&
      normalizedNextStatus === ORDER_STATUSES.DELIVERED
    ) {
      return {
        allowed: true,

        isNoop: false,

        currentStatus,

        nextStatus: normalizedNextStatus,
      };
    }

    let allowedNextStatus = null;

    if (currentStatus === ORDER_STATUSES.CONFIRMED) {
      allowedNextStatus = ORDER_STATUSES.OUT_FOR_DELIVERY;
    }

    if (currentStatus === ORDER_STATUSES.OUT_FOR_DELIVERY) {
      allowedNextStatus = ORDER_STATUSES.DELIVERED;
    }

    throw createOrderHandlerError(
      `Local delivery order cannot transition from "${currentStatus}" to "${normalizedNextStatus}"`,
      409,
      {
        fulfillmentMethod,

        currentStatus,

        requestedStatus: normalizedNextStatus,

        allowedNextStatus,
      }
    );
  }

  throw createOrderHandlerError(
    `Unsupported fulfillment method "${fulfillmentMethod || "unknown"}"`,
    400
  );
};

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const createOrderId = () => {
  return `order_${crypto.randomUUID()}`;
};

const normalizeCustomerSnapshot = (customer) => {
  if (!isPlainObject(customer)) {
    throw createOrderHandlerError(
      "Order customer information is required",
      400
    );
  }

  const customerId =
    typeof customer.customerId === "string" ? customer.customerId.trim() : "";

  const userId =
    typeof customer.userId === "string" && customer.userId.trim()
      ? customer.userId.trim()
      : null;

  const firstName =
    typeof customer.firstName === "string" ? customer.firstName.trim() : "";

  const lastName =
    typeof customer.lastName === "string" ? customer.lastName.trim() : "";

  const email =
    typeof customer.email === "string"
      ? customer.email.trim().toLowerCase()
      : "";

  const phone = typeof customer.phone === "string" ? customer.phone.trim() : "";

  if (!customerId) {
    throw createOrderHandlerError(
      "A customerId is required to create an order",
      400
    );
  }

  if (!firstName || !lastName || !email || !phone) {
    throw createOrderHandlerError(
      "Complete customer information is required to create an order",
      400
    );
  }

  return {
    customerId,
    userId,
    firstName,
    lastName,
    email,
    phone,
  };
};

const normalizeOrderItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw createOrderHandlerError("Order items are required", 400);
  }

  return items.map((item, index) => {
    const productId =
      typeof item?.productId === "string" ? item.productId.trim() : "";

    const quantity = Number(item?.quantity);

    const unitPriceInCents = Number(item?.pricing?.unitPriceInCents);

    const lineTotalInCents = Number(item?.pricing?.lineTotalInCents);

    if (!productId) {
      throw createOrderHandlerError(
        `Order item at index ${index} is missing productId`,
        400
      );
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw createOrderHandlerError(
        `Order item "${productId}" has an invalid quantity`,
        400
      );
    }

    if (!Number.isInteger(unitPriceInCents) || unitPriceInCents < 0) {
      throw createOrderHandlerError(
        `Order item "${productId}" has an invalid unit price`,
        400
      );
    }

    if (!Number.isInteger(lineTotalInCents) || lineTotalInCents < 0) {
      throw createOrderHandlerError(
        `Order item "${productId}" has an invalid line total`,
        400
      );
    }

    return {
      productId,

      productName:
        item?.product?.product_name?.en ||
        item?.product?.product_name?.es ||
        productId,

      quantity,

      unitPriceInCents,

      lineTotalInCents,

      size: isPlainObject(item?.product?.size) ? item.product.size : null,

      stockUnit:
        typeof item?.product?.stockUnit === "string"
          ? item.product.stockUnit
          : null,

      image: item?.product?.image
        ? {
            storagePath: item.product.image.storagePath || null,

            alt: item.product.image.alt || null,
          }
        : null,
    };
  });
};

const normalizePricingSnapshot = ({ pricing, currency = ORDER_CURRENCY }) => {
  if (!isPlainObject(pricing)) {
    throw createOrderHandlerError("Order pricing is required", 400);
  }

  const subtotalInCents = Number(pricing.subtotalInCents);

  const deliveryFeeInCents = Number(pricing.deliveryFeeInCents);

  const taxInCents = Number(pricing.taxInCents);

  const totalInCents = Number(pricing.totalInCents);

  const integerFields = [
    ["subtotalInCents", subtotalInCents],
    ["deliveryFeeInCents", deliveryFeeInCents],
    ["taxInCents", taxInCents],
    ["totalInCents", totalInCents],
  ];

  integerFields.forEach(([fieldName, value]) => {
    if (!Number.isInteger(value) || value < 0) {
      throw createOrderHandlerError(
        `"pricing.${fieldName}" must be a non-negative integer`,
        400
      );
    }
  });

  if (subtotalInCents + deliveryFeeInCents + taxInCents !== totalInCents) {
    throw createOrderHandlerError(
      "Order pricing totals are inconsistent",
      400,
      {
        subtotalInCents,
        deliveryFeeInCents,
        taxInCents,
        totalInCents,
      }
    );
  }

  return {
    subtotalInCents,
    deliveryFeeInCents,
    taxInCents,
    totalInCents,
    currency,
  };
};

const buildPendingOrderPayload = ({
  orderNumber,

  customer,
  fulfillment,
  items,
  pricing,
  tax,

  confirmationTokenId,
  paymentMethodType = "card",
}) => {
  if (typeof orderNumber !== "string" || !orderNumber.trim()) {
    throw createOrderHandlerError("A valid order number is required", 500);
  }

  if (!isPlainObject(fulfillment)) {
    throw createOrderHandlerError(
      "Order fulfillment information is required",
      400
    );
  }

  const customerSnapshot = normalizeCustomerSnapshot(customer);

  const itemSnapshots = normalizeOrderItems(items);

  const pricingSnapshot = normalizePricingSnapshot({
    pricing,
    currency: ORDER_CURRENCY,
  });

  const now = new Date().toISOString();

  return {
    id: createOrderId(),

    orderNumber: orderNumber.trim(),

    status: ORDER_STATUSES.PAYMENT_PROCESSING,

    statusHistory: [
      {
        status: ORDER_TIMELINE_STATUSES.ORDER_PLACED,
        createdAt: now,
      },
    ],

    customer: customerSnapshot,

    fulfillment,

    fulfillmentVerification: {
      version: 1,
      status: FULFILLMENT_VERIFICATION_STATUSES.PENDING,
      activatedAt: null,
      usedAt: null,
    },

    items: itemSnapshots,

    pricing: pricingSnapshot,

    tax: {
      calculationId: tax?.calculationId || null,

      expiresAt: tax?.expiresAt ?? null,
    },

    payment: {
      status: PAYMENT_STATUSES.PROCESSING,

      confirmationTokenId: confirmationTokenId || null,

      paymentMethodType: paymentMethodType || "card",

      paymentIntentId: null,

      latestChargeId: null,

      paidAt: null,

      failure: null,
    },

    createdAt: now,
    updatedAt: now,
  };
};

module.exports = {
  createOrderHandlerError,

  resolveQrFulfillmentCompletion,

  buildPendingOrderPayload,

  validateOrderStatusTransition,

  ORDER_STATUSES,

  PAYMENT_STATUSES,

  ORDER_TIMELINE_STATUSES,
};
