const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

export const formatCentsToCurrency = (
  amountInCents,
  { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY } = {}
) => {
  if (!Number.isInteger(amountInCents)) {
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amountInCents / 100);
};

export const normalizeWarehouseInventoryEntry = (productId, inventoryEntry) => {
  if (
    !productId ||
    typeof productId !== "string" ||
    !isPlainObject(inventoryEntry)
  ) {
    return null;
  }

  const stock = Number(inventoryEntry.stock);
  const sellingPriceInCents = Number(inventoryEntry.sellingPriceInCents);

  return {
    productId,

    stock: Number.isInteger(stock) && stock >= 0 ? stock : 0,

    sellingPriceInCents:
      Number.isInteger(sellingPriceInCents) && sellingPriceInCents >= 0
        ? sellingPriceInCents
        : null,

    active: inventoryEntry.active === true,

    updatedAt:
      typeof inventoryEntry.updatedAt === "string"
        ? inventoryEntry.updatedAt
        : null,
  };
};

export const normalizeWarehouseInventory = (inventory = {}) => {
  if (!isPlainObject(inventory)) {
    return {};
  }

  return Object.entries(inventory).reduce(
    (normalizedInventory, [productId, inventoryEntry]) => {
      const normalizedEntry = normalizeWarehouseInventoryEntry(
        productId,
        inventoryEntry
      );

      if (normalizedEntry) {
        normalizedInventory[productId] = normalizedEntry;
      }

      return normalizedInventory;
    },
    {}
  );
};

export const normalizeClosestWarehouseResponse = (response) => {
  if (!isPlainObject(response)) {
    return null;
  }

  const warehouse = isPlainObject(response.warehouse)
    ? response.warehouse
    : null;

  const customerContext = isPlainObject(response.customerContext)
    ? response.customerContext
    : {};

  if (!warehouse) {
    return null;
  }

  const distanceMiles = Number(customerContext.distance?.miles);

  const pickup = customerContext.fulfillment?.pickup || {};

  const localDelivery = customerContext.fulfillment?.localDelivery || {};

  const pickupDistanceWarning =
    customerContext.fulfillment?.pickupDistanceWarning || {};

  return {
    warehouse: {
      ...warehouse,

      inventory: normalizeWarehouseInventory(warehouse.inventory),
    },

    customerContext: {
      distance: {
        miles: Number.isFinite(distanceMiles) ? distanceMiles : null,
      },

      fulfillment: {
        pickup: {
          available: pickup.available === true,

          preparationTimeMinutes: Number.isInteger(
            Number(pickup.preparationTimeMinutes)
          )
            ? Number(pickup.preparationTimeMinutes)
            : null,
        },

        localDelivery: {
          available: localDelivery.available === true,

          radiusMiles: Number.isFinite(Number(localDelivery.radiusMiles))
            ? Number(localDelivery.radiusMiles)
            : null,

          estimatedTimeMinutes: isPlainObject(
            localDelivery.estimatedTimeMinutes
          )
            ? {
                minimum: Number.isInteger(
                  Number(localDelivery.estimatedTimeMinutes.minimum)
                )
                  ? Number(localDelivery.estimatedTimeMinutes.minimum)
                  : null,

                maximum: Number.isInteger(
                  Number(localDelivery.estimatedTimeMinutes.maximum)
                )
                  ? Number(localDelivery.estimatedTimeMinutes.maximum)
                  : null,
              }
            : null,

          provider: isPlainObject(localDelivery.provider)
            ? {
                type: localDelivery.provider.type || null,

                name: localDelivery.provider.name || null,
              }
            : null,

          reason: localDelivery.reason || null,
        },

        pickupDistanceWarning: {
          shouldDisplay: pickupDistanceWarning.shouldDisplay === true,

          reason: pickupDistanceWarning.reason || null,

          distanceMiles: Number.isFinite(
            Number(pickupDistanceWarning.distanceMiles)
          )
            ? Number(pickupDistanceWarning.distanceMiles)
            : null,

          deliveryRadiusMiles: Number.isFinite(
            Number(pickupDistanceWarning.deliveryRadiusMiles)
          )
            ? Number(pickupDistanceWarning.deliveryRadiusMiles)
            : null,

          messageKey: pickupDistanceWarning.messageKey || null,
        },
      },
    },
  };
};

export const mergeProductWithWarehouseInventory = (
  product,
  warehouse,
  { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY } = {}
) => {
  if (!product || typeof product !== "object") {
    return null;
  }

  const inventoryEntry = warehouse?.inventory?.[product.id] || null;

  const warehouseProductActive = inventoryEntry?.active === true;

  const stock = warehouseProductActive ? inventoryEntry.stock : 0;

  const sellingPriceInCents = warehouseProductActive
    ? inventoryEntry.sellingPriceInCents
    : null;

  const soldOut = warehouseProductActive && stock <= 0;

  return {
    ...product,

    warehouseId: warehouse?.id || null,

    warehouseName: warehouse?.warehouse_name || "",

    warehouseProductActive,

    stock,

    sellingPriceInCents,

    sellingPrice:
      sellingPriceInCents !== null ? sellingPriceInCents / 100 : null,

    sellingPriceLabel:
      sellingPriceInCents !== null
        ? formatCentsToCurrency(sellingPriceInCents, {
            locale,
            currency,
          })
        : "",

    soldOut,

    inventoryUpdatedAt: inventoryEntry?.updatedAt || null,
  };
};

export const mergeProductsWithWarehouseInventory = (
  products = [],
  warehouse,
  options = {}
) => {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .map((product) =>
      mergeProductWithWarehouseInventory(product, warehouse, options)
    )
    .filter(Boolean)
    .filter(
      (product) =>
        product.active === true && product.warehouseProductActive === true
    );
};
