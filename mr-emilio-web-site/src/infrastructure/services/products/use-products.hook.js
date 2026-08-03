import { useContext } from "react";

import { ProductsContext } from "./products.context";

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside a ProductsProvider");
  }

  return context;
};
