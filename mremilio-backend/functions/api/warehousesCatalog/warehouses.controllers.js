/* eslint-disable */

const { v4: uuidv4 } = require("uuid");

const firebaseController = require("../../fb");

const {
  WAREHOUSE_COLLECTION,
  PRODUCTS_COLLECTION,
  WAREHOUSE_STATUS,
  WAREHOUSE_STATUS_VALUES,
  DELIVERY_PROVIDER_TYPE_VALUES,
} = require("./warehouses.constants");

const {
  forwardGeocodeAddress,
  findClosestWarehouse,
  sortWarehousesByDistance,
  buildFulfillmentAvailability,
  normalizeWarehouseInventory,
  normalizeInventoryEntry,
  validateWarehouseSellingPrice,
  validateCoordinates,
} = require("./warehouses.handlers");

const createControllerError = (message, statusCode = 500, details = null) => {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.details = details;

  return error;
};

const getTimestamp = () => new Date().toISOString();

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const validateRequiredString = (value, fieldName) => {
  if (typeof value !== "string" || !value.trim()) {
    throw createControllerError(
      `"${fieldName}" is required and must be a non-empty string`,
      400
    );
  }

  return value.trim();
};

const validateWarehouseStatus = (status) => {
  if (!WAREHOUSE_STATUS_VALUES.includes(status)) {
    throw createControllerError(`Invalid warehouse status: "${status}"`, 400, {
      allowedValues: WAREHOUSE_STATUS_VALUES,
    });
  }

  return status;
};

const validateWarehouseInformation = (warehouseInformation) => {
  if (!isPlainObject(warehouseInformation)) {
    throw createControllerError(
      '"warehouse_information" must be an object',
      400
    );
  }

  const representative = warehouseInformation.representative;

  if (representative !== undefined && !isPlainObject(representative)) {
    throw createControllerError(
      '"warehouse_information.representative" must be an object',
      400
    );
  }
};

const validateEstimatedDeliveryTime = (estimatedTimeMinutes) => {
  if (!isPlainObject(estimatedTimeMinutes)) {
    throw createControllerError(
      '"fulfillment.localDelivery.estimatedTimeMinutes" must be an object',
      400
    );
  }

  const minimum = Number(estimatedTimeMinutes.minimum);

  const maximum = Number(estimatedTimeMinutes.maximum);

  if (!Number.isInteger(minimum) || minimum < 0) {
    throw createControllerError(
      '"fulfillment.localDelivery.estimatedTimeMinutes.minimum" must be a non-negative integer',
      400
    );
  }

  if (!Number.isInteger(maximum) || maximum < minimum) {
    throw createControllerError(
      '"fulfillment.localDelivery.estimatedTimeMinutes.maximum" must be an integer greater than or equal to minimum',
      400
    );
  }
};

const validateFulfillment = (fulfillment) => {
  if (!isPlainObject(fulfillment)) {
    throw createControllerError('"fulfillment" must be an object', 400);
  }

  const pickup = fulfillment.pickup;

  if (!isPlainObject(pickup)) {
    throw createControllerError('"fulfillment.pickup" must be an object', 400);
  }

  if (typeof pickup.enabled !== "boolean") {
    throw createControllerError(
      '"fulfillment.pickup.enabled" must be a boolean',
      400
    );
  }

  const pickupPreparationTime = Number(pickup.preparationTimeMinutes);

  if (!Number.isInteger(pickupPreparationTime) || pickupPreparationTime < 0) {
    throw createControllerError(
      '"fulfillment.pickup.preparationTimeMinutes" must be a non-negative integer',
      400
    );
  }

  const localDelivery = fulfillment.localDelivery;

  if (!isPlainObject(localDelivery)) {
    throw createControllerError(
      '"fulfillment.localDelivery" must be an object',
      400
    );
  }

  if (typeof localDelivery.enabled !== "boolean") {
    throw createControllerError(
      '"fulfillment.localDelivery.enabled" must be a boolean',
      400
    );
  }

  const radiusMiles = Number(localDelivery.radiusMiles);

  if (!Number.isFinite(radiusMiles) || radiusMiles <= 0) {
    throw createControllerError(
      '"fulfillment.localDelivery.radiusMiles" must be a positive number',
      400
    );
  }

  validateEstimatedDeliveryTime(localDelivery.estimatedTimeMinutes);

  if (!isPlainObject(localDelivery.provider)) {
    throw createControllerError(
      '"fulfillment.localDelivery.provider" must be an object',
      400
    );
  }

  if (!DELIVERY_PROVIDER_TYPE_VALUES.includes(localDelivery.provider.type)) {
    throw createControllerError(
      `Invalid delivery provider type: "${localDelivery.provider.type}"`,
      400,
      {
        allowedValues: DELIVERY_PROVIDER_TYPE_VALUES,
      }
    );
  }

  validateRequiredString(
    localDelivery.provider.name,
    "fulfillment.localDelivery.provider.name"
  );
};

