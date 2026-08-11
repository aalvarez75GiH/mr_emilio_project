import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

let hasConfiguredGoogleMaps = false;

const configureGoogleMaps = () => {
  if (hasConfiguredGoogleMaps) {
    return;
  }

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("VITE_GOOGLE_MAPS_API_KEY is not configured.");
  }

  setOptions({
    key: GOOGLE_MAPS_API_KEY,
    v: "weekly",
  });

  hasConfiguredGoogleMaps = true;
};

export const loadGooglePlacesLibrary = async () => {
  configureGoogleMaps();

  return importLibrary("places");
};
