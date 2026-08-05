import { useContext } from "react";

import { WarehouseContext } from "./warehouse.context";

export const useWarehouse = () => {
  const context = useContext(WarehouseContext);

  if (!context) {
    throw new Error("useWarehouse must be used inside a WarehouseProvider");
  }

  return context;
};
