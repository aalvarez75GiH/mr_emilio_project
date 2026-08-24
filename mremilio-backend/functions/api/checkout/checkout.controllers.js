/* eslint-disable */

const productsCatalogControllers = require("../productsCatalog/products.controllers");
const warehousesCatalogControllers = require("../warehousesCatalog/warehouses.controllers");
const ordersCatalogControllers = require("../ordersCatalog/orders.controllers");

const stripeClient = require("stripe")(process.env.STRIPE_SECRET_KEY);

const {
  CHECKOUT_FULFILLMENT_METHODS,
  CHECKOUT_FULFILLMENT_METHOD_VALUES,
  CHECKOUT_CURRENCY,
} = require("./checkout.constants");

const {
  createFulfillmentVerificationCredential,
} = require("../ordersCatalog/fulfillment_verification.helpers");

const { sendOrderConfirmationEmail } = require("../email/email_service");

const {
  createCheckoutHandlerError,

  isPlainObject,
  validateRequiredString,

  normalizeCheckoutCartItems,

  validateWarehouseForCheckout,
  validateProductForCheckout,
  validateWarehouseInventoryItem,

  buildAuthoritativeCheckoutLine,

  calculateCheckoutSubtotalInCents,

  buildStripeAddressFromWarehouse,
  buildStripeAddressFromDeliveryAddress,
  buildStripeTaxLineItems,
} = require("./checkout.handlers");

const validateFulfillmentMethod = (fulfillmentMethod) => {
  if (!CHECKOUT_FULFILLMENT_METHOD_VALUES.includes(fulfillmentMethod)) {
    throw createCheckoutHandlerError(
      `Invalid fulfillment method: "${fulfillmentMethod}"`,
      400,
      {
        allowedValues: CHECKOUT_FULFILLMENT_METHOD_VALUES,
      }
    );
  }

  return fulfillmentMethod;
};

const createStripeTaxCalculation = async ({ cart, fulfillment, warehouse }) => {
  const lineItems = buildStripeTaxLineItems(cart.items);

  const warehouseAddress = buildStripeAddressFromWarehouse(warehouse);

  let customerAddress;
  let shippingCost;

  if (fulfillment.method === CHECKOUT_FULFILLMENT_METHODS.PICKUP) {
    /**
     * Pickup:
     *
     * The selected pickup store is the location
     * where the customer receives the goods.
     */
    customerAddress = warehouseAddress;
  } else {
    customerAddress = fulfillment.taxAddress;

    if (!customerAddress) {
      throw createCheckoutHandlerError(
        "The Local Delivery tax address could not be resolved",
        500
      );
    }

    const deliveryFeeInCents = Number(fulfillment.deliveryFeeInCents || 0);

    if (Number.isInteger(deliveryFeeInCents) && deliveryFeeInCents > 0) {
      shippingCost = {
        amount: deliveryFeeInCents,
        tax_behavior: "exclusive",
      };
    }
  }

  const calculationPayload = {
    currency: CHECKOUT_CURRENCY,

    customer_details: {
      address: customerAddress,

      address_source: "shipping",
    },

    line_items: lineItems,

    expand: ["line_items", "tax_breakdown"],
  };

  /**
   * For Local Delivery, the goods originate
   * from the authoritative fulfilling store.
   */
  if (fulfillment.method === CHECKOUT_FULFILLMENT_METHODS.LOCAL_DELIVERY) {
    calculationPayload.ship_from_details = {
      address: warehouseAddress,
    };

    if (shippingCost) {
      calculationPayload.shipping_cost = shippingCost;
    }
  }

  try {
    return await stripeClient.tax.calculations.create(calculationPayload);
  } catch (error) {
    console.error("STRIPE TAX CALCULATION ERROR:", {
      message: error?.message,
      type: error?.type,
      code: error?.code,
      raw: error?.raw,
    });

    throw createCheckoutHandlerError(
      error?.message || "Unable to calculate sales tax",
      error?.statusCode || 502,
      {
        reason: "STRIPE_TAX_CALCULATION_FAILED",
        stripeCode: error?.code || null,
        stripeType: error?.type || null,
      }
    );
  }
};

