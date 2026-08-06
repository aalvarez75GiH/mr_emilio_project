import { useContext } from "react";

import { CustomerCatalogContext } from "./customer_catalog.context";

export const useCustomerCatalog = () => {
  const context = useContext(CustomerCatalogContext);

  if (!context) {
    throw new Error(
      "useCustomerCatalog must be used inside a CustomerCatalogProvider"
    );
  }

  return context;
};