import { FiChevronRight, FiMapPin, FiTruck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { MainHeader } from "../../components/main_header/main_header.component";

import { CheckoutBackHeader } from "../../components/layout/checkout_back_header/checkout_back_header.component";

import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";

import { FULFILLMENT_METHODS } from "../../infrastructure/services/checkout/checkout.helpers";

import {
  DeliveryScreenTransition,
  DeliveryPage,
  DeliveryContainer,
  CheckoutProgress,
  CheckoutProgressItem,
  CheckoutProgressDot,
  CheckoutProgressLabel,
  CheckoutProgressLine,
  DeliveryHeader,
  DeliveryTitle,
  DeliverySubtitle,
  DeliveryOptions as DeliveryOptionsList,
  DeliveryOption,
  DeliveryOptionIcon,
  DeliveryOptionContent,
  DeliveryOptionTitle,
  DeliveryOptionDescription,
  DeliveryOptionMeta,
  DeliveryOptionRadio,
  DeliveryInfo,
  DeliveryContinueButton,
} from "./delivery_options.styles";

const TRANSITION_DURATION_MS = 260;

export const DeliveryOptions = () => {
  const navigate = useNavigate();

  const { checkout, selectFulfillmentMethod } = useCheckout();

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

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
    navigateWithTransition("/checkout", "back");
  };

  const handleContinue = () => {
    if (!checkout.fulfillmentMethod) {
      return;
    }

    if (checkout.fulfillmentMethod === FULFILLMENT_METHODS.PICKUP) {
      navigateWithTransition("/checkout/delivery/pickup", "forward");

      return;
    }

    if (checkout.fulfillmentMethod === FULFILLMENT_METHODS.LOCAL_DELIVERY) {
      navigateWithTransition("/checkout/information", "forward");
    }
  };

  const isPickupSelected =
    checkout.fulfillmentMethod === FULFILLMENT_METHODS.PICKUP;

  const isDeliverySelected =
    checkout.fulfillmentMethod === FULFILLMENT_METHODS.LOCAL_DELIVERY;

  return (
    <DeliveryScreenTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <CheckoutBackHeader
        label="Account"
        ariaLabel="Return to checkout options"
        onBack={handleBack}
      />

      <DeliveryPage>
        <DeliveryContainer>
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

          <DeliveryHeader>
            <DeliveryTitle>
              How would you like to receive your order?
            </DeliveryTitle>

            <DeliverySubtitle>
              Choose the option that works best for you.
            </DeliverySubtitle>
          </DeliveryHeader>

          <DeliveryOptionsList>
            <DeliveryOption
              type="button"
              $selected={isPickupSelected}
              aria-pressed={isPickupSelected}
              onClick={() =>
                selectFulfillmentMethod(FULFILLMENT_METHODS.PICKUP)
              }
            >
              <DeliveryOptionIcon>
                <FiMapPin />
              </DeliveryOptionIcon>

              <DeliveryOptionContent>
                <DeliveryOptionTitle>Pick up at a Store</DeliveryOptionTitle>

                <DeliveryOptionDescription>
                  Pick up your order at one of our convenient locations.
                </DeliveryOptionDescription>

                <DeliveryOptionMeta>Free</DeliveryOptionMeta>
              </DeliveryOptionContent>

              <DeliveryOptionRadio
                $selected={isPickupSelected}
                aria-hidden="true"
              />
            </DeliveryOption>

            <DeliveryOption
              type="button"
              $selected={isDeliverySelected}
              aria-pressed={isDeliverySelected}
              onClick={() =>
                selectFulfillmentMethod(FULFILLMENT_METHODS.LOCAL_DELIVERY)
              }
            >
              <DeliveryOptionIcon>
                <FiTruck />
              </DeliveryOptionIcon>

              <DeliveryOptionContent>
                <DeliveryOptionTitle>Local Delivery</DeliveryOptionTitle>

                <DeliveryOptionDescription>
                  We&apos;ll deliver your order directly to your address.
                </DeliveryOptionDescription>

                <DeliveryOptionMeta>$1.00 per mile</DeliveryOptionMeta>
              </DeliveryOptionContent>

              <DeliveryOptionRadio
                $selected={isDeliverySelected}
                aria-hidden="true"
              />
            </DeliveryOption>
          </DeliveryOptionsList>

          <DeliveryInfo>
            {isPickupSelected
              ? "Pick up your order any time during your selected store's opening hours."
              : isDeliverySelected
              ? "Local delivery is calculated at $1.00 per mile from the fulfilling store."
              : "Select pickup or local delivery to continue."}
          </DeliveryInfo>

          <DeliveryContinueButton
            type="button"
            disabled={!checkout.fulfillmentMethod}
            onClick={handleContinue}
          >
            Continue
            <FiChevronRight />
          </DeliveryContinueButton>
        </DeliveryContainer>
      </DeliveryPage>
    </DeliveryScreenTransition>
  );
};
