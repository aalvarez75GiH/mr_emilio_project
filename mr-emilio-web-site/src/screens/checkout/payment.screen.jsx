import { FiChevronRight, FiCreditCard, FiLock, FiMapPin } from "react-icons/fi";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MainHeader } from "../../components/main_header/main_header.component";
import { CheckoutBackHeader } from "../../components/layout/checkout_back_header/checkout_back_header.component";

import { useCart } from "../../infrastructure/services/cart/use-cart.hook";
import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";

import { FULFILLMENT_METHODS } from "../../infrastructure/services/checkout/checkout.helpers";

import storeIcon from "../../assets/checkout/icons/storeIcon.svg";

import {
  PaymentTransition,
  PaymentPage,
  PaymentContainer,
  CheckoutProgress,
  CheckoutProgressItem,
  CheckoutProgressDot,
  CheckoutProgressLabel,
  CheckoutProgressLine,
  PaymentHeader,
  PaymentTitle,
  PaymentSubtitle,
  PaymentLayout,
  PaymentMainColumn,
  PaymentSideColumn,
  PaymentSection,
  PaymentSectionTitle,
  OrderItems,
  OrderItem,
  OrderItemImageContainer,
  OrderItemImage,
  OrderItemContent,
  OrderItemName,
  OrderItemDescription,
  OrderItemMeta,
  OrderItemPrice,
  FulfillmentPanel,
  FulfillmentIcon,
  FulfillmentContent,
  FulfillmentEyebrow,
  FulfillmentTitle,
  FulfillmentText,
  FulfillmentHours,
  FulfillmentHoursLabel,
  FulfillmentHoursValue,
  FulfillmentMeta,
  SummaryPanel,
  SummaryTitle,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryDivider,
  SummaryTotalRow,
  SummaryTotalLabel,
  SummaryTotalValue,
  TaxMessage,
  PaymentMethods,
  PaymentMethod,
  PaymentMethodRadio,
  PaymentMethodIcon,
  PaymentMethodContent,
  PaymentMethodTitle,
  PaymentMethodDescription,
  PaymentProviderBadges,
  PaymentProviderBadge,
  StripePlaceholder,
  StripePlaceholderIcon,
  StripePlaceholderContent,
  StripePlaceholderTitle,
  StripePlaceholderText,
  ContinueButton,
  SecureMessage,
} from "./payment.styles";

const TRANSITION_DURATION_MS = 260;

const PAYMENT_METHODS = Object.freeze({
  CARD: "card",
});

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount || 0));

