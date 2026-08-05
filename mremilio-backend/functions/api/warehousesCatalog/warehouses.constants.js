const WAREHOUSE_COLLECTION = "warehousesCatalog";
const PRODUCTS_COLLECTION = "productsCatalog";

const WAREHOUSE_STATUS = Object.freeze({
  OPEN: "open",
  CLOSED: "closed",
  TEMPORARILY_CLOSED: "temporarilyClosed",
});

const WAREHOUSE_STATUS_VALUES = Object.freeze(Object.values(WAREHOUSE_STATUS));

const DELIVERY_PROVIDER_TYPES = Object.freeze({
  INTERNAL: "internal",
  THIRD_PARTY: "thirdParty",
});

const DELIVERY_PROVIDER_TYPE_VALUES = Object.freeze(
  Object.values(DELIVERY_PROVIDER_TYPES)
);

module.exports = {
  WAREHOUSE_COLLECTION,
  PRODUCTS_COLLECTION,

  WAREHOUSE_STATUS,
  WAREHOUSE_STATUS_VALUES,

  DELIVERY_PROVIDER_TYPES,
  DELIVERY_PROVIDER_TYPE_VALUES,
};
