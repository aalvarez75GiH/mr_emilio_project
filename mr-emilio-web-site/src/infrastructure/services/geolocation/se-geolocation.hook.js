import { useContext } from "react";

import { GeolocationContext } from "./geolocation.context";

export const useGeolocation = () => {
  const context = useContext(GeolocationContext);

  if (!context) {
    throw new Error("useGeolocation must be used inside a GeolocationProvider");
  }

  return context;
};
