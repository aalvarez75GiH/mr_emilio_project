import { useContext } from "react";

import { CheckoutContext } from "./checkout.context";

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used inside a CheckoutProvider.");
  }

  return context;
};
