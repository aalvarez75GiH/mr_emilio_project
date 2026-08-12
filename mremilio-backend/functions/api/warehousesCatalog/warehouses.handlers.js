/* eslint-disable */

const axios = require("axios");

const GOOGLE_GEOCODING_URL =
  "https://maps.googleapis.com/maps/api/geocode/json";
const GOOGLE_ROUTES_URL =
  "https://routes.googleapis.com/directions/v2:computeRoutes";

const METERS_PER_MILE = 1609.344;

const EARTH_RADIUS_MILES = 3958.8;

const WAREHOUSE_PRICE_RULES = Object.freeze({
  recommendedMarkupPercentage: 15,
  maximumMarkupPercentage: 30,
});

const createHandlerError = (message, statusCode = 500, details = null) => {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.details = details;

  return error;
};

const normalizeCoordinate = (value, fieldName) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    throw createHandlerError(`"${fieldName}" must be a valid number`, 400);
  }

  return numericValue;
};

const validateCoordinates = ({ lat, lng } = {}, fieldName = "coordinates") => {
  const normalizedLat = normalizeCoordinate(lat, `${fieldName}.lat`);

  const normalizedLng = normalizeCoordinate(lng, `${fieldName}.lng`);

  if (normalizedLat < -90 || normalizedLat > 90) {
    throw createHandlerError(
      `"${fieldName}.lat" must be between -90 and 90`,
      400
    );
  }

  if (normalizedLng < -180 || normalizedLng > 180) {
    throw createHandlerError(
      `"${fieldName}.lng" must be between -180 and 180`,
      400
    );
  }

  return {
    lat: normalizedLat,
    lng: normalizedLng,
  };
};

const forwardGeocodeAddress = async (physicalAddress) => {
  if (
    !physicalAddress ||
    typeof physicalAddress !== "string" ||
    !physicalAddress.trim()
  ) {
    throw createHandlerError(
      "A valid physical address is required for geocoding",
      400
    );
  }

  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    throw createHandlerError(
      "Missing GOOGLE_MAPS_API_KEY environment variable",
      500
    );
  }

  try {
    const response = await axios.get(GOOGLE_GEOCODING_URL, {
      params: {
        address: physicalAddress.trim(),
        key: googleMapsApiKey,
      },

      timeout: 10000,
    });

    const responseData = response.data;

    if (
      responseData?.status !== "OK" ||
      !Array.isArray(responseData?.results) ||
      responseData.results.length === 0
    ) {
      throw createHandlerError(
        `Unable to geocode warehouse address: ${
          responseData?.status || "UNKNOWN_ERROR"
        }`,
        422,
        {
          googleStatus: responseData?.status || null,
          googleErrorMessage: responseData?.error_message || null,
        }
      );
    }

    const geocodingResult = responseData.results[0];

    const location = validateCoordinates(
      {
        lat: geocodingResult.geometry?.location?.lat,
        lng: geocodingResult.geometry?.location?.lng,
      },
      "geo"
    );

    return {
      formatted_address:
        geocodingResult.formatted_address || physicalAddress.trim(),

      place_id: geocodingResult.place_id || "",

      location_type: geocodingResult.geometry?.location_type || "",

      lat: location.lat,
      lng: location.lng,

      address_components: Array.isArray(geocodingResult.address_components)
        ? geocodingResult.address_components
        : [],
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    if (error.code === "ECONNABORTED") {
      throw createHandlerError("Google geocoding request timed out", 504);
    }

    throw createHandlerError("Unable to geocode warehouse address", 502, {
      message: error.message,
      response: error.response?.data || null,
    });
  }
};

const degreesToRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const calculateHaversineDistanceMiles = (
  originCoordinates,
  destinationCoordinates
) => {
  const origin = validateCoordinates(originCoordinates, "origin");

  const destination = validateCoordinates(
    destinationCoordinates,
    "destination"
  );

  const latitudeDifference = degreesToRadians(destination.lat - origin.lat);

  const longitudeDifference = degreesToRadians(destination.lng - origin.lng);

  const originLatitude = degreesToRadians(origin.lat);
  const destinationLatitude = degreesToRadians(destination.lat);

  const haversineValue =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

  const distanceMiles = EARTH_RADIUS_MILES * angularDistance;

  return Number(distanceMiles.toFixed(2));
};

