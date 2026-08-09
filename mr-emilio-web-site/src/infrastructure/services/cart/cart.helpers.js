export const CART_STORAGE_KEY = "mr-emilio-cart";

export const CART_ACTION_RESULTS = Object.freeze({
  ADDED: "added",
  UPDATED: "updated",
  STOCK_LIMIT: "stock_limit",
  SOLD_OUT: "sold_out",
  NOT_FOUND: "not_found",
  REMOVED: "removed",
});

export const getCartProductPrice = (product) => {
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
  return {
    key: getCartItemKey(product.id, product.warehouseId),

    productId: product.id,
    warehouseId: product.warehouseId,

    name: product.name,
    description: product.description || "",

    image: product.image,
    alt: product.alt || product.name,

    sizeLabel: product.sizeLabel || "",

    price: getCartProductPrice(product),
    displayedPrice: product.displayedPrice || "",

    quantity: 1,

    availableStock: Number(product.stock) || 0,
  };
};
// export const createCartItemFromProduct = (product) => {
//   return {
//     key: getCartItemKey(product.id, product.warehouseId),

//     productId: product.id,
//     warehouseId: product.warehouseId,

//     name: product.name,
//     description: product.description || "",

//     image: product.image,
//     alt: product.alt || product.name,

//     sizeLabel: product.sizeLabel || "",

//     price: Number(product.price) || 0,
//     displayedPrice: product.displayedPrice || "",

//     quantity: 1,

//     availableStock: Number(product.stock) || 0,
//   };
// };

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

export const readStoredCart = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.map((item) => ({
      ...item,
      price: getCartProductPrice(item),
    }));
  } catch (error) {
    console.error("Unable to read cart from localStorage:", error);

    return [];
  }
};
// export const readStoredCart = () => {
//   if (typeof window === "undefined") {
//     return [];
//   }

//   try {
//     const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

//     if (!storedCart) {
//       return [];
//     }

//     const parsedCart = JSON.parse(storedCart);

//     if (!Array.isArray(parsedCart)) {
//       return [];
//     }

//     return parsedCart;
//   } catch (error) {
//     console.error("Unable to read cart from localStorage:", error);

//     return [];
//   }
// };

export const persistCart = (cartItems = []) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
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