const validateWarehousePayload = (warehouse) => {
  if (!isPlainObject(warehouse)) {
    throw createControllerError("Warehouse must be an object", 400);
  }

  validateRequiredString(warehouse.warehouse_name, "warehouse_name");

  validateRequiredString(warehouse.physical_address, "physical_address");

  if (typeof warehouse.active !== "boolean") {
    throw createControllerError('"active" must be a boolean', 400);
  }

  validateWarehouseStatus(warehouse.status);

  validateWarehouseInformation(warehouse.warehouse_information);

  validateFulfillment(warehouse.fulfillment);

  if (!isPlainObject(warehouse.inventory)) {
    throw createControllerError('"inventory" must be an object map', 400);
  }
};

const normalizeWarehouseId = (warehouse) => {
  const providedId =
    typeof warehouse?.id === "string" ? warehouse.id.trim() : "";

  return providedId || uuidv4();
};

const getProductById = async (productId) => {
  const productSnapshot = await firebaseController.db
    .collection(PRODUCTS_COLLECTION)
    .doc(String(productId))
    .get();

  return productSnapshot.exists ? productSnapshot.data() : null;
};

const validateInventoryAgainstCatalog = async (inventory) => {
  const entries = Object.entries(inventory);

  await Promise.all(
    entries.map(async ([productId, inventoryEntry]) => {
      const product = await getProductById(productId);

      if (!product) {
        throw createControllerError(
          `Catalog product "${productId}" was not found`,
          400
        );
      }

      validateWarehouseSellingPrice({
        productId,
        manufacturerPriceInCents: product.manufacturerPriceInCents,
        sellingPriceInCents: inventoryEntry.sellingPriceInCents,
      });
    })
  );

  return inventory;
};

const buildWarehousePayload = ({
  warehouse,
  warehouseId,
  geo,
  normalizedInventory,
  createdAt,
}) => {
  const now = getTimestamp();

  return {
    id: warehouseId,

    warehouse_name: warehouse.warehouse_name.trim(),

    active: warehouse.active,

    status: warehouse.status || WAREHOUSE_STATUS.OPEN,

    physical_address: warehouse.physical_address.trim(),

    geo,

    warehouse_information: {
      phone: warehouse.warehouse_information?.phone || "",

      email: warehouse.warehouse_information?.email || "",

      opening_time: warehouse.warehouse_information?.opening_time || "",

      closing_time: warehouse.warehouse_information?.closing_time || "",

      representative: {
        name: warehouse.warehouse_information?.representative?.name || "",

        phone_number:
          warehouse.warehouse_information?.representative?.phone_number || "",

        email: warehouse.warehouse_information?.representative?.email || "",
      },
    },

    fulfillment: {
      pickup: {
        enabled: warehouse.fulfillment.pickup.enabled,

        preparationTimeMinutes: Number(
          warehouse.fulfillment.pickup.preparationTimeMinutes
        ),
      },

      localDelivery: {
        enabled: warehouse.fulfillment.localDelivery.enabled,

        radiusMiles: Number(warehouse.fulfillment.localDelivery.radiusMiles),

        estimatedTimeMinutes: {
          minimum: Number(
            warehouse.fulfillment.localDelivery.estimatedTimeMinutes.minimum
          ),

          maximum: Number(
            warehouse.fulfillment.localDelivery.estimatedTimeMinutes.maximum
          ),
        },

        provider: {
          type: warehouse.fulfillment.localDelivery.provider.type,

          name: warehouse.fulfillment.localDelivery.provider.name.trim(),
        },
      },
    },

    inventory: normalizedInventory,

    createdAt: createdAt || now,
    updatedAt: now,
  };
};