const resolvePickupFulfillment = async ({ pickup }) => {
  if (!isPlainObject(pickup)) {
    throw createCheckoutHandlerError(
      '"pickup" must be provided for Pickup checkout',
      400
    );
  }

  const warehouseId = validateRequiredString(
    pickup.warehouseId,
    "pickup.warehouseId"
  );

  const warehouse = await warehousesCatalogControllers.getWarehouseById(
    warehouseId
  );

  validateWarehouseForCheckout(warehouse);

  if (warehouse.fulfillment?.pickup?.enabled !== true) {
    throw createCheckoutHandlerError(
      "Pickup is not currently available at this store",
      409,
      {
        reason: "PICKUP_DISABLED",
        warehouseId,
      }
    );
  }

  return {
    warehouse,

    fulfillment: {
      method: CHECKOUT_FULFILLMENT_METHODS.PICKUP,

      warehouseId: warehouse.id,

      warehouseName: warehouse.warehouse_name,

      address: warehouse.physical_address,

      preparationTimeMinutes:
        warehouse.fulfillment?.pickup?.preparationTimeMinutes ?? null,

      pickupHours: {
        openingTime: warehouse.warehouse_information?.opening_time || null,

        closingTime: warehouse.warehouse_information?.closing_time || null,
      },

      deliveryFeeInCents: 0,
    },
  };
};

const resolveLocalDeliveryFulfillment = async ({ delivery }) => {
  if (!isPlainObject(delivery)) {
    throw createCheckoutHandlerError(
      '"delivery" must be provided for Local Delivery checkout',
      400
    );
  }

  const warehouseId = validateRequiredString(
    delivery.warehouseId,
    "delivery.warehouseId"
  );
  const deliveryAddress = delivery.address;

  const taxAddress = buildStripeAddressFromDeliveryAddress(deliveryAddress);

  const quoteAddress = validateRequiredString(
    deliveryAddress.formattedAddress ||
      [
        deliveryAddress.street,
        deliveryAddress.unit,
        deliveryAddress.city,
        deliveryAddress.state,
        deliveryAddress.postalCode,
      ]
        .filter(Boolean)
        .join(", "),
    "delivery.address.formattedAddress"
  );

  /**
   * Reuse the existing Local Delivery
   * domain operation.
   *
   * This revalidates:
   * - originating store;
   * - store activity;
   * - Google Routes driving distance;
   * - delivery radius;
   * - $1 / mile delivery fee.
   */
  const quote = await warehousesCatalogControllers.getLocalDeliveryQuote({
    warehouseId,
    address: quoteAddress,
  });

  if (quote.available !== true) {
    throw createCheckoutHandlerError(
      "Local delivery is no longer available for this address",
      409,
      {
        reason: quote.reason || "LOCAL_DELIVERY_UNAVAILABLE",

        warehouseId,

        address: quote.address || null,

        distance: quote.distance || null,
      }
    );
  }

  validateWarehouseForCheckout(quote.warehouse);

  return {
    warehouse: quote.warehouse,

    fulfillment: {
      method: CHECKOUT_FULFILLMENT_METHODS.LOCAL_DELIVERY,

      warehouseId: quote.warehouse.id,

      warehouseName: quote.warehouse.warehouse_name,
      address: quote.address?.formattedAddress || quoteAddress,

      taxAddress,

      coordinates: quote.address?.coordinates || null,

      placeId: quote.address?.placeId || null,

      distance: quote.distance || null,

      deliveryFeeInCents: Number.isInteger(
        Number(quote.deliveryFee?.amountInCents)
      )
        ? Number(quote.deliveryFee.amountInCents)
        : 0,

      estimatedTimeMinutes:
        quote.fulfillment?.localDelivery?.estimatedTimeMinutes || null,

      provider: quote.fulfillment?.localDelivery?.provider || null,
    },
  };
};

const resolveFulfillment = async ({ fulfillmentMethod, pickup, delivery }) => {
  if (fulfillmentMethod === CHECKOUT_FULFILLMENT_METHODS.PICKUP) {
    return resolvePickupFulfillment({
      pickup,
    });
  }

  if (fulfillmentMethod === CHECKOUT_FULFILLMENT_METHODS.LOCAL_DELIVERY) {
    return resolveLocalDeliveryFulfillment({
      delivery,
    });
  }

  throw createCheckoutHandlerError(
    "Unable to resolve checkout fulfillment",
    400
  );
};

