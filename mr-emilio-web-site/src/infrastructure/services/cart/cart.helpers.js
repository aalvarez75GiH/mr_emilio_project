export const CART_STORAGE_KEY = "mr-emilio-cart";

export const CART_STORAGE_VERSION = 2;

export const CART_ACTION_RESULTS = Object.freeze({
  ADDED: "added",
  UPDATED: "updated",
  STOCK_LIMIT: "stock_limit",
  SOLD_OUT: "sold_out",
  NOT_FOUND: "not_found",
  REMOVED: "removed",
  WAREHOUSE_MISMATCH: "warehouse_mismatch",
  UNAVAILABLE_AT_STORE: "unavailable_at_store",
});

export const CART_ITEM_AVAILABILITY = Object.freeze({
  AVAILABLE: "available",
  NOT_OFFERED: "not_offered",
  SOLD_OUT: "sold_out",
  INSUFFICIENT_STOCK: "insufficient_stock",
});

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const formatCentsToCurrency = (amountInCents) => {
  const normalizedAmount = Number(amountInCents);

  if (!Number.isInteger(normalizedAmount)) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(normalizedAmount / 100);
};

export const getCartProductPrice = (product) => {
  const sellingPriceInCents = Number(product?.sellingPriceInCents);

  if (Number.isInteger(sellingPriceInCents) && sellingPriceInCents >= 0) {
    return sellingPriceInCents / 100;
  }

  const directPrice = Number(product?.price);

  if (Number.isFinite(directPrice) && directPrice > 0) {
    return directPrice;
  }

  const displayedPrice = product?.displayedPrice;

  if (typeof displayedPrice === "string") {
    const parsedPrice = Number(displayedPrice.replace(/[^0-9.-]+/g, ""));

    if (Number.isFinite(parsedPrice) && parsedPrice > 0) {
      return parsedPrice;
    }
  }

  return 0;
};

export const getCartItemKey = (productId, warehouseId) =>
  `${warehouseId || "unknown-warehouse"}:${productId}`;

export const createCartItemFromProduct = (product) => {
  const availableStock = Number(product.stock) || 0;

  return {
    key: getCartItemKey(product.id, product.warehouseId),

    productId: product.id,

    warehouseId: product.warehouseId,

    name: product.name,

    description: product.description || "",

    image: product.image,

    alt: product.alt || product.name,

    imageScale: Number(product.imageScale) || 1,

    imageOffsetX: Number(product.imageOffsetX) || 0,

    imageOffsetY: Number(product.imageOffsetY) || 0,

    sizeLabel: product.sizeLabel || "",

    benefits: Array.isArray(product.benefits)
      ? product.benefits.map((benefit) => ({
          type: benefit.type || benefit.id || benefit.label,

          icon: benefit.icon,

          label: benefit.label,
        }))
      : [],

    sellingPriceInCents: Number.isInteger(Number(product.sellingPriceInCents))
      ? Number(product.sellingPriceInCents)
      : Math.round(getCartProductPrice(product) * 100),

    price: getCartProductPrice(product),

    displayedPrice: product.displayedPrice || "",

    quantity: 1,

    availableStock,

    isAvailableAtWarehouse: availableStock > 0,

    availabilityStatus:
      availableStock > 0
        ? CART_ITEM_AVAILABILITY.AVAILABLE
        : CART_ITEM_AVAILABILITY.SOLD_OUT,

    priceChanged: false,

    previousPrice: null,

    warehouseChanged: false,

    previousWarehouseId: null,
  };
};

export const revalidateCartItemForWarehouse = (cartItem, warehouse) => {
  if (!cartItem?.productId || !warehouse?.id) {
    return {
      ...cartItem,

      isAvailableAtWarehouse: false,

      availabilityStatus: CART_ITEM_AVAILABILITY.NOT_OFFERED,
    };
  }

  const previousWarehouseId = cartItem.warehouseId || null;

  const warehouseChanged =
    Boolean(previousWarehouseId) && previousWarehouseId !== warehouse.id;

  const inventoryEntry = warehouse.inventory?.[cartItem.productId] || null;

  const currentWarehouseOffersProduct = inventoryEntry?.active === true;

  const currentStock = currentWarehouseOffersProduct
    ? Number(inventoryEntry.stock) || 0
    : 0;

  const requestedQuantity = Number(cartItem.quantity) || 0;

  const currentSellingPriceInCents =
    currentWarehouseOffersProduct &&
    Number.isInteger(Number(inventoryEntry.sellingPriceInCents))
      ? Number(inventoryEntry.sellingPriceInCents)
      : null;

  const previousPrice = Number(cartItem.price) || 0;

  const nextPrice =
    currentSellingPriceInCents !== null
      ? currentSellingPriceInCents / 100
      : previousPrice;

  const priceChanged =
    currentSellingPriceInCents !== null &&
    Math.abs(nextPrice - previousPrice) > 0.0001;

  let availabilityStatus = CART_ITEM_AVAILABILITY.AVAILABLE;

  let isAvailableAtWarehouse = true;

  if (!currentWarehouseOffersProduct) {
    availabilityStatus = CART_ITEM_AVAILABILITY.NOT_OFFERED;

    isAvailableAtWarehouse = false;
  } else if (currentStock <= 0) {
    availabilityStatus = CART_ITEM_AVAILABILITY.SOLD_OUT;

    isAvailableAtWarehouse = false;
  } else if (requestedQuantity > currentStock) {
    availabilityStatus = CART_ITEM_AVAILABILITY.INSUFFICIENT_STOCK;

    isAvailableAtWarehouse = false;
  }

  return {
    ...cartItem,

    key: getCartItemKey(cartItem.productId, warehouse.id),

    warehouseId: warehouse.id,

    availableStock: currentStock,

    sellingPriceInCents: currentSellingPriceInCents,

    price: nextPrice,

    displayedPrice:
      currentSellingPriceInCents !== null
        ? formatCentsToCurrency(currentSellingPriceInCents)
        : cartItem.displayedPrice || "",

    isAvailableAtWarehouse,

    availabilityStatus,

    warehouseChanged,

    previousWarehouseId: warehouseChanged
      ? previousWarehouseId
      : cartItem.previousWarehouseId || null,

    priceChanged,

    previousPrice: priceChanged
      ? previousPrice
      : cartItem.previousPrice || null,
  };
};