const getWarehouseById = async (warehouseId) => {
  if (!warehouseId) {
    throw createControllerError("Warehouse id is required", 400);
  }

  const warehouseSnapshot = await firebaseController.db
    .collection(WAREHOUSE_COLLECTION)
    .doc(String(warehouseId))
    .get();

  return warehouseSnapshot.exists ? warehouseSnapshot.data() : null;
};

const getAllWarehouses = async () => {
  const warehousesSnapshot = await firebaseController.db
    .collection(WAREHOUSE_COLLECTION)
    .get();

  return warehousesSnapshot.docs.map((document) => document.data());
};

const getActiveWarehouses = async () => {
  const warehousesSnapshot = await firebaseController.db
    .collection(WAREHOUSE_COLLECTION)
    .where("active", "==", true)
    .get();

  return warehousesSnapshot.docs.map((document) => document.data());
};

const getWarehousesByDistance = async ({ lat, lng }) => {
  const customerCoordinates = validateCoordinates(
    {
      lat,
      lng,
    },
    "customerCoordinates"
  );

  const activeWarehouses = await getActiveWarehouses();

  const warehousesByDistance = sortWarehousesByDistance(
    activeWarehouses,
    customerCoordinates
  );

  return warehousesByDistance.map((warehouse) => {
    const distanceMiles = warehouse.distance.miles;

    const fulfillmentAvailability = buildFulfillmentAvailability({
      warehouse,
      distanceMiles,
    });

    const { distance: _warehouseDistance, ...warehouseWithoutDistance } =
      warehouse;

    return {
      warehouse: warehouseWithoutDistance,

      customerContext: {
        distance: {
          miles: distanceMiles,
        },

        fulfillment: fulfillmentAvailability,
      },
    };
  });
};

const getClosestWarehouse = async ({ lat, lng }) => {
  const customerCoordinates = validateCoordinates(
    {
      lat,
      lng,
    },
    "customerCoordinates"
  );

  const activeWarehouses = await getActiveWarehouses();

  const closestWarehouse = findClosestWarehouse(
    activeWarehouses,
    customerCoordinates
  );

  if (!closestWarehouse) {
    return null;
  }

  const distanceMiles = closestWarehouse.distance.miles;

  const fulfillmentAvailability = buildFulfillmentAvailability({
    warehouse: closestWarehouse,
    distanceMiles,
  });

  const { distance: _warehouseDistance, ...warehouseWithoutDistance } =
    closestWarehouse;

  return {
    warehouse: warehouseWithoutDistance,

    customerContext: {
      distance: {
        miles: distanceMiles,
      },

      fulfillment: fulfillmentAvailability,
    },
  };
};

