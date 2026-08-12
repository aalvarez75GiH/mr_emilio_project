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

  const [cartState, setCartState] = useState(() => readStoredCart());

  const [storeChangeNotice, setStoreChangeNotice] = useState(null);

  const cartItems = cartState.items;

  const currentWarehouseId = warehouse?.id || null;

  /**
   * WarehouseProvider is the authoritative
   * store resolver.
   *
   * Whenever its resolved warehouse changes,
   * the persisted cart must be revalidated
   * against that store.
   */
  useEffect(() => {
    if (!warehouse?.id) {
      return;
    }

    setCartState((currentCartState) => {
      const previousWarehouseId = currentCartState.warehouseId;

      const warehouseChanged =
        Boolean(previousWarehouseId) && previousWarehouseId !== warehouse.id;

      const nextItems = revalidateCartForWarehouse(
        currentCartState.items,
        warehouse
      );

      if (warehouseChanged) {
        setStoreChangeNotice({
          previousWarehouseId,

          currentWarehouseId: warehouse.id,

          currentWarehouseName: warehouse.warehouse_name || "",
        });
      }

      return {
        ...currentCartState,

        warehouseId: warehouse.id,

        items: nextItems,
      };
    });
  }, [warehouse]);

  useEffect(() => {
    persistCart(cartState);
  }, [cartState]);

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

        setCartState((currentCartState) => ({
          ...currentCartState,

          warehouseId: productWarehouseId,

          items: currentCartState.items.map((item) =>
            item.key === itemKey ? updatedItem : item
          ),
        }));

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

      setCartState((currentCartState) => ({
        ...currentCartState,

        warehouseId: productWarehouseId,

        items: [...currentCartState.items, newItem],
      }));

      return {
        ok: true,

        type: CART_ACTION_RESULTS.ADDED,

        item: newItem,
      };
    },
    [cartItems, currentWarehouseId]
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

      setCartState((currentCartState) => ({
        ...currentCartState,

        items: currentCartState.items.map((item) =>
          item.key === itemKey ? updatedItem : item
        ),
      }));

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
        setCartState((currentCartState) => ({
          ...currentCartState,

          items: currentCartState.items.filter((item) => item.key !== itemKey),
        }));

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

      setCartState((currentCartState) => ({
        ...currentCartState,

        items: currentCartState.items.map((item) =>
          item.key === itemKey ? updatedItem : item
        ),
      }));

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

      setCartState((currentCartState) => ({
        ...currentCartState,

        items: currentCartState.items.filter((item) => item.key !== itemKey),
      }));

      return {
        ok: true,

        type: CART_ACTION_RESULTS.REMOVED,

        item: existingItem,
      };
    },
    [cartItems]
  );

  const clearCart = useCallback(() => {
    setCartState({
      version: 2,

      warehouseId: currentWarehouseId,

      items: [],
    });

    setStoreChangeNotice(null);

    clearStoredCart();
  }, [currentWarehouseId]);

  const dismissStoreChangeNotice = useCallback(() => {
    setStoreChangeNotice(null);
  }, []);

  const cartQuantity = useMemo(() => getCartQuantity(cartItems), [cartItems]);

  const cartSubtotal = useMemo(() => getCartSubtotal(cartItems), [cartItems]);

  const cartValidationIssues = useMemo(
    () => getCartValidationIssues(cartItems),
    [cartItems]
  );

  const hasCartValidationIssues = cartValidationIssues.length > 0;

  const hasUnavailableItems = cartItems.some(
    (item) =>
      item.availabilityStatus === CART_ITEM_AVAILABILITY.NOT_OFFERED ||
      item.availabilityStatus === CART_ITEM_AVAILABILITY.SOLD_OUT
  );

  const hasInsufficientStockItems = cartItems.some(
    (item) =>
      item.availabilityStatus === CART_ITEM_AVAILABILITY.INSUFFICIENT_STOCK
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

      cartWarehouseId: cartState.warehouseId,

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
      cartState.warehouseId,
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