export const revalidateCartForWarehouse = (cartItems = [], warehouse) => {
  if (!Array.isArray(cartItems)) {
    return [];
  }

  if (!warehouse?.id) {
    return cartItems;
  }

  return cartItems.map((item) =>
    revalidateCartItemForWarehouse(item, warehouse)
  );
};

export const getCartQuantity = (cartItems = []) => {
  return cartItems.reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);
};

export const getCartSubtotal = (cartItems = []) => {
  return cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;

    const quantity = Number(item.quantity) || 0;

    return total + price * quantity;
  }, 0);
};

export const getCartValidationIssues = (cartItems = []) => {
  if (!Array.isArray(cartItems)) {
    return [];
  }

  return cartItems
    .filter((item) => item.isAvailableAtWarehouse !== true)
    .map((item) => ({
      key: item.key,

      productId: item.productId,

      name: item.name,

      quantity: item.quantity,

      availableStock: item.availableStock,

      availabilityStatus: item.availabilityStatus,
    }));
};

export const isCartValidForCheckout = (cartItems = [], warehouseId) => {
  if (!warehouseId || !Array.isArray(cartItems) || cartItems.length === 0) {
    return false;
  }

  return cartItems.every(
    (item) =>
      item.warehouseId === warehouseId &&
      item.isAvailableAtWarehouse === true &&
      Number(item.quantity) > 0 &&
      Number(item.quantity) <= Number(item.availableStock)
  );
};

const normalizeStoredCartItem = (item) => {
  return {
    ...item,

    price: getCartProductPrice(item),

    quantity: Math.max(1, Number(item.quantity) || 1),

    availableStock: Number(item.availableStock) || 0,

    isAvailableAtWarehouse: item.isAvailableAtWarehouse ?? true,

    availabilityStatus:
      item.availabilityStatus || CART_ITEM_AVAILABILITY.AVAILABLE,

    priceChanged: item.priceChanged === true,

    previousPrice: Number.isFinite(Number(item.previousPrice))
      ? Number(item.previousPrice)
      : null,

    warehouseChanged: item.warehouseChanged === true,

    previousWarehouseId: item.previousWarehouseId || null,
  };
};

export const readStoredCart = () => {
  const emptyCart = {
    version: CART_STORAGE_VERSION,

    warehouseId: null,

    items: [],
  };

  if (typeof window === "undefined") {
    return emptyCart;
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return emptyCart;
    }

    const parsedCart = JSON.parse(storedCart);

    /**
     * Legacy v1 cart.
     *
     * Older versions stored the cart as a
     * plain array.
     */
    if (Array.isArray(parsedCart)) {
      const items = parsedCart.map(normalizeStoredCartItem);

      return {
        version: CART_STORAGE_VERSION,

        warehouseId: items[0]?.warehouseId || null,

        items,
      };
    }

    /**
     * Current warehouse-aware cart.
     */
    if (!isPlainObject(parsedCart)) {
      return emptyCart;
    }

    const items = Array.isArray(parsedCart.items)
      ? parsedCart.items.map(normalizeStoredCartItem)
      : [];

    return {
      version: CART_STORAGE_VERSION,

      warehouseId:
        typeof parsedCart.warehouseId === "string"
          ? parsedCart.warehouseId
          : items[0]?.warehouseId || null,

      items,
    };
  } catch (error) {
    console.error("Unable to read cart from localStorage:", error);

    return emptyCart;
  }
};

export const persistCart = (cartState) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const items = Array.isArray(cartState?.items) ? cartState.items : [];

    if (items.length === 0) {
      window.localStorage.removeItem(CART_STORAGE_KEY);

      return;
    }

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        version: CART_STORAGE_VERSION,

        warehouseId: cartState?.warehouseId || null,

        items,
      })
    );
  } catch (error) {
    console.error("Unable to persist cart to localStorage:", error);
  }
};

export const clearStoredCart = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to clear cart from localStorage:", error);
  }
};