const getDrivingRouteDistance = async ({
  originCoordinates,
  destinationCoordinates,
}) => {
  const origin = validateCoordinates(originCoordinates, "originCoordinates");

  const destination = validateCoordinates(
    destinationCoordinates,
    "destinationCoordinates"
  );

  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    throw createHandlerError(
      "Missing GOOGLE_MAPS_API_KEY environment variable",
      500
    );
  }

  try {
    const response = await axios.post(
      GOOGLE_ROUTES_URL,
      {
        origin: {
          location: {
            latLng: {
              latitude: origin.lat,
              longitude: origin.lng,
            },
          },
        },

        destination: {
          location: {
            latLng: {
              latitude: destination.lat,
              longitude: destination.lng,
            },
          },
        },

        travelMode: "DRIVE",

        routingPreference: "TRAFFIC_UNAWARE",

        computeAlternativeRoutes: false,

        units: "IMPERIAL",
      },
      {
        headers: {
          "Content-Type": "application/json",

          "X-Goog-Api-Key": googleMapsApiKey,

          "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
        },

        timeout: 10000,
      }
    );

    const route = response.data?.routes?.[0];

    const distanceMeters = Number(route?.distanceMeters);

    if (!Number.isFinite(distanceMeters) || distanceMeters < 0) {
      throw createHandlerError(
        "Google Routes did not return a valid driving distance",
        502,
        {
          response: response.data || null,
        }
      );
    }

    const distanceMiles = Number((distanceMeters / METERS_PER_MILE).toFixed(2));

    return {
      distanceMeters,

      distanceMiles,

      duration: route?.duration || null,

      travelMode: "DRIVE",

      source: "google_routes",
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    if (error.code === "ECONNABORTED") {
      throw createHandlerError("Google Routes request timed out", 504);
    }

    throw createHandlerError("Unable to calculate driving route", 502, {
      message: error.message,

      googleStatus: error.response?.status || null,

      googleResponse: error.response?.data || null,
    });
  }
};

const sortWarehousesByDistance = (warehouses = [], customerCoordinates) => {
  if (!Array.isArray(warehouses)) {
    throw createHandlerError("Warehouses must be provided as an array", 400);
  }

  const activeWarehouses = warehouses.filter(
    (warehouse) =>
      warehouse?.active === true &&
      Number.isFinite(Number(warehouse?.geo?.lat)) &&
      Number.isFinite(Number(warehouse?.geo?.lng))
  );

  if (activeWarehouses.length === 0) {
    return [];
  }

  return activeWarehouses
    .map((warehouse) => {
      const distanceMiles = calculateHaversineDistanceMiles(
        customerCoordinates,
        {
          lat: warehouse.geo.lat,
          lng: warehouse.geo.lng,
        }
      );

      return {
        ...warehouse,

        distance: {
          miles: distanceMiles,
        },
      };
    })
    .sort(
      (warehouseA, warehouseB) =>
        warehouseA.distance.miles - warehouseB.distance.miles
    );
};

const findClosestWarehouse = (warehouses = [], customerCoordinates) => {
  const warehousesByDistance = sortWarehousesByDistance(
    warehouses,
    customerCoordinates
  );

  return warehousesByDistance[0] || null;
};

