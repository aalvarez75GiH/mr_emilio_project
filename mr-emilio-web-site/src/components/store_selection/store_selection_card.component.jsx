import {
  FiAlertTriangle,
  FiClock,
  FiMapPin,
  FiNavigation,
} from "react-icons/fi";

import storeIcon from "../../assets/checkout/icons/storeIcon.svg";

import {
  StoreSelectionSection,
  StoreSelectionSectionLabel,
  StoreSelectionCardButton,
  StoreSelectionCardLayout,
  StoreIconColumn,
  StoreIconContainer,
  StoreIconImage,
  StoreMainContent,
  StoreSelectionColumn,
  StoreCardHeader,
  StoreRadio,
  StoreInformation,
  StoreName,
  StoreRecommendedBadge,
  StoreAddress,
  StoreMeta,
  StoreMetaItem,
  StoreDistanceWarning,
  StoreDistanceWarningIcon,
  StoreDistanceWarningContent,
  StoreDistanceWarningTitle,
  StoreDistanceWarningText,
  StoreHours,
  StoreHoursIcon,
  StoreHoursContent,
  StoreHoursLabel,
  StoreHoursValue,
} from "./store_selection_card.styles";

export const StoreSelectionCard = ({
  storeEntry,
  isSelected = false,
  isClosest = false,
  sectionLabel = null,
  onSelect,
}) => {
  const store = storeEntry?.warehouse;

  if (!store) {
    return null;
  }

  const distanceMiles = storeEntry?.customerContext?.distance?.miles;

  const pickupDistanceWarning =
    storeEntry?.customerContext?.fulfillment?.pickupDistanceWarning;

  const shouldShowDistanceWarning =
    pickupDistanceWarning?.shouldDisplay === true;

  const openingTime = store.warehouse_information?.opening_time;

  const closingTime = store.warehouse_information?.closing_time;

  const normalizedDistanceMiles = Number(distanceMiles);

  const hasValidDistance = Number.isFinite(normalizedDistanceMiles);

  const distanceLabel = hasValidDistance
    ? `${normalizedDistanceMiles.toFixed(1)} miles away`
    : null;

  const cardAriaLabel = [
    store.warehouse_name,
    store.physical_address,
    distanceLabel,
    shouldShowDistanceWarning
      ? "This store is farther than the recommended pickup distance."
      : null,
    isSelected ? "Selected" : "Not selected",
  ]
    .filter(Boolean)
    .join(". ");

  const handleSelect = () => {
    onSelect?.(storeEntry);
  };

  return (
    <StoreSelectionSection>
      {sectionLabel && (
        <StoreSelectionSectionLabel>{sectionLabel}</StoreSelectionSectionLabel>
      )}

      <StoreSelectionCardButton
        type="button"
        $selected={isSelected}
        aria-pressed={isSelected}
        aria-label={cardAriaLabel}
        onClick={handleSelect}
      >
        <StoreSelectionCardLayout>
          <StoreIconColumn>
            <StoreIconContainer>
              <StoreIconImage src={storeIcon} alt="" aria-hidden="true" />
            </StoreIconContainer>
          </StoreIconColumn>

          <StoreMainContent>
            <StoreCardHeader>
              <StoreInformation>
                <StoreName>{store.warehouse_name}</StoreName>

                {isClosest && (
                  <StoreRecommendedBadge>Closest to you</StoreRecommendedBadge>
                )}
              </StoreInformation>
            </StoreCardHeader>

            <StoreAddress>
              <FiMapPin aria-hidden="true" />

              <span>{store.physical_address}</span>
            </StoreAddress>

            {hasValidDistance && (
              <StoreMeta>
                <StoreMetaItem>
                  <FiNavigation aria-hidden="true" />
                  {normalizedDistanceMiles.toFixed(1)} miles away
                </StoreMetaItem>
              </StoreMeta>
            )}

            {shouldShowDistanceWarning && (
              <StoreDistanceWarning>
                <StoreDistanceWarningIcon aria-hidden="true">
                  <FiAlertTriangle />
                </StoreDistanceWarningIcon>

                <StoreDistanceWarningContent>
                  <StoreDistanceWarningTitle>
                    This store is farther away
                  </StoreDistanceWarningTitle>

                  <StoreDistanceWarningText>
                    Take into consideration that this store is{" "}
                    {normalizedDistanceMiles.toFixed(1)} miles away! You can
                    still choose this store, up to you.
                  </StoreDistanceWarningText>
                </StoreDistanceWarningContent>
              </StoreDistanceWarning>
            )}

            {(openingTime || closingTime) && (
              <StoreHours>
                <StoreHoursIcon aria-hidden="true">
                  <FiClock />
                </StoreHoursIcon>

                <StoreHoursContent>
                  <StoreHoursLabel>Pickup hours</StoreHoursLabel>

                  <StoreHoursValue>
                    {openingTime || "Opening time unavailable"}

                    {openingTime && closingTime ? " – " : ""}

                    {closingTime || "Closing time unavailable"}
                  </StoreHoursValue>
                </StoreHoursContent>
              </StoreHours>
            )}
          </StoreMainContent>

          <StoreSelectionColumn>
            <StoreRadio $selected={isSelected} aria-hidden="true" />
          </StoreSelectionColumn>
        </StoreSelectionCardLayout>
      </StoreSelectionCardButton>
    </StoreSelectionSection>
  );
};
