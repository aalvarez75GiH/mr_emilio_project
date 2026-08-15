/* eslint-disable */

const createCheckoutHandlerError = (
  message,
  statusCode = 500,
  details = null
) => {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.details = details;

  return error;
};

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const validateRequiredString = (value, fieldName) => {
  if (typeof value !== "string" || !value.trim()) {
    throw createCheckoutHandlerError(
      `"${fieldName}" is required and must be a non-empty string`,
      400
    );
  }

  return value.trim();
};

const normalizeCheckoutCartItems = (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw createCheckoutHandlerError("Checkout cart items are required", 400);
  }

  return cartItems.map((item, index) => {
    if (!isPlainObject(item)) {
      throw createCheckoutHandlerError(
        `Cart item at index ${index} must be an object`,
        400
      );
    }

    const productId = validateRequiredString(
      item.productId,
      `cartItems[${index}].productId`
    );

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw createCheckoutHandlerError(
        `"cartItems[${index}].quantity" must be a positive integer`,
        400
      );
    }

    return {
      productId,
      quantity,
    };
  });
};

const validateWarehouseForCheckout = (warehouse) => {
  if (!warehouse || typeof warehouse !== "object") {
    throw createCheckoutHandlerError(
      "The fulfillment warehouse was not found",
      404
    );
  }

  if (warehouse.active !== true) {
    throw createCheckoutHandlerError(
      "The fulfillment store is no longer active",
      409,
      {
        reason: "WAREHOUSE_INACTIVE",
        warehouseId: warehouse.id || null,
      }
    );
  }

  if (warehouse.status !== "open") {
    throw createCheckoutHandlerError(
      "The fulfillment store is not currently operational",
      409,
      {
        reason: "WAREHOUSE_NOT_OPERATIONAL",
        warehouseId: warehouse.id || null,
        warehouseStatus: warehouse.status || null,
      }
    );
  }

  return warehouse;
};

const validateProductForCheckout = (product, productId) => {
  if (!product) {
    throw createCheckoutHandlerError(
      `Product "${productId}" was not found`,
      409,
      {
        reason: "PRODUCT_NOT_FOUND",
        productId,
      }
    );
  }

  if (product.active !== true) {
    throw createCheckoutHandlerError(
      `Product "${productId}" is no longer available`,
      409,
      {
        reason: "PRODUCT_INACTIVE",
        productId,
      }
    );
  }

  return product;
};

const validateWarehouseInventoryItem = ({ warehouse, productId, quantity }) => {
  const inventoryEntry = warehouse?.inventory?.[productId];

  if (!inventoryEntry || inventoryEntry.active !== true) {
    throw createCheckoutHandlerError(
      `Product "${productId}" is not offered by this store`,
      409,
      {
        reason: "PRODUCT_NOT_OFFERED_BY_WAREHOUSE",

        warehouseId: warehouse?.id || null,

        productId,
      }
    );
  }

  const stock = Number(inventoryEntry.stock);

  if (!Number.isInteger(stock) || stock < 0) {
    throw createCheckoutHandlerError(
      `Product "${productId}" has invalid warehouse stock`,
      500,
      {
        warehouseId: warehouse?.id || null,

        productId,
      }
    );
  }

  if (stock < quantity) {
    throw createCheckoutHandlerError(
      `Insufficient stock for "${productId}"`,
      409,
      {
        reason: "INSUFFICIENT_STOCK",

        warehouseId: warehouse?.id || null,

        productId,

        requestedQuantity: quantity,

        availableStock: stock,
      }
    );
  }

  const sellingPriceInCents = Number(inventoryEntry.sellingPriceInCents);

  if (!Number.isInteger(sellingPriceInCents) || sellingPriceInCents < 0) {
    throw createCheckoutHandlerError(
      `Product "${productId}" has an invalid warehouse selling price`,
      500,
      {
        warehouseId: warehouse?.id || null,

        productId,
      }
    );
  }

  return {
    stock,

    sellingPriceInCents,

    active: true,
  };
};

const buildAuthoritativeCheckoutLine = ({
  product,
  warehouse,
  inventoryEntry,
  quantity,
}) => {
  const unitPriceInCents = inventoryEntry.sellingPriceInCents;

  const lineTotalInCents = unitPriceInCents * quantity;

  return {
    productId: product.id,

    quantity,

    product: {
      id: product.id,

      slug: product.slug,

      product_name: product.product_name,

      description: product.description,

      category: product.category,

      size: product.size,

      stockUnit: product.stockUnit,

      image: product.image || null,
      tax: product.tax || null,
    },

    warehouse: {
      id: warehouse.id,

      warehouse_name: warehouse.warehouse_name,
    },

    pricing: {
      unitPriceInCents,

      lineTotalInCents,
    },

    availability: {
      stock: inventoryEntry.stock,

      available: true,
    },
  };
};

