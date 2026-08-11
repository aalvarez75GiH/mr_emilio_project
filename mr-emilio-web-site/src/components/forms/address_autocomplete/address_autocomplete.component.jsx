import { FiMapPin, FiSearch } from "react-icons/fi";

import { useEffect, useRef, useState } from "react";

import { loadGooglePlacesLibrary } from "../../../infrastructure/google/google_maps.loader";

import {
  AddressAutocompleteContainer,
  AddressInputWrapper,
  AddressInputIcon,
  AddressInput,
  SuggestionsList,
  SuggestionButton,
  SuggestionMainText,
  SuggestionSecondaryText,
  SelectedAddress,
  SelectedAddressIcon,
  SelectedAddressContent,
  SelectedAddressLabel,
  SelectedAddressText,
  AddressAutocompleteError,
} from "./address_autocomplete.styles";

const MINIMUM_QUERY_LENGTH = 3;

const AUTOCOMPLETE_DELAY_MS = 250;

const normalizeAddressComponents = (addressComponents = []) => {
  const getComponent = (type) =>
    addressComponents.find((component) => component.types?.includes(type));

  const streetNumber = getComponent("street_number")?.longText || "";

  const route = getComponent("route")?.longText || "";

  const city =
    getComponent("locality")?.longText ||
    getComponent("postal_town")?.longText ||
    getComponent("administrative_area_level_3")?.longText ||
    "";

  const state = getComponent("administrative_area_level_1")?.shortText || "";

  const postalCode = getComponent("postal_code")?.longText || "";

  return {
    street: [streetNumber, route].filter(Boolean).join(" "),

    city,
    state,
    postalCode,
  };
};

