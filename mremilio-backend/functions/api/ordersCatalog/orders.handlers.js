/* eslint-disable */

const crypto = require("crypto");

const {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  ORDER_TIMELINE_STATUSES,
  ORDER_CURRENCY,
} = require("./orders.constants");

const createOrderHandlerError = (message, statusCode = 500, details = null) => {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.details = details;

  return error;
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

  buildPendingOrderPayload,

  ORDER_STATUSES,
  PAYMENT_STATUSES,
  ORDER_TIMELINE_STATUSES,
};