const buildFulfillmentAvailability = ({ warehouse, distanceMiles }) => {
  if (!warehouse || typeof warehouse !== "object") {
    throw createHandlerError(
      "Warehouse is required to calculate fulfillment availability",
      400
    );
  }

  if (!Number.isFinite(distanceMiles) || distanceMiles < 0) {
    throw createHandlerError("A valid non-negative distance is required", 400);
  }

  const warehouseIsOperational =
    warehouse.active === true && warehouse.status === "open";

  const pickupConfiguration = warehouse.fulfillment?.pickup || {};

  const deliveryConfiguration = warehouse.fulfillment?.localDelivery || {};

  const pickupAvailable =
    warehouseIsOperational && pickupConfiguration.enabled === true;

  const deliveryRadiusMiles = Number(deliveryConfiguration.radiusMiles ?? 0);

  const isInsideDeliveryRadius =
    Number.isFinite(deliveryRadiusMiles) &&
    deliveryRadiusMiles > 0 &&
    distanceMiles <= deliveryRadiusMiles;

  const localDeliveryAvailable =
    warehouseIsOperational &&
    deliveryConfiguration.enabled === true &&
    isInsideDeliveryRadius;

  const isOutsideDeliveryRadius =
    deliveryConfiguration.enabled === true &&
    deliveryRadiusMiles > 0 &&
    distanceMiles > deliveryRadiusMiles;

  return {
    pickup: {
      available: pickupAvailable,

      preparationTimeMinutes:
        pickupConfiguration.preparationTimeMinutes ?? null,
    },

    localDelivery: {
      available: localDeliveryAvailable,

      radiusMiles: deliveryRadiusMiles > 0 ? deliveryRadiusMiles : null,

      estimatedTimeMinutes: deliveryConfiguration.estimatedTimeMinutes || null,

      provider: deliveryConfiguration.provider || null,

      reason: localDeliveryAvailable
        ? null
        : !warehouseIsOperational
        ? "WAREHOUSE_NOT_OPERATIONAL"
        : deliveryConfiguration.enabled !== true
        ? "LOCAL_DELIVERY_DISABLED"
        : isOutsideDeliveryRadius
        ? "OUTSIDE_DELIVERY_RADIUS"
        : "LOCAL_DELIVERY_UNAVAILABLE",
    },

    pickupDistanceWarning: {
      shouldDisplay: pickupAvailable && isOutsideDeliveryRadius,

      reason:
        pickupAvailable && isOutsideDeliveryRadius
          ? "CLOSEST_WAREHOUSE_OUTSIDE_DELIVERY_RADIUS"
          : null,

      distanceMiles,

      deliveryRadiusMiles: deliveryRadiusMiles > 0 ? deliveryRadiusMiles : null,

      messageKey:
        pickupAvailable && isOutsideDeliveryRadius
          ? "warehouses.pickupDistanceWarning"
          : null,
    },
  };
};

const calculateRecommendedSellingPriceInCents = (manufacturerPriceInCents) => {
  if (
    !Number.isInteger(manufacturerPriceInCents) ||
    manufacturerPriceInCents < 0
  ) {
    throw createHandlerError(
      "Manufacturer price must be a non-negative integer",
      400
    );
  }

  return Math.round(
    manufacturerPriceInCents *
      (1 + WAREHOUSE_PRICE_RULES.recommendedMarkupPercentage / 100)
  );
};

const calculateMaximumSellingPriceInCents = (manufacturerPriceInCents) => {
  if (
    !Number.isInteger(manufacturerPriceInCents) ||
    manufacturerPriceInCents < 0
  ) {
    throw createHandlerError(
      "Manufacturer price must be a non-negative integer",
      400
    );
  }

  return Math.round(
    manufacturerPriceInCents *
      (1 + WAREHOUSE_PRICE_RULES.maximumMarkupPercentage / 100)
  );
};

