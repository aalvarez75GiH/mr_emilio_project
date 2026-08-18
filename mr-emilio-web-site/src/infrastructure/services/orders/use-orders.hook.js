import { useContext } from "react";

import { OrdersContext } from "./orders.context";

export const useOrders = () => {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used inside an OrdersProvider");
  }

  return context;
};
