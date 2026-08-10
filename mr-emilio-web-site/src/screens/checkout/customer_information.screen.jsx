import { FiChevronRight, FiLock, FiMapPin } from "react-icons/fi";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MainHeader } from "../../components/main_header/main_header.component";
import { CheckoutBackHeader } from "../../components/layout/checkout_back_header/checkout_back_header.component";

import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";

import {
  FULFILLMENT_METHODS,
  buildDeliveryAddressString,
} from "../../infrastructure/services/checkout/checkout.helpers";

import storeIcon from "../../assets/checkout/icons/storeIcon.svg";

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
  AddressGrid,
  FulfillmentSummary,
  FulfillmentSummaryIcon,
  FulfillmentSummaryContent,
  FulfillmentSummaryEyebrow,
  FulfillmentSummaryTitle,
  FulfillmentSummaryText,
  FulfillmentSummaryAction,
  CustomerInformationContinueButton,
  DeliveryQuoteError,
  SecureMessage,
} from "./customer_information.styles";

import {
  isRequiredText,
  isValidEmail,
  isValidUSPhoneNumber,
} from "../../utils/validation/validation.helpers";

import { getLocalDeliveryQuoteRequest } from "../../infrastructure/services/warehouse/warehouse.requests";

import { formatUSPhoneNumber } from "../../utils/validation/formatting.helpers";

const TRANSITION_DURATION_MS = 260;

export const CustomerInformation = () => {
  const navigate = useNavigate();

  const {
    checkout,
    updateCustomer,
    updateDeliveryAddress,
    setLocalDeliveryQuote,
  } = useCheckout();

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

  const handleChangeStore = () => {
    navigateWithTransition("/checkout/delivery/pickup", "back");
  };

  const handleContinue = async (event) => {
    event.preventDefault();

    if (!formIsValid || isDeliveryQuoteLoading) {
      return;
    }

    if (isPickup) {
      navigateWithTransition("/checkout/payment", "forward");

      return;
    }

    if (!isLocalDelivery) {
      return;
    }

    setIsDeliveryQuoteLoading(true);
    setDeliveryQuoteError("");

    try {
      const formattedAddress = buildDeliveryAddressString(
        checkout.delivery.address
      );

      const quote = await getLocalDeliveryQuoteRequest(formattedAddress);

      setLocalDeliveryQuote(quote);

      if (quote.available !== true) {
        setDeliveryQuoteError(
          "Local delivery is not currently available to this address."
        );

        return;
      }
      console.log("DELIVERY READY FOR PAYMENT:", {
        available: quote.available,
        store: quote.warehouse?.warehouse_name,
        distanceMiles: quote.distance?.miles,
        deliveryFee: quote.deliveryFee?.amount,
        deliveryFeeInCents: quote.deliveryFee?.amountInCents,
      });

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

      <CheckoutBackHeader
        label={isPickup ? "Store" : "Delivery"}
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
                    <FormLabel htmlFor="checkout-street">
                      Street address
                    </FormLabel>

                    <FormInput
                      id="checkout-street"
                      type="text"
                      autoComplete="address-line1"
                      placeholder="123 Main Street"
                      value={deliveryAddress.street}
                      onChange={(event) =>
                        handleAddressFieldChange("street", event.target.value)
                      }
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
                      onChange={(event) =>
                        handleAddressFieldChange("unit", event.target.value)
                      }
                    />
                  </FormField>

                  <AddressGrid>
                    <FormField>
                      <FormLabel htmlFor="checkout-city">City</FormLabel>

                      <FormInput
                        id="checkout-city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="Athens"
                        value={deliveryAddress.city}
                        onChange={(event) =>
                          handleAddressFieldChange("city", event.target.value)
                        }
                      />
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="checkout-state">State</FormLabel>

                      <FormInput
                        id="checkout-state"
                        type="text"
                        autoComplete="address-level1"
                        placeholder="GA"
                        maxLength={2}
                        value={deliveryAddress.state}
                        onChange={(event) =>
                          handleAddressFieldChange(
                            "state",
                            event.target.value.toUpperCase()
                          )
                        }
                      />
                    </FormField>
                  </AddressGrid>

                  <FormField>
                    <FormLabel htmlFor="checkout-postal-code">
                      ZIP code
                    </FormLabel>

                    <FormInput
                      id="checkout-postal-code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="30606"
                      maxLength={10}
                      value={deliveryAddress.postalCode}
                      onChange={(event) =>
                        handleAddressFieldChange(
                          "postalCode",
                          event.target.value
                        )
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
