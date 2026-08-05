import {
  LocationSelectorBannerContainer,
  LocationSelectorBannerIcon,
  LocationSelectorBannerInformation,
  LocationSelectorBannerPrimary,
  LocationSelectorBannerWarehouse,
  LocationSelectorBannerSeparator,
  LocationSelectorBannerLocation,
  LocationSelectorBannerMessage,
  LocationSelectorBannerAction,
  LocationSelectorBannerActionContent,
  LocationSelectorBannerActionLabel,
  LocationSelectorBannerSpinner,
  LocationSelectorBannerError,
  LocationSelectorBannerCheck,
} from "./location_selector.styles";

const LocationPinIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 10C20 15.25 12 22 12 22C12 22 4 15.25 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
};

const ArrowIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LocationSelectorBanner = ({
  warehouseName,
  warehouseLocation,
  distanceMiles,
  isUsingDefaultWarehouse,
  isLoading,
  actionLabel,
  message,
  errorMessage,
  onAction,
  buttonState,
}) => {
  const hasDistance =
    !isUsingDefaultWarehouse && Number.isFinite(distanceMiles);

  const formattedDistance = hasDistance ? distanceMiles.toFixed(1) : "";

  const warehouseTransitionKey = [
    warehouseName,
    warehouseLocation,
    formattedDistance,
  ].join("-");

  const buttonLabel =
    buttonState === "loading"
      ? "Updating..."
      : buttonState === "success"
      ? "Location updated"
      : actionLabel;

  return (
    <LocationSelectorBannerContainer $isRefreshing={isLoading}>
      <LocationSelectorBannerIcon>
        <LocationPinIcon />
      </LocationSelectorBannerIcon>

      <LocationSelectorBannerInformation key={warehouseTransitionKey}>
        <LocationSelectorBannerPrimary>
          Shopping from{" "}
          <LocationSelectorBannerWarehouse>
            {warehouseName}
          </LocationSelectorBannerWarehouse>
        </LocationSelectorBannerPrimary>

        {warehouseLocation && (
          <>
            <LocationSelectorBannerSeparator aria-hidden="true">
              ·
            </LocationSelectorBannerSeparator>

            <LocationSelectorBannerLocation>
              {warehouseLocation}

              {hasDistance && ` · ${formattedDistance} miles away`}
            </LocationSelectorBannerLocation>
          </>
        )}
      </LocationSelectorBannerInformation>

      <LocationSelectorBannerMessage>{message}</LocationSelectorBannerMessage>

      <LocationSelectorBannerAction
        type="button"
        onClick={onAction}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        <LocationSelectorBannerActionContent key={buttonState}>
          {buttonState === "loading" && (
            <LocationSelectorBannerSpinner aria-hidden="true" />
          )}

          {buttonState === "success" && (
            <LocationSelectorBannerCheck aria-hidden="true">
              ✓
            </LocationSelectorBannerCheck>
          )}

          <LocationSelectorBannerActionLabel aria-live="polite">
            {buttonLabel}
          </LocationSelectorBannerActionLabel>

          {buttonState === "idle" && <ArrowIcon />}
        </LocationSelectorBannerActionContent>
      </LocationSelectorBannerAction>

      {errorMessage && (
        <LocationSelectorBannerError role="status">
          {errorMessage}
        </LocationSelectorBannerError>
      )}
    </LocationSelectorBannerContainer>
  );
};
