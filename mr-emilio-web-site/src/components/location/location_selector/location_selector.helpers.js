export const LOCATION_SELECTOR_VARIANTS = Object.freeze({
  BANNER: "banner",
  PILL: "pill",
});

export const getWarehouseAddressComponent = (warehouse, componentType) => {
  const addressComponents = warehouse?.geo?.address_components;

  if (!Array.isArray(addressComponents)) {
    return "";
  }

  const matchingComponent = addressComponents.find(
    (component) =>
      Array.isArray(component?.types) && component.types.includes(componentType)
  );

  return matchingComponent?.short_name || matchingComponent?.long_name || "";
};

export const getWarehouseLocationLabel = (warehouse) => {
  const city = getWarehouseAddressComponent(warehouse, "locality");

  const state = getWarehouseAddressComponent(
    warehouse,
    "administrative_area_level_1"
  );

  if (city && state) {
    return `${city}, ${state}`;
  }

  if (city) {
    return city;
  }

  return warehouse?.geo?.formatted_address || warehouse?.physical_address || "";
};
