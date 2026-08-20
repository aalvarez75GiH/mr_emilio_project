import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FiChevronRight, FiCreditCard, FiLock, FiMapPin } from "react-icons/fi";

import { Elements } from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

import { stripePromise } from "../../infrastructure/stripe/stripe.client";

import { getStripeCustomerError } from "../../infrastructure/stripe/stripe.errors";

import { useCart } from "../../infrastructure/services/cart/use-cart.hook";

import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";

import { FULFILLMENT_METHODS } from "../../infrastructure/services/checkout/checkout.helpers";

import { MainHeader } from "../../components/main_header/main_header.component";

import { BackHeader } from "../../components/common/back_header/back_header.component";
import { Snackbar } from "../../components/layout/snackbar/snackbar.component";

import { StripePaymentForm } from "../../components/forms/stripe_payment_form/stripe_payment_form.component";

import storeIcon from "../../assets/checkout/icons/storeIcon.svg";

import { prepareReviewRequest } from "../../infrastructure/services/checkout/checkout.requests";

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
  ContinueButton,
  SecureMessage,
} from "./payment.styles";

const TRANSITION_DURATION_MS = 260;

const SNACKBAR_DURATION_MS = 4200;

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

  const { checkout, setPaymentPreparation, setReviewPreparation } =
    useCheckout();
  console.log(
    "Checkout state in Payment screen:",
    JSON.stringify(checkout, null, 2)
  );

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CARD);

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  /**
   * Stripe lifecycle state.
   */
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);

  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const [isPaymentPreparing, setIsPaymentPreparing] = useState(false);

  /**
   * Snackbar state.
   */
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    type: "error",
    title: "",
    message: "",
  });

  const stripePaymentFormRef = useRef(null);

  const snackbarTimeoutRef = useRef(null);

  const isPickup = checkout.fulfillmentMethod === FULFILLMENT_METHODS.PICKUP;

  const isLocalDelivery =
    checkout.fulfillmentMethod === FULFILLMENT_METHODS.LOCAL_DELIVERY;

  const selectedPickupWarehouse = checkout.pickup?.selectedWarehouse || null;

  const deliveryWarehouse = checkout.delivery?.fulfillingWarehouse || null;

  const deliveryFee = isLocalDelivery
    ? Number(checkout.delivery?.deliveryFee || 0)
    : 0;

  /**
   * Stripe Tax will replace this
   * provisional value in the next
   * checkout integration step.
   */
  const tax = Number(checkout.pricing?.tax || 0);

  const currentTotal = useMemo(
    () => Number(cartSubtotal || 0) + deliveryFee + tax,
    [cartSubtotal, deliveryFee, tax]
  );

  /**
   * Stripe uses cents for USD.
   *
   * Example:
   * $17.77 → 1777
   */
  const stripeAmountInCents = useMemo(
    () => Math.max(50, Math.round(Number(currentTotal || 0) * 100)),
    [currentTotal]
  );

  /**
   * Deferred Stripe Elements setup.
   *
   * IMPORTANT:
   *
   * We do NOT create a PaymentIntent
   * on this screen.
   *
   * We are explicitly restricting the
   * integration to card payments for now.
   */
  const stripeElementsOptions = useMemo(
    () => ({
      mode: "payment",

      amount: stripeAmountInCents,

      currency: "usd",

      locale: "en",

      paymentMethodCreation: "manual",

      paymentMethodTypes: ["card"],

      appearance: {
        theme: "stripe",

        variables: {
          borderRadius: "10px",
        },
      },
    }),
    [stripeAmountInCents]
  );

  const closeSnackbar = useCallback(() => {
    if (snackbarTimeoutRef.current) {
      window.clearTimeout(snackbarTimeoutRef.current);

      snackbarTimeoutRef.current = null;
    }

    setSnackbar((currentSnackbar) => ({
      ...currentSnackbar,

      isOpen: false,
    }));
  }, []);

  const showPaymentError = useCallback((error) => {
    const customerError = getStripeCustomerError(error);

    if (snackbarTimeoutRef.current) {
      window.clearTimeout(snackbarTimeoutRef.current);
    }

    setSnackbar({
      isOpen: true,

      type: "error",

      title: customerError.title,

      message: customerError.message,
    });

    snackbarTimeoutRef.current = window.setTimeout(() => {
      setSnackbar((currentSnackbar) => ({
        ...currentSnackbar,

        isOpen: false,
      }));

      snackbarTimeoutRef.current = null;
    }, SNACKBAR_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (snackbarTimeoutRef.current) {
        window.clearTimeout(snackbarTimeoutRef.current);
      }
    };
  }, []);

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
    if (isPaymentPreparing) {
      return;
    }

    navigateWithTransition("/checkout/information", "back");
  };

  const buildPrepareReviewPayload = (confirmationTokenId) => {
    const cartItemsPayload = cartItems.map((item) => ({
      productId: item.id || item.productId,
      quantity: Number(item.quantity),
    }));

    const basePayload = {
      cartItems: cartItemsPayload,

      fulfillmentMethod: checkout.fulfillmentMethod,

      confirmationTokenId,
    };

    if (isPickup) {
      return {
        ...basePayload,

        pickup: {
          warehouseId: checkout.pickup?.selectedWarehouseId || null,
        },
      };
    }

    if (isLocalDelivery) {
      return {
        ...basePayload,

        delivery: {
          warehouseId: checkout.delivery?.fulfillingWarehouseId || null,

          address: {
            street: checkout.delivery?.address?.street || "",

            unit: checkout.delivery?.address?.unit || "",

            city: checkout.delivery?.address?.city || "",

            state: checkout.delivery?.address?.state || "",

            postalCode: checkout.delivery?.address?.postalCode || "",

            country: checkout.delivery?.address?.country || "US",

            formattedAddress:
              checkout.delivery?.resolvedAddress ||
              checkout.delivery?.address?.formattedAddress ||
              null,
          },
        },
      };
    }

    return basePayload;
  };
  /**
   * PAYMENT → REVIEW
   *
   * The button can only be clicked after
   * Stripe reports that the Payment Element
   * is complete.
   *
   * We still call elements.submit() inside
   * StripePaymentForm as a final validation.
   *
   * This DOES NOT charge the card.
   * This DOES NOT create a PaymentIntent.
   */
  const handleContinue = async () => {
    if (isPaymentPreparing) {
      return;
    }

    /**
     * Normally impossible because the
     * button is disabled until Stripe
     * reports ready + complete.
     *
     * Still keep this defensive guard.
     */
    if (!isPaymentElementReady || !isPaymentComplete) {
      return;
    }

    if (!stripePaymentFormRef.current) {
      showPaymentError({
        code: "stripe_form_unavailable",

        message: "The secure payment form is unavailable. Please try again.",
      });

      return;
    }

    setIsPaymentPreparing(true);

    closeSnackbar();

    try {
      /**
       * StripePaymentForm does:
       *
       * elements.submit()
       *        ↓
       * createConfirmationToken()
       *
       * Still no charge.
       */
      const result = await stripePaymentFormRef.current.prepareForReview();

      if (!result?.ok) {
        showPaymentError(result?.error);

        return;
      }

      const confirmationToken = result.confirmationToken;

      if (!confirmationToken?.id) {
        showPaymentError({
          code: "confirmation_token_missing",

          message:
            "We couldn't prepare your payment information. Please try again.",
        });

        return;
      }

      /**
       * Store only Stripe checkout
       * identifiers.
       *
       * Raw card information never enters
       * our application state.
       */
      const confirmationTokenId = confirmationToken.id;

      const paymentMethodType =
        confirmationToken?.payment_method_preview?.type || "card";

      setPaymentPreparation({
        confirmationTokenId,
        paymentMethodType,
      });

      const prepareReviewPayload =
        buildPrepareReviewPayload(confirmationTokenId);

      const reviewResponse = await prepareReviewRequest(prepareReviewPayload);

      if (reviewResponse?.status !== "ready_for_review") {
        showPaymentError({
          code: "review_preparation_failed",
          message:
            "We couldn't prepare your final order total. Please try again.",
        });

        return;
      }

      setReviewPreparation(reviewResponse);

      navigateWithTransition("/checkout/review", "forward");
    } catch (error) {
      console.error("Unable to prepare Stripe payment:", error);

      showPaymentError(error);
    } finally {
      setIsPaymentPreparing(false);
    }
  };

  return (
    <PaymentTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <BackHeader
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

                <Elements
                  stripe={stripePromise}
                  options={stripeElementsOptions}
                >
                  <StripePaymentForm
                    ref={stripePaymentFormRef}
                    billingDetails={{
                      firstName: checkout.customer?.firstName,

                      lastName: checkout.customer?.lastName,

                      email: checkout.customer?.email,

                      phone: checkout.customer?.phone,
                    }}
                    onReadyChange={setIsPaymentElementReady}
                    onCompleteChange={setIsPaymentComplete}
                  />
                </Elements>
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

                <ContinueButton
                  type="button"
                  disabled={
                    !isPaymentElementReady ||
                    !isPaymentComplete ||
                    isPaymentPreparing
                  }
                  onClick={handleContinue}
                >
                  {isPaymentPreparing
                    ? "Checking payment..."
                    : "Continue to Review"}

                  {!isPaymentPreparing && <FiChevronRight />}
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

      <Snackbar
        isOpen={snackbar.isOpen}
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        onClose={closeSnackbar}
      />
    </PaymentTransition>
  );
};
