import {
  FiAlertTriangle,
  FiChevronRight,
  FiLock,
  FiMapPin,
} from "react-icons/fi";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MainHeader } from "../../components/main_header/main_header.component";
import { BackHeader } from "../../components/common/back_header/back_header.component";
import { AddressAutocomplete } from "../../components/forms/address_autocomplete/address_autocomplete.component";

import {
  FULFILLMENT_METHODS,
  buildDeliveryAddressString,
} from "../../infrastructure/services/checkout/checkout.helpers";

import { getLocalDeliveryQuoteRequest } from "../../infrastructure/services/warehouse/warehouse.requests";

import {
  isRequiredText,
  isValidEmail,
  isValidUSPhoneNumber,
} from "../../utils/validation/validation.helpers";

import { formatUSPhoneNumber } from "../../utils/validation/formatting.helpers";

import storeIcon from "../../assets/checkout/icons/storeIcon.svg";

import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";
import { useWarehouse } from "../../infrastructure/services/warehouse/use-warehouse.hook";

import {
  CustomerInformationTransition,
  CustomerInformationPage,
  CustomerInformationContainer,
  CheckoutProgress,
  CheckoutProgressItem,
  CheckoutProgressDot,
  CheckoutProgressLabel,
  CheckoutProgressLine,
  CustomerInformationHeader,
  CustomerInformationTitle,
  CustomerInformationSubtitle,
  CustomerForm,
  FormSection,
  FormSectionTitle,
  FieldsGrid,
  FormField,
  FormLabel,
  FormInput,
  FulfillmentSummary,
  FulfillmentSummaryIcon,
  FulfillmentSummaryContent,
  FulfillmentSummaryEyebrow,
  FulfillmentSummaryTitle,
  FulfillmentSummaryText,
  PickupDistanceWarning,
  PickupDistanceWarningIcon,
  PickupDistanceWarningContent,
  PickupDistanceWarningTitle,
  PickupDistanceWarningText,
  FulfillmentSummaryAction,
  CustomerInformationContinueButton,
  DeliveryQuoteError,
  SecureMessage,
} from "./customer_information.styles";

const TRANSITION_DURATION_MS = 260;