export const AddressAutocomplete = ({
  value = "",
  onAddressSelected,
  onInputChange,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(() => value || "");

  const [suggestions, setSuggestions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [selectedFormattedAddress, setSelectedFormattedAddress] = useState("");

  const placesLibraryRef = useRef(null);

  const sessionTokenRef = useRef(null);

  const requestCounterRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const initializePlaces = async () => {
      try {
        const placesLibrary = await loadGooglePlacesLibrary();

        if (!isMounted) {
          return;
        }

        placesLibraryRef.current = placesLibrary;

        sessionTokenRef.current = new placesLibrary.AutocompleteSessionToken();
      } catch (loadError) {
        console.error("Unable to load Google Places:", loadError);

        if (isMounted) {
          setError(
            "Address search is temporarily unavailable. Please try again."
          );
        }
      }
    };

    initializePlaces();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedInput = inputValue.trim();

  const addressHasBeenSelected = Boolean(selectedFormattedAddress);

  const canRequestSuggestions =
    !disabled &&
    !addressHasBeenSelected &&
    normalizedInput.length >= MINIMUM_QUERY_LENGTH;

  const visibleSuggestions = canRequestSuggestions ? suggestions : [];

  const hasSuggestions = visibleSuggestions.length > 0;

  useEffect(() => {
    if (!canRequestSuggestions) {
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      const placesLibrary = placesLibraryRef.current;

      if (!placesLibrary) {
        return;
      }

      const requestId = requestCounterRef.current + 1;

      requestCounterRef.current = requestId;

      setIsLoading(true);
      setError("");

      try {
        if (!sessionTokenRef.current) {
          sessionTokenRef.current =
            new placesLibrary.AutocompleteSessionToken();
        }

        const request = {
          input: normalizedInput,

          sessionToken: sessionTokenRef.current,

          includedRegionCodes: ["us"],

          language: "en-US",

          region: "us",
        };

        const { suggestions: nextSuggestions } =
          await placesLibrary.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            request
          );

        if (requestCounterRef.current !== requestId) {
          return;
        }

        setSuggestions(Array.isArray(nextSuggestions) ? nextSuggestions : []);
      } catch (requestError) {
        console.error("Unable to fetch address suggestions:", requestError);

        if (requestCounterRef.current === requestId) {
          setSuggestions([]);

          setError("We couldn't load address suggestions. Please try again.");
        }
      } finally {
        if (requestCounterRef.current === requestId) {
          setIsLoading(false);
        }
      }
    }, AUTOCOMPLETE_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [canRequestSuggestions, normalizedInput]);

  const handleInputChange = (event) => {
    const nextValue = event.target.value;

    /*
     * Invalidate any previous async request.
     * This prevents an older response from replacing
     * suggestions for newer input.
     */
    requestCounterRef.current += 1;

    setInputValue(nextValue);

    setSelectedFormattedAddress("");

    setError("");

    if (nextValue.trim().length < MINIMUM_QUERY_LENGTH) {
      setSuggestions([]);
      setIsLoading(false);
    }

    onInputChange?.(nextValue);
  };

  const handleSuggestionSelect = async (suggestion) => {
    const placesLibrary = placesLibraryRef.current;

    const placePrediction = suggestion?.placePrediction;

    if (!placesLibrary || !placePrediction) {
      return;
    }

    /*
     * Invalidate any pending autocomplete response.
     */
    requestCounterRef.current += 1;

    setSuggestions([]);
    setIsLoading(true);
    setError("");

    try {
      const place = placePrediction.toPlace();

      await place.fetchFields({
        fields: ["id", "formattedAddress", "addressComponents", "location"],
      });

      const normalizedAddress = normalizeAddressComponents(
        place.addressComponents
      );

      if (
        !normalizedAddress.street ||
        !normalizedAddress.city ||
        !normalizedAddress.state ||
        !normalizedAddress.postalCode
      ) {
        throw new Error(
          "The selected address is missing required address components."
        );
      }

      const coordinates = place.location
        ? {
            lat: place.location.lat(),
            lng: place.location.lng(),
          }
        : null;

      const formattedAddress =
        place.formattedAddress ||
        [
          normalizedAddress.street,
          normalizedAddress.city,
          normalizedAddress.state,
          normalizedAddress.postalCode,
        ]
          .filter(Boolean)
          .join(", ");

      setInputValue(normalizedAddress.street);

      setSelectedFormattedAddress(formattedAddress);

      onAddressSelected?.({
        ...normalizedAddress,

        formattedAddress,

        placeId: place.id || null,

        coordinates,
      });

      /*
       * fetchFields() concludes the current
       * autocomplete session. Start a fresh
       * token for the next search session.
       */
      sessionTokenRef.current = new placesLibrary.AutocompleteSessionToken();
    } catch (selectionError) {
      console.error("Unable to select Google address:", selectionError);

      setSelectedFormattedAddress("");

      setError(
        "We couldn't use that address. Please choose another suggestion."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AddressAutocompleteContainer>
      <AddressInputWrapper>
        <AddressInputIcon aria-hidden="true">
          <FiSearch />
        </AddressInputIcon>

        <AddressInput
          id="checkout-address-search"
          type="text"
          autoComplete="off"
          placeholder="Start typing your address"
          value={inputValue}
          disabled={disabled}
          onChange={handleInputChange}
          aria-autocomplete="list"
          aria-expanded={hasSuggestions}
          aria-controls={
            hasSuggestions ? "checkout-address-suggestions" : undefined
          }
        />
      </AddressInputWrapper>

      {hasSuggestions && (
        <SuggestionsList id="checkout-address-suggestions" role="listbox">
          {visibleSuggestions.map((suggestion, index) => {
            const prediction = suggestion.placePrediction;

            if (!prediction) {
              return null;
            }

            const mainText =
              prediction.mainText?.text || prediction.text?.text || "";

            const secondaryText = prediction.secondaryText?.text || "";

            return (
              <li
                key={prediction.placeId || `${prediction.text?.text}-${index}`}
                role="presentation"
              >
                <SuggestionButton
                  type="button"
                  role="option"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  <FiMapPin aria-hidden="true" />

                  <span>
                    <SuggestionMainText>{mainText}</SuggestionMainText>

                    {secondaryText && (
                      <SuggestionSecondaryText>
                        {secondaryText}
                      </SuggestionSecondaryText>
                    )}
                  </span>
                </SuggestionButton>
              </li>
            );
          })}
        </SuggestionsList>
      )}

      {selectedFormattedAddress && (
        <SelectedAddress>
          <SelectedAddressIcon aria-hidden="true">
            <FiMapPin />
          </SelectedAddressIcon>

          <SelectedAddressContent>
            <SelectedAddressLabel>Selected address</SelectedAddressLabel>

            <SelectedAddressText>
              {selectedFormattedAddress}
            </SelectedAddressText>
          </SelectedAddressContent>
        </SelectedAddress>
      )}

      {isLoading && (
        <SelectedAddressText role="status" aria-live="polite">
          Searching addresses...
        </SelectedAddressText>
      )}

      {error && (
        <AddressAutocompleteError role="alert">
          {error}
        </AddressAutocompleteError>
      )}
    </AddressAutocompleteContainer>
  );
};
