import apiClient from "../../api/api.client";

const WAREHOUSES_CATALOG_PATH = "/api/warehouses-catalog";

const validateWarehouseId = (warehouseId) => {
  if (typeof warehouseId !== "string" || !warehouseId.trim()) {
    throw new Error("A valid warehouse id is required");
  }

  return warehouseId.trim();
};

const validateCoordinates = ({ lat, lng } = {}) => {
  const normalizedLat = Number(lat);
  const normalizedLng = Number(lng);

  if (!Number.isFinite(normalizedLat)) {
    throw new Error(
      "A valid latitude is required to find the closest warehouse"
    );
  }

  if (!Number.isFinite(normalizedLng)) {
    throw new Error(
      "A valid longitude is required to find the closest warehouse"
    );
  }

  if (normalizedLat < -90 || normalizedLat > 90) {
    throw new Error("Latitude must be between -90 and 90");
  }

  if (normalizedLng < -180 || normalizedLng > 180) {
    throw new Error("Longitude must be between -180 and 180");
  }

  return {
    lat: normalizedLat,
    lng: normalizedLng,
  };
};

const validateObjectPayload = (payload, errorMessage) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error(errorMessage);
  }

  return payload;
};

export const getWarehousesCatalogRequest = async ({ active, signal } = {}) => {
  const { data } = await apiClient.get(WAREHOUSES_CATALOG_PATH, {
    params: {
      active,
    },

    signal,
  });

  return data;
};

export const getWarehouseByIdRequest = async (warehouseId, { signal } = {}) => {
  const normalizedWarehouseId = validateWarehouseId(warehouseId);

  const { data } = await apiClient.get(
    `${WAREHOUSES_CATALOG_PATH}/${encodeURIComponent(normalizedWarehouseId)}`,
    {
      signal,
    }
  );

  return data;
};

export const getClosestWarehouseRequest = async (
  coordinates,
  { signal } = {}
) => {
  const { lat, lng } = validateCoordinates(coordinates);

  const { data } = await apiClient.get(`${WAREHOUSES_CATALOG_PATH}/closest`, {
    params: {
      lat,
      lng,
    },

    signal,
  });

  return data;
};

export const getWarehousesByDistanceRequest = async (
  coordinates,
  { signal } = {}
) => {
  const { lat, lng } = validateCoordinates(coordinates);

  const { data } = await apiClient.get(
    `${WAREHOUSES_CATALOG_PATH}/by-distance`,
    {
      params: {
        lat,
        lng,
      },

      signal,
    }
  );

  return data;
};

export const createWarehouseRequest = async (warehouse, { signal } = {}) => {
  const validatedWarehouse = validateObjectPayload(
    warehouse,
    "A valid warehouse object is required"
  );

  const { data } = await apiClient.post(
    WAREHOUSES_CATALOG_PATH,
    validatedWarehouse,
    {
      signal,
    }
  );

  return data;
};

export const updateWarehouseByIdRequest = async (
  warehouseId,
  updates,
  { signal } = {}
) => {
  const normalizedWarehouseId = validateWarehouseId(warehouseId);

  const validatedUpdates = validateObjectPayload(
    updates,
    "A valid warehouse updates object is required"
  );

  const { data } = await apiClient.put(
    `${WAREHOUSES_CATALOG_PATH}/${encodeURIComponent(normalizedWarehouseId)}`,
    validatedUpdates,
    {
      signal,
    }
  );

  return data;
};

export const updateWarehouseInventoryRequest = async (
  warehouseId,
  inventoryUpdates,
  { signal } = {}
) => {
  const normalizedWarehouseId = validateWarehouseId(warehouseId);

  const validatedInventoryUpdates = validateObjectPayload(
    inventoryUpdates,
    "A valid inventory updates object is required"
  );

  const { data } = await apiClient.patch(
    `${WAREHOUSES_CATALOG_PATH}/${encodeURIComponent(
      normalizedWarehouseId
    )}/inventory`,
    validatedInventoryUpdates,
    {
      signal,
    }
  );

  return data;
};

export const decrementWarehouseInventoryRequest = async (
  warehouseId,
  orderItems,
  { signal } = {}
) => {
  const normalizedWarehouseId = validateWarehouseId(warehouseId);

  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error("At least one order item is required");
  }

  const { data } = await apiClient.post(
    `${WAREHOUSES_CATALOG_PATH}/${encodeURIComponent(
      normalizedWarehouseId
    )}/decrement-inventory`,
    {
      orderItems,
    },
    {
      signal,
    }
  );

  return data;
};

export const deleteWarehouseByIdRequest = async (
  warehouseId,
  { signal } = {}
) => {
  const normalizedWarehouseId = validateWarehouseId(warehouseId);

  const { data } = await apiClient.delete(
    `${WAREHOUSES_CATALOG_PATH}/${encodeURIComponent(normalizedWarehouseId)}`,
    {
      signal,
    }
  );

  return data;
};
