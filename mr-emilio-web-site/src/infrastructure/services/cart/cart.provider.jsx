import { useCallback, useEffect, useMemo, useState } from "react";

import { CartContext } from "./cart.context";

import { useWarehouse } from "../warehouse/use-warehouse.hook";

import {
  CART_ACTION_RESULTS,
  CART_ITEM_AVAILABILITY,
  clearStoredCart,
  createCartItemFromProduct,
  getCartItemKey,
  getCartQuantity,
  getCartSubtotal,
  getCartValidationIssues,
  isCartValidForCheckout,
  persistCart,
  readStoredCart,
  revalidateCartForWarehouse,
} from "./cart.helpers";

export const CartProvider = ({ children }) => {
  const { warehouse, isWarehouseLoading, hasResolvedWarehouse } =
    useWarehouse();

  /**
   * cartState is the mutable cart state owned
   * by the customer.
   *
   * We do NOT synchronize warehouse changes
   * into it with a setState call inside an effect.
   *
   * Instead, the cart presented to the application
   * is derived from cartState + current warehouse.
   */
  const [cartState, setCartState] = useState(() => readStoredCart());

  /**
   * Used only when the customer manually dismisses
   * the store-change notification.
   *
   * Example value:
   * "west-side-store->athens-store"
   */
  const [dismissedStoreChangeKey, setDismissedStoreChangeKey] = useState(null);

  const currentWarehouseId = warehouse?.id || null;

  const storedWarehouseId = cartState.warehouseId || null;

  /**
   * Detect whether the persisted cart came from
   * another store.
   */
  const warehouseChanged =
    Boolean(storedWarehouseId) &&
    Boolean(currentWarehouseId) &&
    storedWarehouseId !== currentWarehouseId;

  const storeChangeKey = warehouseChanged
    ? `${storedWarehouseId}->${currentWarehouseId}`
    : null;

  /**
   * Reconcile the cart against the currently
   * authoritative warehouse.
   *
   * This is derived data rather than another
   * setState operation.
   *
   * Examples:
   *
   * West Side cart + Athens warehouse:
   *
   * - refresh stock
   * - refresh price
   * - identify sold-out products
   * - identify products not offered
   * - identify insufficient quantity
   * - update item warehouse IDs/keys
   */
  const cartItems = useMemo(() => {
    if (!warehouse?.id) {
      return cartState.items;
    }

    return revalidateCartForWarehouse(cartState.items, warehouse);
  }, [cartState.items, warehouse]);

  /**
   * The effective cart represents what should be
   * persisted after reconciliation.
   *
   * localStorage is an external system, so keeping
   * this synchronization inside an effect is correct.
   *
   * Notice that the effect does NOT call setState.
   */
  const effectiveCartState = useMemo(
    () => ({
      ...cartState,

      warehouseId: currentWarehouseId || cartState.warehouseId || null,

      items: cartItems,
    }),
    [cartState, currentWarehouseId, cartItems]
  );

  useEffect(() => {
    persistCart(effectiveCartState);
  }, [effectiveCartState]);

  /**
   * Whenever a new store-change relationship occurs,
   * allow its notice to appear even if an older one
   * had previously been dismissed.
   */
  const storeChangeNotice = useMemo(() => {
    if (
      !warehouseChanged ||
      !storeChangeKey ||
      dismissedStoreChangeKey === storeChangeKey
    ) {
      return null;
    }

    return {
      previousWarehouseId: storedWarehouseId,

      currentWarehouseId,

      currentWarehouseName: warehouse?.warehouse_name || "",
    };
  }, [
    warehouseChanged,
    storeChangeKey,
    dismissedStoreChangeKey,
    storedWarehouseId,
    currentWarehouseId,
    warehouse,
  ]);

  const addProductToCart = useCallback(
    (product) => {
      if (!product?.id) {
        return {
          ok: false,

          type: CART_ACTION_RESULTS.NOT_FOUND,
        };
      }

      const productWarehouseId = product.warehouseId || currentWarehouseId;

      if (currentWarehouseId && productWarehouseId !== currentWarehouseId) {
        return {
          ok: false,

          type: CART_ACTION_RESULTS.WAREHOUSE_MISMATCH,

          product,
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

      const itemKey = getCartItemKey(product.id, productWarehouseId);

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

          availableStock,

          isAvailableAtWarehouse: true,

          availabilityStatus: CART_ITEM_AVAILABILITY.AVAILABLE,
        };

        setCartState({
          ...effectiveCartState,

          warehouseId: productWarehouseId,

          items: cartItems.map((item) =>
            item.key === itemKey ? updatedItem : item
          ),
        });

        return {
          ok: true,

          type: CART_ACTION_RESULTS.UPDATED,

          item: updatedItem,
        };
      }

      const newItem = createCartItemFromProduct({
        ...product,

        warehouseId: productWarehouseId,
      });

      setCartState({
        ...effectiveCartState,

        warehouseId: productWarehouseId,

        items: [...cartItems, newItem],
      });

      return {
        ok: true,

        type: CART_ACTION_RESULTS.ADDED,

        item: newItem,
      };
    },
    [cartItems, currentWarehouseId, effectiveCartState]
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

      if (existingItem.isAvailableAtWarehouse !== true) {
        return {
          ok: false,

          type: CART_ACTION_RESULTS.UNAVAILABLE_AT_STORE,

          item: existingItem,
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

      setCartState({
        ...effectiveCartState,

        warehouseId: currentWarehouseId,

        items: cartItems.map((item) =>
          item.key === itemKey ? updatedItem : item
        ),
      });

      return {
        ok: true,

        type: CART_ACTION_RESULTS.UPDATED,

        item: updatedItem,
      };
    },
    [cartItems, currentWarehouseId, effectiveCartState]
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
        const nextItems = cartItems.filter((item) => item.key !== itemKey);

        setCartState({
          ...effectiveCartState,

          warehouseId: currentWarehouseId,

          items: nextItems,
        });

        return {
          ok: true,

          type: CART_ACTION_RESULTS.REMOVED,

          item: existingItem,
        };
      }

      const nextQuantity = existingItem.quantity - 1;

      const quantityIsNowValid =
        existingItem.availableStock > 0 &&
        nextQuantity <= existingItem.availableStock;

      const updatedItem = {
        ...existingItem,

        quantity: nextQuantity,

        isAvailableAtWarehouse: quantityIsNowValid,

        availabilityStatus: quantityIsNowValid
          ? CART_ITEM_AVAILABILITY.AVAILABLE
          : existingItem.availabilityStatus,
      };

      setCartState({
        ...effectiveCartState,

        warehouseId: currentWarehouseId,

        items: cartItems.map((item) =>
          item.key === itemKey ? updatedItem : item
        ),
      });

      return {
        ok: true,

        type: CART_ACTION_RESULTS.UPDATED,

        item: updatedItem,
      };
    },
    [cartItems, currentWarehouseId, effectiveCartState]
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

      const nextItems = cartItems.filter((item) => item.key !== itemKey);

      setCartState({
        ...effectiveCartState,

        warehouseId: currentWarehouseId,

        items: nextItems,
      });

      return {
        ok: true,

        type: CART_ACTION_RESULTS.REMOVED,

        item: existingItem,
      };
    },
    [cartItems, currentWarehouseId, effectiveCartState]
  );

  const clearCart = useCallback(() => {
    setCartState({
      version: 2,

      warehouseId: currentWarehouseId,

      items: [],
    });

    setDismissedStoreChangeKey(null);

    clearStoredCart();
  }, [currentWarehouseId]);

  const dismissStoreChangeNotice = useCallback(() => {
    if (!storeChangeKey) {
      return;
    }

    setDismissedStoreChangeKey(storeChangeKey);
  }, [storeChangeKey]);

  const cartQuantity = useMemo(() => getCartQuantity(cartItems), [cartItems]);

  const cartSubtotal = useMemo(() => getCartSubtotal(cartItems), [cartItems]);

  const cartValidationIssues = useMemo(
    () => getCartValidationIssues(cartItems),
    [cartItems]
  );

  const hasCartValidationIssues = cartValidationIssues.length > 0;

  const hasUnavailableItems = useMemo(
    () =>
      cartItems.some(
        (item) =>
          item.availabilityStatus === CART_ITEM_AVAILABILITY.NOT_OFFERED ||
          item.availabilityStatus === CART_ITEM_AVAILABILITY.SOLD_OUT
      ),
    [cartItems]
  );

  const hasInsufficientStockItems = useMemo(
    () =>
      cartItems.some(
        (item) =>
          item.availabilityStatus === CART_ITEM_AVAILABILITY.INSUFFICIENT_STOCK
      ),
    [cartItems]
  );

  const cartIsValidForCheckout =
    !isWarehouseLoading &&
    hasResolvedWarehouse &&
    isCartValidForCheckout(cartItems, currentWarehouseId);

  const value = useMemo(
    () => ({
      cartItems,

      cartQuantity,

      cartSubtotal,

      /**
       * Once reconciled, the effective
       * cart belongs to the authoritative
       * current warehouse.
       */
      cartWarehouseId: effectiveCartState.warehouseId,

      currentWarehouseId,

      currentWarehouse: warehouse,

      storeChangeNotice,

      cartValidationIssues,

      hasCartValidationIssues,

      hasUnavailableItems,

      hasInsufficientStockItems,

      cartIsValidForCheckout,

      isCartValidationPending: isWarehouseLoading || !hasResolvedWarehouse,

      addProductToCart,

      increaseCartItemQuantity,

      decreaseCartItemQuantity,

      removeProductFromCart,

      clearCart,

      dismissStoreChangeNotice,
    }),
    [
      cartItems,
      cartQuantity,
      cartSubtotal,
      effectiveCartState.warehouseId,
      currentWarehouseId,
      warehouse,
      storeChangeNotice,
      cartValidationIssues,
      hasCartValidationIssues,
      hasUnavailableItems,
      hasInsufficientStockItems,
      cartIsValidForCheckout,
      isWarehouseLoading,
      hasResolvedWarehouse,
      addProductToCart,
      increaseCartItemQuantity,
      decreaseCartItemQuantity,
      removeProductFromCart,
      clearCart,
      dismissStoreChangeNotice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