export const Payment = () => {
  const navigate = useNavigate();

  const { cartItems, cartQuantity, cartSubtotal } = useCart();

  const { checkout } = useCheckout();

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CARD);

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  const isPickup = checkout.fulfillmentMethod === FULFILLMENT_METHODS.PICKUP;

  const isLocalDelivery =
    checkout.fulfillmentMethod === FULFILLMENT_METHODS.LOCAL_DELIVERY;

  const selectedPickupWarehouse = checkout.pickup?.selectedWarehouse || null;

  const deliveryWarehouse = checkout.delivery?.fulfillingWarehouse || null;

  const deliveryFee = isLocalDelivery
    ? Number(checkout.delivery?.deliveryFee || 0)
    : 0;

  /*
   * Stripe Tax will replace this value when we integrate it.
   */
  const tax = Number(checkout.pricing?.tax || 0);

  const currentTotal = useMemo(
    () => Number(cartSubtotal || 0) + deliveryFee + tax,
    [cartSubtotal, deliveryFee, tax]
  );

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
    navigateWithTransition("/checkout/information", "back");
  };

  const handleContinue = () => {
    /*
     * Stripe payment confirmation needs to happen
     * before we allow the customer into Review.
     *
     * For now this screen stops here intentionally.
     */
    console.log("PAYMENT CHECKOUT STATE:", {
      paymentMethod,
      cartSubtotal,
      deliveryFee,
      tax,
      currentTotal,
      checkout,
    });
  };

  return (
    <PaymentTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <CheckoutBackHeader
        label="Information"
        ariaLabel="Return to customer information"
        onBack={handleBack}
      />

      <PaymentPage>
        <PaymentContainer>
          <CheckoutProgress>
            <CheckoutProgressItem $complete>
              <CheckoutProgressDot $complete>✓</CheckoutProgressDot>

              <CheckoutProgressLabel $complete>Delivery</CheckoutProgressLabel>
            </CheckoutProgressItem>

            <CheckoutProgressLine $complete />

            <CheckoutProgressItem $active>
              <CheckoutProgressDot $active>2</CheckoutProgressDot>

              <CheckoutProgressLabel $active>Payment</CheckoutProgressLabel>
            </CheckoutProgressItem>

            <CheckoutProgressLine />

            <CheckoutProgressItem>
              <CheckoutProgressDot>3</CheckoutProgressDot>

              <CheckoutProgressLabel>Review</CheckoutProgressLabel>
            </CheckoutProgressItem>
          </CheckoutProgress>

          <PaymentHeader>
            <PaymentTitle>Payment</PaymentTitle>

            <PaymentSubtitle>
              Review your order and choose your payment method.
            </PaymentSubtitle>
          </PaymentHeader>

          <PaymentLayout>
            <PaymentMainColumn>
              <PaymentSection>
                <PaymentSectionTitle>Payment Method</PaymentSectionTitle>

                <PaymentMethods>
                  <PaymentMethod
                    type="button"
                    $selected={paymentMethod === PAYMENT_METHODS.CARD}
                    onClick={() => setPaymentMethod(PAYMENT_METHODS.CARD)}
                  >
                    <PaymentMethodRadio
                      $selected={paymentMethod === PAYMENT_METHODS.CARD}
                      aria-hidden="true"
                    />

                    <PaymentMethodIcon aria-hidden="true">
                      <FiCreditCard />
                    </PaymentMethodIcon>

                    <PaymentMethodContent>
                      <PaymentMethodTitle>
                        Credit or Debit Card
                      </PaymentMethodTitle>

                      <PaymentMethodDescription>
                        Pay securely with your card.
                      </PaymentMethodDescription>
                    </PaymentMethodContent>

                    <PaymentProviderBadges>
                      <PaymentProviderBadge>VISA</PaymentProviderBadge>

                      <PaymentProviderBadge>MC</PaymentProviderBadge>

                      <PaymentProviderBadge>AMEX</PaymentProviderBadge>
                    </PaymentProviderBadges>
                  </PaymentMethod>
                </PaymentMethods>

                <StripePlaceholder>
                  <StripePlaceholderIcon>
                    <FiLock />
                  </StripePlaceholderIcon>

                  <StripePlaceholderContent>
                    <StripePlaceholderTitle>
                      Secure card payment
                    </StripePlaceholderTitle>

                    <StripePlaceholderText>
                      Stripe&apos;s secure payment form will appear here. Card
                      details will not be stored by Mr. Emilio.
                    </StripePlaceholderText>
                  </StripePlaceholderContent>
                </StripePlaceholder>
              </PaymentSection>

              <PaymentSection>
                <PaymentSectionTitle>Fulfillment</PaymentSectionTitle>

                {isPickup && selectedPickupWarehouse && (
                  <FulfillmentPanel>
                    <FulfillmentIcon>
                      <img src={storeIcon} alt="" aria-hidden="true" />
                    </FulfillmentIcon>

                    <FulfillmentContent>
                      <FulfillmentEyebrow>Pickup store</FulfillmentEyebrow>

                      <FulfillmentTitle>
                        {selectedPickupWarehouse.warehouse_name}
                      </FulfillmentTitle>

                      <FulfillmentText>
                        {selectedPickupWarehouse.physical_address}
                      </FulfillmentText>

                      {(selectedPickupWarehouse.warehouse_information
                        ?.opening_time ||
                        selectedPickupWarehouse.warehouse_information
                          ?.closing_time) && (
                        <FulfillmentHours>
                          <FulfillmentHoursLabel>
                            Pickup hours
                          </FulfillmentHoursLabel>

                          <FulfillmentHoursValue>
                            {selectedPickupWarehouse.warehouse_information
                              ?.opening_time || "—"}
                            {" – "}
                            {selectedPickupWarehouse.warehouse_information
                              ?.closing_time || "—"}
                          </FulfillmentHoursValue>
                        </FulfillmentHours>
                      )}
                    </FulfillmentContent>
                  </FulfillmentPanel>
                )}

                {isLocalDelivery && (
                  <FulfillmentPanel>
                    <FulfillmentIcon>
                      <FiMapPin />
                    </FulfillmentIcon>

                    <FulfillmentContent>
                      <FulfillmentEyebrow>Local delivery</FulfillmentEyebrow>

                      <FulfillmentTitle>Delivery address</FulfillmentTitle>

                      <FulfillmentText>
                        {checkout.delivery?.resolvedAddress ||
                          "Delivery address unavailable"}
                      </FulfillmentText>

                      <FulfillmentMeta>
                        {Number(checkout.delivery?.distanceMiles || 0).toFixed(
                          2
                        )}{" "}
                        miles
                        {" · "}
                        {formatCurrency(deliveryFee)} delivery
                      </FulfillmentMeta>

                      {deliveryWarehouse && (
                        <FulfillmentText>
                          Fulfilled by {deliveryWarehouse.warehouse_name}
                        </FulfillmentText>
                      )}
                    </FulfillmentContent>
                  </FulfillmentPanel>
                )}
              </PaymentSection>

              <PaymentSection>
                <PaymentSectionTitle>Your items</PaymentSectionTitle>

                <OrderItems>
                  {cartItems.map((item) => {
                    const lineTotal =
                      Number(item.price || 0) * Number(item.quantity || 0);

                    return (
                      <OrderItem key={item.key}>
                        <OrderItemImageContainer>
                          <OrderItemImage
                            src={item.image}
                            alt={item.alt || item.name}
                          />
                        </OrderItemImageContainer>

                        <OrderItemContent>
                          <OrderItemName>{item.name}</OrderItemName>

                          {item.description && (
                            <OrderItemDescription>
                              {item.description}
                            </OrderItemDescription>
                          )}

                          <OrderItemMeta>
                            {item.sizeLabel && <span>{item.sizeLabel}</span>}

                            {item.sizeLabel && (
                              <span aria-hidden="true">·</span>
                            )}

                            <span>Qty {item.quantity}</span>
                          </OrderItemMeta>
                        </OrderItemContent>

                        <OrderItemPrice>
                          {formatCurrency(lineTotal)}
                        </OrderItemPrice>
                      </OrderItem>
                    );
                  })}
                </OrderItems>
              </PaymentSection>
            </PaymentMainColumn>

            <PaymentSideColumn>
              <SummaryPanel>
                <SummaryTitle>Order Summary</SummaryTitle>

                <SummaryRow>
                  <SummaryLabel>
                    Subtotal ({cartQuantity}{" "}
                    {cartQuantity === 1 ? "item" : "items"})
                  </SummaryLabel>

                  <SummaryValue>{formatCurrency(cartSubtotal)}</SummaryValue>
                </SummaryRow>

                {isPickup && (
                  <SummaryRow>
                    <SummaryLabel>Pickup</SummaryLabel>

                    <SummaryValue>Free</SummaryValue>
                  </SummaryRow>
                )}

                {isLocalDelivery && (
                  <SummaryRow>
                    <SummaryLabel>Local delivery</SummaryLabel>

                    <SummaryValue>{formatCurrency(deliveryFee)}</SummaryValue>
                  </SummaryRow>
                )}

                <SummaryRow>
                  <SummaryLabel>Sales tax</SummaryLabel>

                  <SummaryValue>Calculated with Stripe</SummaryValue>
                </SummaryRow>

                <SummaryDivider />

                <SummaryTotalRow>
                  <SummaryTotalLabel>Current total</SummaryTotalLabel>

                  <SummaryTotalValue>
                    {formatCurrency(currentTotal)}
                  </SummaryTotalValue>
                </SummaryTotalRow>

                <TaxMessage>
                  Final tax and total will be confirmed securely before your
                  payment is submitted.
                </TaxMessage>

                <ContinueButton type="button" onClick={handleContinue}>
                  Continue to Review
                  <FiChevronRight />
                </ContinueButton>

                <SecureMessage>
                  <FiLock />
                  Your payment information is protected and handled securely.
                </SecureMessage>
              </SummaryPanel>
            </PaymentSideColumn>
          </PaymentLayout>
        </PaymentContainer>
      </PaymentPage>
    </PaymentTransition>
  );
};