const buildAuthoritativeCart = async ({ cartItems, warehouse }) => {
  const normalizedCartItems = normalizeCheckoutCartItems(cartItems);

  const authoritativeItems = await Promise.all(
    normalizedCartItems.map(async ({ productId, quantity }) => {
      const product = await productsCatalogControllers.getProductById(
        productId
      );

      validateProductForCheckout(product, productId);

      const inventoryEntry = validateWarehouseInventoryItem({
        warehouse,
        productId,
        quantity,
      });

      return buildAuthoritativeCheckoutLine({
        product,
        warehouse,
        inventoryEntry,
        quantity,
      });
    })
  );

  const subtotalInCents = calculateCheckoutSubtotalInCents(authoritativeItems);

  return {
    items: authoritativeItems,

    subtotalInCents,
  };
};

const prepareReview = async (checkoutPayload) => {
  if (!isPlainObject(checkoutPayload)) {
    throw createCheckoutHandlerError("Checkout payload must be an object", 400);
  }

  const fulfillmentMethod = validateFulfillmentMethod(
    checkoutPayload.fulfillmentMethod
  );

  const { warehouse, fulfillment } = await resolveFulfillment({
    fulfillmentMethod,

    pickup: checkoutPayload.pickup,

    delivery: checkoutPayload.delivery,
  });

  const cart = await buildAuthoritativeCart({
    cartItems: checkoutPayload.cartItems,

    warehouse,
  });

  const deliveryFeeInCents = Number(fulfillment.deliveryFeeInCents || 0);
  /**
   * Calculate authoritative Stripe Tax using the
   * validated cart and fulfillment context.
   */
  const taxCalculation = await createStripeTaxCalculation({
    cart,
    fulfillment,
    warehouse,
  });

  const taxInCents = Number(taxCalculation.tax_amount_exclusive || 0);

  const totalInCents = Number(taxCalculation.amount_total);

  const amountBeforeTaxInCents = cart.subtotalInCents + deliveryFeeInCents;

  return {
    status: "ready_for_review",

    currency: CHECKOUT_CURRENCY,

    items: cart.items,

    fulfillment,

    pricing: {
      subtotalInCents: cart.subtotalInCents,

      deliveryFeeInCents,

      taxInCents,

      amountBeforeTaxInCents,

      totalInCents,
    },

    tax: {
      calculated: true,

      calculationId: taxCalculation.id,

      expiresAt: taxCalculation.expires_at || null,
    },

    payment: {
      confirmationTokenId:
        typeof checkoutPayload.confirmationTokenId === "string"
          ? checkoutPayload.confirmationTokenId
          : null,
    },
  };
};