const calculateCheckoutSubtotalInCents = (items = []) => {
  return items.reduce((subtotal, item) => {
    const lineTotalInCents = Number(item?.pricing?.lineTotalInCents);

    if (!Number.isInteger(lineTotalInCents) || lineTotalInCents < 0) {
      throw createCheckoutHandlerError(
        "Checkout contains an invalid line total",
        500
      );
    }

    return subtotal + lineTotalInCents;
  }, 0);
};

const getGoogleAddressComponent = (addressComponents = [], type) => {
  if (!Array.isArray(addressComponents)) {
    return null;
  }

  return (
    addressComponents.find((component) =>
      Array.isArray(component?.types) ? component.types.includes(type) : false
    ) || null
  );
};

const buildStripeAddressFromWarehouse = (warehouse) => {
  const addressComponents = warehouse?.geo?.address_components;

  if (!Array.isArray(addressComponents)) {
    throw createCheckoutHandlerError(
      "The fulfillment store does not have structured address information",
      500,
      {
        reason: "WAREHOUSE_TAX_ADDRESS_UNAVAILABLE",
        warehouseId: warehouse?.id || null,
      }
    );
  }

  const streetNumber =
    getGoogleAddressComponent(addressComponents, "street_number")?.long_name ||
    "";

  const route =
    getGoogleAddressComponent(addressComponents, "route")?.long_name || "";

  const city =
    getGoogleAddressComponent(addressComponents, "locality")?.long_name ||
    getGoogleAddressComponent(addressComponents, "postal_town")?.long_name ||
    "";

  const state =
    getGoogleAddressComponent(addressComponents, "administrative_area_level_1")
      ?.short_name || "";

  const postalCode =
    getGoogleAddressComponent(addressComponents, "postal_code")?.long_name ||
    "";

  const country =
    getGoogleAddressComponent(addressComponents, "country")?.short_name || "US";

  const line1 = [streetNumber, route].filter(Boolean).join(" ").trim();

  if (!line1 || !city || !state || !postalCode) {
    throw createCheckoutHandlerError(
      "The fulfillment store address is incomplete for tax calculation",
      500,
      {
        reason: "WAREHOUSE_TAX_ADDRESS_INCOMPLETE",
        warehouseId: warehouse?.id || null,
      }
    );
  }

  return {
    line1,
    city,
    state,
    postal_code: postalCode,
    country,
  };
};

const buildStripeAddressFromDeliveryAddress = (address) => {
  if (!isPlainObject(address)) {
    throw createCheckoutHandlerError(
      "A structured delivery address is required for tax calculation",
      400
    );
  }

  const line1 = validateRequiredString(
    address.street,
    "delivery.address.street"
  );

  const city = validateRequiredString(address.city, "delivery.address.city");

  const state = validateRequiredString(
    address.state,
    "delivery.address.state"
  ).toUpperCase();

  const postalCode = validateRequiredString(
    address.postalCode,
    "delivery.address.postalCode"
  );

  const country =
    typeof address.country === "string" && address.country.trim()
      ? address.country.trim().toUpperCase()
      : "US";

  return {
    line1,

    ...(typeof address.unit === "string" && address.unit.trim()
      ? {
          line2: address.unit.trim(),
        }
      : {}),

    city,
    state,
    postal_code: postalCode,
    country,
  };
};

const buildStripeTaxLineItems = (items = []) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw createCheckoutHandlerError(
      "Authoritative checkout items are required for tax calculation",
      500
    );
  }

  return items.map((item, index) => {
    const amount = Number(item?.pricing?.lineTotalInCents);

    const quantity = Number(item?.quantity);

    const stripeTaxCode = item?.product?.tax?.stripeTaxCode;

    const taxBehavior = item?.product?.tax?.behavior;

    if (!Number.isInteger(amount) || amount < 0) {
      throw createCheckoutHandlerError(
        `Checkout item "${item?.productId || index}" has an invalid tax amount`,
        500
      );
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw createCheckoutHandlerError(
        `Checkout item "${item?.productId || index}" has an invalid quantity`,
        500
      );
    }

    if (typeof stripeTaxCode !== "string" || !stripeTaxCode.trim()) {
      throw createCheckoutHandlerError(
        `Checkout item "${
          item?.productId || index
        }" is missing its Stripe tax code`,
        500
      );
    }

    if (!["exclusive", "inclusive"].includes(taxBehavior)) {
      throw createCheckoutHandlerError(
        `Checkout item "${
          item?.productId || index
        }" has an invalid tax behavior`,
        500
      );
    }

    return {
      amount,
      quantity,

      reference: `${item.productId}-${index}`,

      tax_code: stripeTaxCode.trim(),

      tax_behavior: taxBehavior,
    };
  });
};

module.exports = {
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
};