const validateWarehouseSellingPrice = ({
  productId,
  manufacturerPriceInCents,
  sellingPriceInCents,
}) => {
  if (!productId || typeof productId !== "string") {
    throw createHandlerError(
      "A valid product id is required for price validation",
      400
    );
  }

  if (
    !Number.isInteger(manufacturerPriceInCents) ||
    manufacturerPriceInCents < 0
  ) {
    throw createHandlerError(
      `Product "${productId}" has an invalid manufacturer price`,
      400
    );
  }

  if (!Number.isInteger(sellingPriceInCents) || sellingPriceInCents < 0) {
    throw createHandlerError(
      `Warehouse selling price for "${productId}" must be a non-negative integer`,
      400
    );
  }

  const recommendedSellingPriceInCents =
    calculateRecommendedSellingPriceInCents(manufacturerPriceInCents);

  const maximumSellingPriceInCents = calculateMaximumSellingPriceInCents(
    manufacturerPriceInCents
  );

  if (sellingPriceInCents > maximumSellingPriceInCents) {
    throw createHandlerError(
      `Warehouse selling price for "${productId}" exceeds the maximum allowed 30% markup`,
      400,
      {
        productId,
        manufacturerPriceInCents,
        sellingPriceInCents,
        recommendedSellingPriceInCents,
        maximumSellingPriceInCents,
      }
    );
  }

  return {
    productId,
    manufacturerPriceInCents,
    sellingPriceInCents,
    recommendedSellingPriceInCents,
    maximumSellingPriceInCents,

    markupPercentage:
      manufacturerPriceInCents === 0
        ? 0
        : Number(
            (
              ((sellingPriceInCents - manufacturerPriceInCents) /
                manufacturerPriceInCents) *
              100
            ).toFixed(2)
          ),

    isRecommendedPrice: sellingPriceInCents === recommendedSellingPriceInCents,

    isWithinAllowedRange: true,
  };
};

const normalizeInventoryEntry = (productId, inventoryEntry) => {
  if (
    !inventoryEntry ||
    typeof inventoryEntry !== "object" ||
    Array.isArray(inventoryEntry)
  ) {
    throw createHandlerError(
      `Inventory entry for "${productId}" must be an object`,
      400
    );
  }

  const stock = Number(inventoryEntry.stock);

  if (!Number.isInteger(stock) || stock < 0) {
    throw createHandlerError(
      `Inventory stock for "${productId}" must be a non-negative integer`,
      400
    );
  }

  const sellingPriceInCents = Number(inventoryEntry.sellingPriceInCents);

  if (!Number.isInteger(sellingPriceInCents) || sellingPriceInCents < 0) {
    throw createHandlerError(
      `Selling price for "${productId}" must be a non-negative integer`,
      400
    );
  }

  return {
    stock,
    sellingPriceInCents,
    active: inventoryEntry.active === true,

    updatedAt: inventoryEntry.updatedAt || new Date().toISOString(),
  };
};

const normalizeWarehouseInventory = (inventory = {}) => {
  if (!inventory || typeof inventory !== "object" || Array.isArray(inventory)) {
    throw createHandlerError("Warehouse inventory must be an object map", 400);
  }

  return Object.entries(inventory).reduce(
    (normalizedInventory, [productId, inventoryEntry]) => {
      if (!productId || typeof productId !== "string") {
        throw createHandlerError(
          "Warehouse inventory contains an invalid product id",
          400
        );
      }

      normalizedInventory[productId] = normalizeInventoryEntry(
        productId,
        inventoryEntry
      );

      return normalizedInventory;
    },
    {}
  );
};

const calculateLocalDeliveryFeeInCents = (
  distanceMiles,
  pricePerMileInCents = 100
) => {
  const normalizedDistance = Number(distanceMiles);
  const normalizedPricePerMile = Number(pricePerMileInCents);

  if (!Number.isFinite(normalizedDistance) || normalizedDistance < 0) {
    throw createHandlerError("A valid delivery distance is required", 400);
  }

  if (!Number.isInteger(normalizedPricePerMile) || normalizedPricePerMile < 0) {
    throw createHandlerError(
      "A valid delivery price per mile is required",
      500
    );
  }

  return Math.round(normalizedDistance * normalizedPricePerMile);
};

module.exports = {
  WAREHOUSE_PRICE_RULES,

  forwardGeocodeAddress,

  validateCoordinates,
  calculateHaversineDistanceMiles,
  getDrivingRouteDistance,
  sortWarehousesByDistance,
  findClosestWarehouse,
  buildFulfillmentAvailability,

  calculateRecommendedSellingPriceInCents,
  calculateMaximumSellingPriceInCents,
  validateWarehouseSellingPrice,

  normalizeInventoryEntry,
  normalizeWarehouseInventory,

  calculateLocalDeliveryFeeInCents,
};
