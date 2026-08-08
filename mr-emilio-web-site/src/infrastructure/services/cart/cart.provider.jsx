import { useCallback, useEffect, useMemo, useState } from "react";

import { CartContext } from "./cart.context";

import {
  CART_ACTION_RESULTS,
  clearStoredCart,
  createCartItemFromProduct,
  getCartItemKey,
  getCartQuantity,
  getCartSubtotal,
  persistCart,
  readStoredCart,
} from "./cart.helpers";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readStoredCart());

  useEffect(() => {
    persistCart(cartItems);
  }, [cartItems]);

  const addProductToCart = useCallback(
    (product) => {
      if (!product?.id) {
        return {
          ok: false,
          type: CART_ACTION_RESULTS.NOT_FOUND,
        };
      }

      const availableStock = Number(product.stock) || 0;

      if (availableStock <= 0) {
        return {
          ok: false,
          type: CART_ACTION_RESULTS.SOLD_OUT,
          product,
        };
      }

      const itemKey = getCartItemKey(product.id, product.warehouseId);

      const existingItem = cartItems.find((item) => item.key === itemKey);

      if (existingItem && existingItem.quantity >= availableStock) {
        return {
          ok: false,
          type: CART_ACTION_RESULTS.STOCK_LIMIT,
          item: existingItem,
          availableStock,
        };
      }

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,

          /*
           * Keep the latest stock value coming from the
           * customer warehouse catalog.
           */
          availableStock,
        };

        setCartItems((currentItems) =>
          currentItems.map((item) =>
            item.key === itemKey ? updatedItem : item
          )
        );

        return {
          ok: true,
          type: CART_ACTION_RESULTS.UPDATED,
          item: updatedItem,
        };
      }

      const newItem = createCartItemFromProduct(product);

      setCartItems((currentItems) => [...currentItems, newItem]);

      return {
        ok: true,
        type: CART_ACTION_RESULTS.ADDED,
        item: newItem,
      };
    },
    [cartItems]
  );

  const increaseCartItemQuantity = useCallback(
    (itemKey) => {
      const existingItem = cartItems.find((item) => item.key === itemKey);

      if (!existingItem) {
        return {
          ok: false,
          type: CART_ACTION_RESULTS.NOT_FOUND,
        };
      }

      if (existingItem.quantity >= existingItem.availableStock) {
        return {
          ok: false,
          type: CART_ACTION_RESULTS.STOCK_LIMIT,
          item: existingItem,
          availableStock: existingItem.availableStock,
        };
      }

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      setCartItems((currentItems) =>
        currentItems.map((item) => (item.key === itemKey ? updatedItem : item))
      );

      return {
        ok: true,
        type: CART_ACTION_RESULTS.UPDATED,
        item: updatedItem,
      };
    },
    [cartItems]
  );

  const decreaseCartItemQuantity = useCallback(
    (itemKey) => {
      const existingItem = cartItems.find((item) => item.key === itemKey);

      if (!existingItem) {
        return {
          ok: false,
          type: CART_ACTION_RESULTS.NOT_FOUND,
        };
      }

      if (existingItem.quantity <= 1) {
        setCartItems((currentItems) =>
          currentItems.filter((item) => item.key !== itemKey)
        );

        return {
          ok: true,
          type: CART_ACTION_RESULTS.REMOVED,
          item: existingItem,
        };
      }

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      setCartItems((currentItems) =>
        currentItems.map((item) => (item.key === itemKey ? updatedItem : item))
      );

      return {
        ok: true,
        type: CART_ACTION_RESULTS.UPDATED,
        item: updatedItem,
      };
    },
    [cartItems]
  );

  const removeProductFromCart = useCallback(
    (itemKey) => {
      const existingItem = cartItems.find((item) => item.key === itemKey);

      if (!existingItem) {
        return {
          ok: false,
          type: CART_ACTION_RESULTS.NOT_FOUND,
        };
      }

      setCartItems((currentItems) =>
        currentItems.filter((item) => item.key !== itemKey)
      );

      return {
        ok: true,
        type: CART_ACTION_RESULTS.REMOVED,
        item: existingItem,
      };
    },
    [cartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    clearStoredCart();
  }, []);

  const cartQuantity = useMemo(() => getCartQuantity(cartItems), [cartItems]);

  const cartSubtotal = useMemo(() => getCartSubtotal(cartItems), [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      cartQuantity,
      cartSubtotal,

      addProductToCart,
      increaseCartItemQuantity,
      decreaseCartItemQuantity,
      removeProductFromCart,
      clearCart,
    }),
    [
      cartItems,
      cartQuantity,
      cartSubtotal,
      addProductToCart,
      increaseCartItemQuantity,
      decreaseCartItemQuantity,
      removeProductFromCart,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