const placeOrder = async (checkoutPayload) => {
  if (!isPlainObject(checkoutPayload)) {
    throw createCheckoutHandlerError("Checkout payload must be an object", 400);
  }

  const confirmationTokenId = validateRequiredString(
    checkoutPayload.confirmationTokenId,
    "confirmationTokenId"
  );

  /**
   * Rebuild the checkout from authoritative backend data.
   *
   * This revalidates:
   * - fulfillment;
   * - authoritative warehouse/store;
   * - Local Delivery eligibility and driving distance;
   * - delivery fee;
   * - productsCatalog products;
   * - warehouse inventory;
   * - current warehouse selling prices;
   * - Stripe Tax;
   * - final total.
   *
   * We intentionally DO NOT trust a total supplied
   * by the frontend.
   */

  const review = await prepareReview({
    ...checkoutPayload,

    confirmationTokenId,
  });

  const totalInCents = Number(review.pricing?.totalInCents);

  if (!Number.isInteger(totalInCents) || totalInCents <= 0) {
    throw createCheckoutHandlerError(
      "The authoritative checkout total is invalid",
      500
    );
  }

  const taxCalculationId = validateRequiredString(
    review.tax?.calculationId,
    "tax.calculationId"
  );

  /**
   * Create a durable order BEFORE attempting payment.
   *
   * If Stripe succeeds but a later backend operation
   * fails, we still have an ordersCatalog record that
   * can be inspected and recovered.
   */

  const pendingOrder = await ordersCatalogControllers.createPendingOrder({
    customer: checkoutPayload.customer,

    fulfillment: review.fulfillment,

    items: review.items,

    pricing: review.pricing,

    tax: review.tax,

    confirmationTokenId,

    paymentMethodType: checkoutPayload.paymentMethodType || "card",

    defaultDeliveryAddress:
      checkoutPayload.fulfillmentMethod ===
      CHECKOUT_FULFILLMENT_METHODS.LOCAL_DELIVERY
        ? checkoutPayload.delivery?.address || null
        : null,
  });

  let paymentIntent;

  try {
    paymentIntent = await stripeClient.paymentIntents.create({
      amount: totalInCents,

      currency: CHECKOUT_CURRENCY,

      confirmation_token: confirmationTokenId,

      confirm: true,

      payment_method_types: ["card"],

      expand: ["latest_charge"],

      hooks: {
        inputs: {
          tax: {
            calculation: taxCalculationId,
          },
        },
      },

      metadata: {
        source: "mr_emilio_website",

        orderId: pendingOrder.id,

        orderNumber: pendingOrder.orderNumber,

        warehouseId: review.fulfillment?.warehouseId || "",

        fulfillmentMethod: review.fulfillment?.method || "",
      },
    });
  } catch (error) {
    console.error("STRIPE PLACE ORDER ERROR:", {
      orderId: pendingOrder.id,

      message: error?.message,

      type: error?.type,

      code: error?.code,

      declineCode: error?.decline_code,

      paymentIntent: error?.payment_intent?.id || null,
    });

    /**
     * The order already exists, so preserve the
     * failed payment attempt in ordersCatalog.
     */
    await ordersCatalogControllers.markOrderAsPaymentFailed({
      orderId: pendingOrder.id,

      paymentIntentId: error?.payment_intent?.id || null,

      failure: {
        message: error?.message || "Payment could not be completed",

        code: error?.code || null,

        declineCode: error?.decline_code || null,

        type: error?.type || null,
      },
    });

    throw createCheckoutHandlerError(
      error?.message || "Payment could not be completed",

      error?.statusCode || 402,

      {
        reason: "PAYMENT_FAILED",

        orderId: pendingOrder.id,

        orderNumber: pendingOrder.orderNumber,

        stripeCode: error?.code || null,

        declineCode: error?.decline_code || null,

        stripeType: error?.type || null,

        paymentIntentId: error?.payment_intent?.id || null,

        paymentIntentStatus: error?.payment_intent?.status || null,
      }
    );
  }

  /**
   * Do not mark the order as confirmed unless
   * Stripe actually reports a successful payment.
   */
  if (paymentIntent.status !== "succeeded") {
    return {
      status: "payment_requires_action",

      order: {
        id: pendingOrder.id,

        orderNumber: pendingOrder.orderNumber,

        status: pendingOrder.status,
      },

      payment: {
        paymentIntentId: paymentIntent.id,

        status: paymentIntent.status,

        clientSecret: paymentIntent.client_secret || null,

        nextAction: paymentIntent.next_action || null,
      },
    };
  }

  const latestCharge =
    paymentIntent.latest_charge &&
    typeof paymentIntent.latest_charge === "object"
      ? paymentIntent.latest_charge
      : null;

  const latestChargeId =
    typeof paymentIntent.latest_charge === "string"
      ? paymentIntent.latest_charge
      : latestCharge?.id || null;

  const cardDetails = latestCharge?.payment_method_details?.card || null;

  const paymentCard = cardDetails?.last4
    ? {
        brand: cardDetails.brand || null,
        last4: cardDetails.last4,
      }
    : null;

  /**
   * Stripe has successfully charged the customer.
   *
   * Inventory must be committed before the order can be
   * considered fully confirmed.
   *
   * decrementWarehouseInventoryFromOrder uses a Firestore
   * transaction, so concurrent writes cannot drive stock
   * below zero.
   */
  try {
    await warehousesCatalogControllers.decrementWarehouseInventoryFromOrder({
      warehouseId: review.fulfillment.warehouseId,

      orderItems: review.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
  } catch (inventoryError) {
    console.error("PAYMENT SUCCEEDED BUT INVENTORY COMMIT FAILED:", {
      orderId: pendingOrder.id,

      orderNumber: pendingOrder.orderNumber,

      warehouseId: review.fulfillment?.warehouseId || null,

      paymentIntentId: paymentIntent.id,

      message: inventoryError?.message || null,

      details: inventoryError?.details || null,
    });

    const recoveryOrder =
      await ordersCatalogControllers.markOrderAsRequiresAttention({
        orderId: pendingOrder.id,

        paymentIntentId: paymentIntent.id,

        latestChargeId,

        reason: "INVENTORY_COMMIT_FAILED",

        details: {
          warehouseId: review.fulfillment?.warehouseId || null,

          message:
            inventoryError?.message || "Inventory could not be committed",

          inventoryDetails: inventoryError?.details || null,
        },
      });

    throw createCheckoutHandlerError(
      "Payment succeeded, but inventory could not be finalized",
      500,
      {
        reason: "PAYMENT_SUCCEEDED_INVENTORY_COMMIT_FAILED",

        orderId: pendingOrder.id,

        orderNumber: pendingOrder.orderNumber,

        paymentIntentId: paymentIntent.id,

        orderStatus: recoveryOrder?.status || "requires_attention",
      }
    );
  }

  /**
   * Payment succeeded AND warehouse inventory was committed.
   *
   * Only now can the order become confirmed.
   */
  const confirmedOrder = await ordersCatalogControllers.markOrderAsPaid({
    orderId: pendingOrder.id,

    paymentIntentId: paymentIntent.id,

    latestChargeId,

    card: paymentCard,
  });

  if (!confirmedOrder) {
    /**
     * This is an important recovery case:
     *
     * Stripe succeeded, but the order could not be
     * updated afterward.
     */
    console.error("PAYMENT SUCCEEDED BUT ORDER UPDATE FAILED:", {
      orderId: pendingOrder.id,

      paymentIntentId: paymentIntent.id,

      latestChargeId,
    });

    throw createCheckoutHandlerError(
      "Payment succeeded but the order could not be finalized",
      500,
      {
        reason: "PAYMENT_SUCCEEDED_ORDER_UPDATE_FAILED",

        orderId: pendingOrder.id,

        orderNumber: pendingOrder.orderNumber,

        paymentIntentId: paymentIntent.id,
      }
    );
  }

  const fulfillmentVerificationCredential =
    createFulfillmentVerificationCredential(confirmedOrder);
  /**
   * Order confirmation email is a post-payment side effect.
   *
   * IMPORTANT:
   *
   * At this point:
   * - Stripe payment succeeded;
   * - inventory was committed;
   * - the order was marked paid/confirmed.
   *
   * An email delivery failure MUST NOT reclassify
   * this successful order as failed.
   */
  try {
    const emailResult = await sendOrderConfirmationEmail({
      order: confirmedOrder,
    });

    console.log("ORDER CONFIRMATION EMAIL SENT:", {
      orderId: confirmedOrder.id,
      orderNumber: confirmedOrder.orderNumber,
      customerEmail: confirmedOrder.customer?.email || null,
      messageId: emailResult?.messageId || null,
    });
  } catch (emailError) {
    console.error("ORDER CONFIRMATION EMAIL FAILED:", {
      orderId: confirmedOrder.id,
      orderNumber: confirmedOrder.orderNumber,
      customerEmail: confirmedOrder.customer?.email || null,
      message: emailError?.message || null,
    });
  }

  return {
    status: "order_confirmed",

    order: confirmedOrder,

    fulfillmentCredential: {
      credential: fulfillmentVerificationCredential,

      version: confirmedOrder.fulfillmentVerification?.version || 1,
    },

    payment: {
      paymentIntentId: paymentIntent.id,

      status: paymentIntent.status,

      amountInCents: paymentIntent.amount,

      currency: paymentIntent.currency,

      latestChargeId,

      card: paymentCard,
    },
  };
};

module.exports = {
  prepareReview,
  placeOrder,
};
