import { useMemo } from "react";

import { CustomerCatalogContext } from "./customer_catalog.context";

import { useProducts } from "../products/use-products.hook";
import { useWarehouse } from "../warehouse/use-warehouse.hook";

import { mergeProductsWithWarehouseInventory } from "../warehouse/warehouse.helpers";

const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";

export const CustomerCatalogProvider = ({
  children,
  locale = DEFAULT_LOCALE,
  currency = DEFAULT_CURRENCY,
}) => {
  const { products, isProductsLoading, productsError } = useProducts();

  const { warehouse, customerContext, isWarehouseLoading, warehouseError } =
    useWarehouse();

  const customerCatalogProducts = useMemo(() => {
    if (!Array.isArray(products) || !warehouse) {
      return [];
    }

    return mergeProductsWithWarehouseInventory(products, warehouse, {
      locale,
      currency,
    });
  }, [products, warehouse, locale, currency]);

  const isInitialCustomerCatalogLoading =
    isProductsLoading || (!warehouse && isWarehouseLoading);

  const isCustomerCatalogRefreshing = Boolean(warehouse) && isWarehouseLoading;

  const customerCatalogError = productsError || warehouseError || null;

  const isCustomerCatalogReady =
    !isInitialCustomerCatalogLoading &&
    !customerCatalogError &&
    Boolean(warehouse);

  const contextValue = useMemo(
    () => ({
      products: customerCatalogProducts,
      customerCatalogProducts,

      warehouse,
      customerContext,

      isCustomerCatalogLoading: isInitialCustomerCatalogLoading,

      isCustomerCatalogRefreshing,

      customerCatalogError,
      isCustomerCatalogReady,
    }),
    [
      customerCatalogProducts,
      warehouse,
      customerContext,
      isInitialCustomerCatalogLoading,
      isCustomerCatalogRefreshing,
      customerCatalogError,
      isCustomerCatalogReady,
    ]
  );

  return (
    <CustomerCatalogContext.Provider value={contextValue}>
      {children}
    </CustomerCatalogContext.Provider>
  );
};