const createWarehouse = async (warehouse) => {
  validateWarehousePayload(warehouse);

  const warehouseId = normalizeWarehouseId(warehouse);

  const warehouseReference = firebaseController.db
    .collection(WAREHOUSE_COLLECTION)
    .doc(warehouseId);

  const existingWarehouse = await warehouseReference.get();

  if (existingWarehouse.exists) {
    throw createControllerError(
      `Warehouse with id "${warehouseId}" already exists`,
      409
    );
  }

  const geo = await forwardGeocodeAddress(warehouse.physical_address);

  const normalizedInventory = normalizeWarehouseInventory(warehouse.inventory);

  await validateInventoryAgainstCatalog(normalizedInventory);

  const payload = buildWarehousePayload({
    warehouse,
    warehouseId,
    geo,
    normalizedInventory,
  });

  await warehouseReference.set(payload, {
    merge: false,
  });

  const createdWarehouse = await warehouseReference.get();

  return createdWarehouse.data();
};

const updateWarehouseById = async (warehouseId, updates) => {
  if (!warehouseId) {
    throw createControllerError("Warehouse id is required", 400);
  }

  if (!isPlainObject(updates)) {
    throw createControllerError("Warehouse updates must be an object", 400);
  }

  const warehouseReference = firebaseController.db
    .collection(WAREHOUSE_COLLECTION)
    .doc(String(warehouseId));

  const existingWarehouseSnapshot = await warehouseReference.get();

  if (!existingWarehouseSnapshot.exists) {
    return null;
  }

  const existingWarehouse = existingWarehouseSnapshot.data();

  const candidateWarehouse = {
    ...existingWarehouse,
    ...updates,

    id: existingWarehouse.id,

    warehouse_information: {
      ...existingWarehouse.warehouse_information,
      ...(updates.warehouse_information || {}),

      representative: {
        ...existingWarehouse.warehouse_information?.representative,

        ...(updates.warehouse_information?.representative || {}),
      },
    },

    fulfillment: {
      ...existingWarehouse.fulfillment,
      ...(updates.fulfillment || {}),

      pickup: {
        ...existingWarehouse.fulfillment?.pickup,

        ...(updates.fulfillment?.pickup || {}),
      },

      localDelivery: {
        ...existingWarehouse.fulfillment?.localDelivery,

        ...(updates.fulfillment?.localDelivery || {}),

        estimatedTimeMinutes: {
          ...existingWarehouse.fulfillment?.localDelivery?.estimatedTimeMinutes,

          ...(updates.fulfillment?.localDelivery?.estimatedTimeMinutes || {}),
        },

        provider: {
          ...existingWarehouse.fulfillment?.localDelivery?.provider,

          ...(updates.fulfillment?.localDelivery?.provider || {}),
        },
      },
    },

    inventory:
      updates.inventory !== undefined
        ? updates.inventory
        : existingWarehouse.inventory,
  };

  validateWarehousePayload(candidateWarehouse);

  const addressChanged =
    candidateWarehouse.physical_address !== existingWarehouse.physical_address;

  const geo = addressChanged
    ? await forwardGeocodeAddress(candidateWarehouse.physical_address)
    : existingWarehouse.geo;

  const normalizedInventory = normalizeWarehouseInventory(
    candidateWarehouse.inventory
  );

  await validateInventoryAgainstCatalog(normalizedInventory);

  const payload = buildWarehousePayload({
    warehouse: candidateWarehouse,
    warehouseId: String(warehouseId),
    geo,
    normalizedInventory,
    createdAt: existingWarehouse.createdAt,
  });

  await warehouseReference.set(payload, {
    merge: false,
  });

  const updatedWarehouse = await warehouseReference.get();

  return updatedWarehouse.data();
};