export const CustomerInformation = () => {
  const navigate = useNavigate();

  const {
    checkout,
    updateCustomer,
    updateDeliveryAddress,
    setLocalDeliveryQuote,
  } = useCheckout();

  const { warehouse: originatingWarehouse } = useWarehouse();

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  const [isDeliveryQuoteLoading, setIsDeliveryQuoteLoading] = useState(false);

  const [deliveryQuoteError, setDeliveryQuoteError] = useState("");

  const isPickup = checkout.fulfillmentMethod === FULFILLMENT_METHODS.PICKUP;

  const isLocalDelivery =
    checkout.fulfillmentMethod === FULFILLMENT_METHODS.LOCAL_DELIVERY;

  const customer = checkout.customer;

  const deliveryAddress = checkout.delivery.address;

  const selectedWarehouse = checkout.pickup.selectedWarehouse;

  const pickupCustomerContext = checkout.pickup.customerContext;

  const pickupDistanceMiles = Number(pickupCustomerContext?.distance?.miles);

  const pickupDistanceWarning =
    pickupCustomerContext?.fulfillment?.pickupDistanceWarning;

  const shouldShowPickupDistanceWarning =
    pickupDistanceWarning?.shouldDisplay === true;

  const hasValidPickupDistance = Number.isFinite(pickupDistanceMiles);

  const formIsValid = useMemo(() => {
    const customerIsValid =
      isRequiredText(customer.firstName) &&
      isRequiredText(customer.lastName) &&
      isValidEmail(customer.email) &&
      isValidUSPhoneNumber(customer.phone);

    if (!customerIsValid) {
      return false;
    }

    if (isPickup) {
      return Boolean(checkout.pickup.selectedWarehouseId);
    }

    if (isLocalDelivery) {
      /*
       * These values are populated only after
       * the customer selects a Google Places
       * autocomplete suggestion.
       *
       * Typing text alone will not make the
       * Local Delivery form valid.
       */
      return (
        isRequiredText(deliveryAddress.street) &&
        isRequiredText(deliveryAddress.city) &&
        isRequiredText(deliveryAddress.state) &&
        isRequiredText(deliveryAddress.postalCode)
      );
    }

    return false;
  }, [
    customer,
    checkout.pickup.selectedWarehouseId,
    deliveryAddress,
    isPickup,
    isLocalDelivery,
  ]);

  const navigateWithTransition = (path, direction) => {
    setTransitionState({
      isExiting: true,
      direction,
    });

    window.setTimeout(() => {
      navigate(path);
    }, TRANSITION_DURATION_MS);
  };

  const handleBack = () => {
    if (isPickup) {
      navigateWithTransition("/checkout/delivery/pickup", "back");

      return;
    }

    navigateWithTransition("/checkout/delivery", "back");
  };

  const handleCustomerFieldChange = (field, value) => {
    updateCustomer({
      [field]: value,
    });
  };

  const handleAddressFieldChange = (field, value) => {
    updateDeliveryAddress({
      [field]: value,
    });
  };

  const handleAutocompleteInputChange = (value) => {
    /*
     * The customer has started changing the
     * address after either typing or previously
     * selecting a Google suggestion.
     *
     * Keep only what they are currently typing
     * as the street search value and invalidate
     * the structured address.
     *
     * This prevents an old city/state/ZIP from
     * being submitted with a different street.
     */
    updateDeliveryAddress({
      street: value,

      city: "",
      state: "",
      postalCode: "",

      formattedAddress: null,
      placeId: null,
      coordinates: null,
    });

    setDeliveryQuoteError("");
  };

  const handleAutocompleteAddressSelected = (selectedAddress) => {
    if (!selectedAddress) {
      return;
    }

    /*
     * Preserve both the structured address
     * required by the current checkout logic
     * and the useful Google Places metadata.
     *
     * buildDeliveryAddressString() will continue
     * using street/city/state/postalCode.
     */
    updateDeliveryAddress({
      street: selectedAddress.street || "",

      city: selectedAddress.city || "",

      state: selectedAddress.state || "",

      postalCode: selectedAddress.postalCode || "",

      formattedAddress: selectedAddress.formattedAddress || null,

      placeId: selectedAddress.placeId || null,

      coordinates: selectedAddress.coordinates || null,
    });

    setDeliveryQuoteError("");
  };

  const handleChangeStore = () => {
    navigateWithTransition("/checkout/delivery/pickup", "back");
  };

  const handleContinue = async (event) => {
    event.preventDefault();

    if (!formIsValid || isDeliveryQuoteLoading) {
      return;
    }

    /*
     * PICKUP
     *
     * Store selection has already been resolved,
     * so Pickup can continue directly to Payment.
     */
    if (isPickup) {
      navigateWithTransition("/checkout/payment", "forward");

      return;
    }

    if (!isLocalDelivery) {
      return;
    }

    /*
     * LOCAL DELIVERY
     *
     * Google Places improves address entry,
     * but our backend remains authoritative for:
     *
     * - delivery availability;
     * - fulfilling store;
     * - distance;
     * - delivery radius;
     * - $1.00 / mile delivery fee.
     */
    setIsDeliveryQuoteLoading(true);
    setDeliveryQuoteError("");

    try {
      const formattedAddress = buildDeliveryAddressString(
        checkout.delivery.address
      );

      if (!originatingWarehouse?.id) {
        setDeliveryQuoteError(
          "We couldn't determine the store serving your order. Please return to the store selection and try again."
        );

        return;
      }
      //   const quote = await getLocalDeliveryQuoteRequest(formattedAddress);
      const quote = await getLocalDeliveryQuoteRequest({
        warehouseId: originatingWarehouse.id,

        address: formattedAddress,
      });
      setLocalDeliveryQuote(quote);

      if (quote.available !== true) {
        const isOutsideDeliveryRadius =
          quote.reason === "OUTSIDE_DELIVERY_RADIUS";

        setDeliveryQuoteError(
          isOutsideDeliveryRadius
            ? "This address is outside our local delivery area. Please enter another address or choose Pickup."
            : "Local delivery is not currently available to this address."
        );

        return;
      }

      navigateWithTransition("/checkout/payment", "forward");
    } catch (error) {
      console.error("Unable to calculate local delivery:", error);

      setDeliveryQuoteError(
        "We couldn't verify this delivery address. Please check the address and try again."
      );
    } finally {
      setIsDeliveryQuoteLoading(false);
    }
  };

  return (
    <CustomerInformationTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <BackHeader
        label={isPickup ? "Stores" : "Delivery type"}
        ariaLabel={
          isPickup ? "Return to store selection" : "Return to delivery options"
        }
        onBack={handleBack}
      />

      <CustomerInformationPage>
        <CustomerInformationContainer>
          <CheckoutProgress>
            <CheckoutProgressItem $active>
              <CheckoutProgressDot $active>1</CheckoutProgressDot>

              <CheckoutProgressLabel $active>Delivery</CheckoutProgressLabel>
            </CheckoutProgressItem>

            <CheckoutProgressLine />

            <CheckoutProgressItem>
              <CheckoutProgressDot>2</CheckoutProgressDot>

              <CheckoutProgressLabel>Payment</CheckoutProgressLabel>
            </CheckoutProgressItem>

            <CheckoutProgressLine />

            <CheckoutProgressItem>
              <CheckoutProgressDot>3</CheckoutProgressDot>

              <CheckoutProgressLabel>Review</CheckoutProgressLabel>
            </CheckoutProgressItem>
          </CheckoutProgress>

          <CustomerInformationHeader>
            <CustomerInformationTitle>
              Customer Information
            </CustomerInformationTitle>

            <CustomerInformationSubtitle>
              {isLocalDelivery
                ? "Please provide your contact and delivery information."
                : "Please provide your contact details for your order."}
            </CustomerInformationSubtitle>
          </CustomerInformationHeader>

          <CustomerForm onSubmit={handleContinue}>
            <FormSection>
              <FormSectionTitle>Contact Details</FormSectionTitle>

              <FieldsGrid>
                <FormField>
                  <FormLabel htmlFor="checkout-first-name">
                    First name
                  </FormLabel>

                  <FormInput
                    id="checkout-first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Enter your first name"
                    value={customer.firstName}
                    onChange={(event) =>
                      handleCustomerFieldChange("firstName", event.target.value)
                    }
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="checkout-last-name">Last name</FormLabel>

                  <FormInput
                    id="checkout-last-name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Enter your last name"
                    value={customer.lastName}
                    onChange={(event) =>
                      handleCustomerFieldChange("lastName", event.target.value)
                    }
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="checkout-email">Email</FormLabel>

                  <FormInput
                    id="checkout-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={customer.email}
                    onChange={(event) =>
                      handleCustomerFieldChange("email", event.target.value)
                    }
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="checkout-phone">Phone number</FormLabel>

                  <FormInput
                    id="checkout-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    maxLength={14}
                    value={customer.phone}
                    onChange={(event) =>
                      handleCustomerFieldChange(
                        "phone",
                        formatUSPhoneNumber(event.target.value)
                      )
                    }
                  />
                </FormField>
              </FieldsGrid>
            </FormSection>

            {isLocalDelivery && (
              <FormSection>
                <FormSectionTitle>Delivery Address</FormSectionTitle>

                <FieldsGrid>
                  <FormField>
                    <FormLabel htmlFor="checkout-address-search">
                      Address
                    </FormLabel>

                    <AddressAutocomplete
                      value={deliveryAddress.street}
                      onInputChange={handleAutocompleteInputChange}
                      onAddressSelected={handleAutocompleteAddressSelected}
                      disabled={isDeliveryQuoteLoading}
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="checkout-unit">
                      Apt, suite, unit <span>(optional)</span>
                    </FormLabel>

                    <FormInput
                      id="checkout-unit"
                      type="text"
                      autoComplete="address-line2"
                      placeholder="Apt 2B"
                      value={deliveryAddress.unit}
                      disabled={isDeliveryQuoteLoading}
                      onChange={(event) =>
                        handleAddressFieldChange("unit", event.target.value)
                      }
                    />
                  </FormField>
                </FieldsGrid>
              </FormSection>
            )}
            {isPickup && selectedWarehouse && (
              <FulfillmentSummary>
                <FulfillmentSummaryIcon aria-hidden="true">
                  <img src={storeIcon} alt="" />
                </FulfillmentSummaryIcon>

                <FulfillmentSummaryContent>
                  <FulfillmentSummaryEyebrow>
                    Pickup store
                  </FulfillmentSummaryEyebrow>

                  <FulfillmentSummaryTitle>
                    {selectedWarehouse.warehouse_name}
                  </FulfillmentSummaryTitle>

                  <FulfillmentSummaryText>
                    {selectedWarehouse.physical_address}
                  </FulfillmentSummaryText>

                  {hasValidPickupDistance && (
                    <FulfillmentSummaryText>
                      {pickupDistanceMiles.toFixed(1)} miles away
                    </FulfillmentSummaryText>
                  )}

                  {shouldShowPickupDistanceWarning && (
                    <PickupDistanceWarning role="note">
                      <PickupDistanceWarningIcon aria-hidden="true">
                        <FiAlertTriangle />
                      </PickupDistanceWarningIcon>

                      <PickupDistanceWarningContent>
                        <PickupDistanceWarningTitle>
                          This store is farther away
                        </PickupDistanceWarningTitle>

                        <PickupDistanceWarningText>
                          Take into consideration that this store is{" "}
                          {pickupDistanceMiles.toFixed(1)} miles away! You can
                          still choose this store, up to you.
                        </PickupDistanceWarningText>
                      </PickupDistanceWarningContent>
                    </PickupDistanceWarning>
                  )}

                  <FulfillmentSummaryAction
                    type="button"
                    onClick={handleChangeStore}
                  >
                    Change store
                  </FulfillmentSummaryAction>
                </FulfillmentSummaryContent>
              </FulfillmentSummary>
            )}

            {isLocalDelivery && (
              <FulfillmentSummary>
                <FulfillmentSummaryIcon aria-hidden="true">
                  <FiMapPin />
                </FulfillmentSummaryIcon>

                <FulfillmentSummaryContent>
                  <FulfillmentSummaryEyebrow>
                    Local delivery
                  </FulfillmentSummaryEyebrow>

                  <FulfillmentSummaryTitle>
                    $1.00 per mile
                  </FulfillmentSummaryTitle>

                  <FulfillmentSummaryText>
                    We&apos;ll verify your address and calculate the delivery
                    distance and fee before payment.
                  </FulfillmentSummaryText>
                </FulfillmentSummaryContent>
              </FulfillmentSummary>
            )}

            {deliveryQuoteError && (
              <DeliveryQuoteError role="alert">
                {deliveryQuoteError}
              </DeliveryQuoteError>
            )}

            <CustomerInformationContinueButton
              type="submit"
              disabled={!formIsValid || isDeliveryQuoteLoading}
            >
              {isDeliveryQuoteLoading ? "Calculating delivery..." : "Continue"}

              {!isDeliveryQuoteLoading && <FiChevronRight aria-hidden="true" />}
            </CustomerInformationContinueButton>

            <SecureMessage>
              <FiLock aria-hidden="true" />

              <span>Your information is protected and handled securely.</span>
            </SecureMessage>
          </CustomerForm>
        </CustomerInformationContainer>
      </CustomerInformationPage>
    </CustomerInformationTransition>
  );
};