const updateWarehouseInventory = async (warehouseId, inventoryUpdates) => {
  if (!warehouseId) {
    throw createControllerError("Warehouse id is required", 400);
  }

  if (!isPlainObject(inventoryUpdates)) {
    throw createControllerError("Inventory updates must be an object map", 400);
  }

  const warehouseReference = firebaseController.db
    .collection(WAREHOUSE_COLLECTION)
    .doc(String(warehouseId));

  const now = getTimestamp();

  const updatedInventory = await firebaseController.db.runTransaction(
    async (transaction) => {
      const warehouseSnapshot = await transaction.get(warehouseReference);

      if (!warehouseSnapshot.exists) {
        throw createControllerError(
          `Warehouse "${warehouseId}" was not found`,
          404
        );
      }

      const warehouse = warehouseSnapshot.data();

      const currentInventory = warehouse.inventory || {};

      const mergedInventory = {
        ...currentInventory,
      };

      for (const [productId, inventoryUpdate] of Object.entries(
        inventoryUpdates
      )) {
        const currentEntry = currentInventory[productId] || {};

        mergedInventory[productId] = normalizeInventoryEntry(productId, {
          ...currentEntry,
          ...inventoryUpdate,
          updatedAt: now,
        });
      }

      await validateInventoryAgainstCatalog(mergedInventory);

      transaction.update(warehouseReference, {
        inventory: mergedInventory,
        updatedAt: now,
      });

      return mergedInventory;
    }
  );

  const updatedWarehouse = await warehouseReference.get();

  return {
    warehouse: updatedWarehouse.data(),
    inventory: updatedInventory,
  };
};

const decrementWarehouseInventoryFromOrder = async ({
  warehouseId,
  orderItems,
}) => {
  if (!warehouseId) {
    throw createControllerError("Warehouse id is required", 400);
  }

  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw createControllerError("Order items are required", 400);
  }

  const warehouseReference = firebaseController.db
    .collection(WAREHOUSE_COLLECTION)
    .doc(String(warehouseId));

  const now = getTimestamp();

  await firebaseController.db.runTransaction(async (transaction) => {
    const warehouseSnapshot = await transaction.get(warehouseReference);

    if (!warehouseSnapshot.exists) {
      throw createControllerError(
        `Warehouse "${warehouseId}" was not found`,
        404
      );
    }

    const warehouse = warehouseSnapshot.data();

    const inventory = {
      ...(warehouse.inventory || {}),
    };

    for (const orderItem of orderItems) {
      const productId = orderItem?.productId;

      const quantity = Number(orderItem?.quantity);

      if (!productId || typeof productId !== "string") {
        throw createControllerError(
          "Every order item must contain a valid productId",
          400
        );
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw createControllerError(
          `Order quantity for "${productId}" must be a positive integer`,
          400
        );
      }

      const inventoryEntry = inventory[productId];

      if (!inventoryEntry || inventoryEntry.active !== true) {
        throw createControllerError(
          `Product "${productId}" is not offered by this warehouse`,
          409
        );
      }

      const currentStock = Number(inventoryEntry.stock);

      if (currentStock < quantity) {
        throw createControllerError(
          `Insufficient stock for "${productId}"`,
          409,
          {
            productId,
            available: currentStock,
            requested: quantity,
          }
        );
      }

      inventory[productId] = {
        ...inventoryEntry,
        stock: currentStock - quantity,
        updatedAt: now,
      };
    }

    transaction.update(warehouseReference, {
      inventory,
      updatedAt: now,
    });
  });

  return getWarehouseById(warehouseId);
};

const deleteWarehouseById = async (warehouseId) => {
  if (!warehouseId) {
    throw createControllerError("Warehouse id is required", 400);
  }

  const warehouseReference = firebaseController.db
    .collection(WAREHOUSE_COLLECTION)
    .doc(String(warehouseId));

  const existingWarehouse = await warehouseReference.get();

  if (!existingWarehouse.exists) {
    return null;
  }

  await warehouseReference.delete();

  return {
    deleted: true,
    id: String(warehouseId),
  };
};

module.exports = {
  getWarehouseById,
  getAllWarehouses,
  getActiveWarehouses,
  getClosestWarehouse,
  getWarehousesByDistance,

  createWarehouse,
  updateWarehouseById,
  updateWarehouseInventory,
  decrementWarehouseInventoryFromOrder,
  deleteWarehouseById,
};
