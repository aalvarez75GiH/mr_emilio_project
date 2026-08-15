import {
  FiAlertTriangle,
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiUser,
} from "react-icons/fi";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MainHeader } from "../../components/main_header/main_header.component";

import { CheckoutBackHeader } from "../../components/layout/checkout_back_header/checkout_back_header.component";

import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";

import { useCart } from "../../infrastructure/services/cart/use-cart.hook";

import { FULFILLMENT_METHODS } from "../../infrastructure/services/checkout/checkout.helpers";

import storeIcon from "../../assets/checkout/icons/storeIcon.svg";

import {
  ReviewTransition,
  ReviewPage,
  ReviewContainer,
  CheckoutProgress,
  CheckoutProgressItem,
  CheckoutProgressDot,
  CheckoutProgressLabel,
  CheckoutProgressLine,
  ReviewHeader,
  ReviewTitle,
  ReviewSubtitle,
  ReviewLayout,
  ReviewMainColumn,
  ReviewSideColumn,
  ReviewSection,
  ReviewSectionTitle,
  SummaryCard,
  SummaryCardIcon,
  SummaryCardContent,
  SummaryEyebrow,
  SummaryTitle,
  SummaryText,
  SummaryMeta,
  SummaryAction,
  PickupDistanceWarning,
  PickupDistanceWarningIcon,
  PickupDistanceWarningContent,
  PickupDistanceWarningTitle,
  PickupDistanceWarningText,
  ReviewItems,
  ReviewItem,
  ReviewItemImageContainer,
  ReviewItemImage,
  ReviewItemContent,
  ReviewItemName,
  ReviewItemDescription,
  ReviewItemMeta,
  ReviewItemPrice,
  OrderSummary,
  OrderSummaryTitle,
  OrderSummaryRow,
  OrderSummaryLabel,
  OrderSummaryValue,
  OrderSummaryDivider,
  OrderSummaryTotalRow,
  OrderSummaryTotalLabel,
  OrderSummaryTotalValue,
  PlaceOrderButton,
  PlaceOrderError,
  SecureMessage,
  ReviewUnavailableState,
} from "./review.styles";

import { placeOrderRequest } from "../../infrastructure/services/checkout/checkout.requests";

const TRANSITION_DURATION_MS = 260;

const formatCurrencyFromCents = (amountInCents) => {
  const normalizedAmount = Number(amountInCents);

  if (!Number.isFinite(normalizedAmount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(normalizedAmount / 100);
};

export const Review = () => {
  const navigate = useNavigate();

  const { checkout, setCompletedOrder } = useCheckout();

  const { clearCart } = useCart();

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [placeOrderError, setPlaceOrderError] = useState(null);

  const review = checkout.review;

  const isPickup = checkout.fulfillmentMethod === FULFILLMENT_METHODS.PICKUP;

  const isLocalDelivery =
    checkout.fulfillmentMethod === FULFILLMENT_METHODS.LOCAL_DELIVERY;

  const reviewIsReady =
    review?.status === "ready_for_review" &&
    Array.isArray(review?.items) &&
    review.items.length > 0 &&
    review?.fulfillment &&
    review?.pricing &&
    review?.tax?.calculated === true;

  const customerName = [
    checkout.customer?.firstName,
    checkout.customer?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const pickupCustomerContext = checkout.pickup?.customerContext || null;

  const pickupDistanceMiles = Number(pickupCustomerContext?.distance?.miles);

  const pickupDistanceWarning =
    pickupCustomerContext?.fulfillment?.pickupDistanceWarning;

  const shouldShowPickupDistanceWarning =
    pickupDistanceWarning?.shouldDisplay === true;

  const paymentMethodLabel = useMemo(() => {
    const paymentMethodType = checkout.payment?.paymentMethodType || "card";

    if (paymentMethodType === "card") {
      return "Credit or Debit Card";
    }

    return paymentMethodType;
  }, [checkout.payment?.paymentMethodType]);

  const buildPlaceOrderPayload = () => {
    const cartItems = review.items.map((item) => ({
      productId: item.productId,
      quantity: Number(item.quantity),
    }));

    const basePayload = {
      customer: {
        firstName: checkout.customer?.firstName || "",
        lastName: checkout.customer?.lastName || "",
        email: checkout.customer?.email || "",
        phone: checkout.customer?.phone || "",
      },

      fulfillmentMethod: checkout.fulfillmentMethod,

      cartItems,

      confirmationTokenId: checkout.payment?.confirmationTokenId || null,

      paymentMethodType: checkout.payment?.paymentMethodType || "card",
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

            formattedAddress: checkout.delivery?.resolvedAddress || null,
          },
        },
      };
    }

    return basePayload;
  };

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
    navigateWithTransition("/checkout/payment", "back");
  };

  const handleEditCustomer = () => {
    navigateWithTransition("/checkout/information", "back");
  };

  const handleEditFulfillment = () => {
    if (isPickup) {
      navigateWithTransition("/checkout/delivery/pickup", "back");

      return;
    }

    navigateWithTransition("/checkout/information", "back");
  };

  const handleEditPayment = () => {
    navigateWithTransition("/checkout/payment", "back");
  };

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) {
      return;
    }

    if (!reviewIsReady) {
      return;
    }

    if (!checkout.payment?.confirmationTokenId) {
      setPlaceOrderError(
        "Your payment information is no longer available. Please return to Payment and try again."
      );

      return;
    }

    setIsPlacingOrder(true);
    setPlaceOrderError(null);

    try {
      const payload = buildPlaceOrderPayload();

      const response = await placeOrderRequest(payload);

      if (response?.status !== "order_confirmed" || !response?.order) {
        if (response?.status === "payment_requires_action") {
          setPlaceOrderError(
            "Your bank requires an additional payment verification step. Please return to Payment and try again."
          );

          return;
        }

        throw new Error("The order could not be confirmed.");
      }

      setCompletedOrder(response.order);

      /**
       * The order now exists in ordersCatalog,
       * Stripe payment succeeded, and inventory was committed.
       *
       * The purchased cart is no longer active.
       */
      clearCart();
      navigateWithTransition("/checkout/confirmation", "forward");
    } catch (error) {
      console.error("Unable to place order:", error);

      const backendMessage =
        error?.response?.data?.error || error?.response?.data?.message;

      const backendReason = error?.response?.data?.details?.reason;

      if (backendReason === "PAYMENT_SUCCEEDED_INVENTORY_COMMIT_FAILED") {
        setPlaceOrderError(
          "Your payment was received, but we had a problem finalizing the order. Please do not submit another payment. Your order requires assistance."
        );

        return;
      }

      if (backendReason === "PAYMENT_FAILED") {
        setPlaceOrderError(
          backendMessage ||
            "Your payment could not be completed. Please review your payment information and try again."
        );

        return;
      }

      setPlaceOrderError(
        backendMessage ||
          error?.message ||
          "We couldn't place your order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!reviewIsReady) {
    return (
      <ReviewTransition
        $isExiting={transitionState.isExiting}
        $direction={transitionState.direction}
      >
        <MainHeader />

        <CheckoutBackHeader
          label="Payment"
          ariaLabel="Return to payment"
          onBack={handleBack}
        />

        <ReviewPage>
          <ReviewContainer>
            <ReviewUnavailableState>
              We could not load the final order review. Please return to payment
              and try again.
            </ReviewUnavailableState>
          </ReviewContainer>
        </ReviewPage>
      </ReviewTransition>
    );
  }

  return (
    <ReviewTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <MainHeader />

      <CheckoutBackHeader
        label="Payment"
        ariaLabel="Return to payment"
        onBack={handleBack}
      />

      <ReviewPage>
        <ReviewContainer>
          <CheckoutProgress>
            <CheckoutProgressItem $complete>
              <CheckoutProgressDot $complete>✓</CheckoutProgressDot>

              <CheckoutProgressLabel $complete>Delivery</CheckoutProgressLabel>
            </CheckoutProgressItem>

            <CheckoutProgressLine $complete />

            <CheckoutProgressItem $complete>
              <CheckoutProgressDot $complete>✓</CheckoutProgressDot>

              <CheckoutProgressLabel $complete>Payment</CheckoutProgressLabel>
            </CheckoutProgressItem>

            <CheckoutProgressLine $complete />

            <CheckoutProgressItem $active>
              <CheckoutProgressDot $active>3</CheckoutProgressDot>

              <CheckoutProgressLabel $active>Review</CheckoutProgressLabel>
            </CheckoutProgressItem>
          </CheckoutProgress>

          <ReviewHeader>
            <ReviewTitle>Review & Place Order</ReviewTitle>

            <ReviewSubtitle>
              Confirm your order details before placing your order.
            </ReviewSubtitle>
          </ReviewHeader>

          <ReviewLayout>
            <ReviewMainColumn>
              <ReviewSection>
                <ReviewSectionTitle>Customer Information</ReviewSectionTitle>

                <SummaryCard>
                  <SummaryCardIcon aria-hidden="true">
                    <FiUser />
                  </SummaryCardIcon>

                  <SummaryCardContent>
                    <SummaryEyebrow>Customer</SummaryEyebrow>

                    <SummaryTitle>{customerName || "Customer"}</SummaryTitle>

                    <SummaryText>{checkout.customer?.email}</SummaryText>

                    <SummaryText>{checkout.customer?.phone}</SummaryText>

                    <SummaryAction type="button" onClick={handleEditCustomer}>
                      Edit information
                    </SummaryAction>
                  </SummaryCardContent>
                </SummaryCard>
              </ReviewSection>

              <ReviewSection>
                <ReviewSectionTitle>Fulfillment</ReviewSectionTitle>

                {isPickup && (
                  <SummaryCard>
                    <SummaryCardIcon aria-hidden="true">
                      <img src={storeIcon} alt="" />
                    </SummaryCardIcon>

                    <SummaryCardContent>
                      <SummaryEyebrow>Pickup store</SummaryEyebrow>

                      <SummaryTitle>
                        {review.fulfillment?.warehouseName}
                      </SummaryTitle>

                      <SummaryText>{review.fulfillment?.address}</SummaryText>

                      {Number.isFinite(pickupDistanceMiles) && (
                        <SummaryMeta>
                          {pickupDistanceMiles.toFixed(1)} miles away
                        </SummaryMeta>
                      )}

                      {review.fulfillment?.pickupHours && (
                        <SummaryMeta>
                          Pickup hours:{" "}
                          {review.fulfillment.pickupHours.openingTime || "—"} –{" "}
                          {review.fulfillment.pickupHours.closingTime || "—"}
                        </SummaryMeta>
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
                              {pickupDistanceMiles.toFixed(1)} miles away! You
                              can still choose this store, up to you.
                            </PickupDistanceWarningText>
                          </PickupDistanceWarningContent>
                        </PickupDistanceWarning>
                      )}

                      <SummaryAction
                        type="button"
                        onClick={handleEditFulfillment}
                      >
                        Change store
                      </SummaryAction>
                    </SummaryCardContent>
                  </SummaryCard>
                )}

                {isLocalDelivery && (
                  <SummaryCard>
                    <SummaryCardIcon aria-hidden="true">
                      <FiMapPin />
                    </SummaryCardIcon>

                    <SummaryCardContent>
                      <SummaryEyebrow>Local delivery</SummaryEyebrow>

                      <SummaryTitle>Delivery address</SummaryTitle>

                      <SummaryText>{review.fulfillment?.address}</SummaryText>

                      {Number.isFinite(
                        Number(review.fulfillment?.distance?.miles)
                      ) && (
                        <SummaryMeta>
                          {Number(review.fulfillment.distance.miles).toFixed(1)}{" "}
                          miles ·{" "}
                          {formatCurrencyFromCents(
                            review.pricing?.deliveryFeeInCents
                          )}{" "}
                          delivery
                        </SummaryMeta>
                      )}

                      <SummaryText>
                        Fulfilled by {review.fulfillment?.warehouseName}
                      </SummaryText>

                      <SummaryAction
                        type="button"
                        onClick={handleEditFulfillment}
                      >
                        Edit delivery
                      </SummaryAction>
                    </SummaryCardContent>
                  </SummaryCard>
                )}
              </ReviewSection>

              <ReviewSection>
                <ReviewSectionTitle>Payment</ReviewSectionTitle>

                <SummaryCard>
                  <SummaryCardIcon aria-hidden="true">
                    <FiCreditCard />
                  </SummaryCardIcon>

                  <SummaryCardContent>
                    <SummaryEyebrow>Payment method</SummaryEyebrow>

                    <SummaryTitle>{paymentMethodLabel}</SummaryTitle>

                    <SummaryText>
                      Your payment details are securely prepared and will only
                      be submitted when you place the order.
                    </SummaryText>

                    <SummaryAction type="button" onClick={handleEditPayment}>
                      Edit payment
                    </SummaryAction>
                  </SummaryCardContent>
                </SummaryCard>
              </ReviewSection>

              <ReviewSection>
                <ReviewSectionTitle>Your items</ReviewSectionTitle>

                <ReviewItems>
                  {review.items.map((item) => (
                    <ReviewItem key={item.productId}>
                      <ReviewItemImageContainer>
                        <ReviewItemImage
                          src={item.product?.image?.url}
                          alt={
                            item.product?.image?.alt?.en ||
                            item.product?.product_name?.en ||
                            item.productId
                          }
                        />
                      </ReviewItemImageContainer>

                      <ReviewItemContent>
                        <ReviewItemName>
                          {item.product?.product_name?.en || item.productId}
                        </ReviewItemName>

                        {item.product?.description?.en && (
                          <ReviewItemDescription>
                            {item.product.description.en}
                          </ReviewItemDescription>
                        )}

                        <ReviewItemMeta>
                          <span>Qty {item.quantity}</span>

                          <span aria-hidden="true">·</span>

                          <span>
                            {formatCurrencyFromCents(
                              item.pricing?.unitPriceInCents
                            )}{" "}
                            each
                          </span>
                        </ReviewItemMeta>
                      </ReviewItemContent>

                      <ReviewItemPrice>
                        {formatCurrencyFromCents(
                          item.pricing?.lineTotalInCents
                        )}
                      </ReviewItemPrice>
                    </ReviewItem>
                  ))}
                </ReviewItems>
              </ReviewSection>
            </ReviewMainColumn>

            <ReviewSideColumn>
              <OrderSummary>
                <OrderSummaryTitle>Order Summary</OrderSummaryTitle>

                <OrderSummaryRow>
                  <OrderSummaryLabel>Subtotal</OrderSummaryLabel>

                  <OrderSummaryValue>
                    {formatCurrencyFromCents(review.pricing?.subtotalInCents)}
                  </OrderSummaryValue>
                </OrderSummaryRow>

                <OrderSummaryRow>
                  <OrderSummaryLabel>
                    {isPickup ? "Pickup" : "Local delivery"}
                  </OrderSummaryLabel>

                  <OrderSummaryValue>
                    {isPickup
                      ? "Free"
                      : formatCurrencyFromCents(
                          review.pricing?.deliveryFeeInCents
                        )}
                  </OrderSummaryValue>
                </OrderSummaryRow>

                <OrderSummaryRow>
                  <OrderSummaryLabel>Sales tax</OrderSummaryLabel>

                  <OrderSummaryValue>
                    {formatCurrencyFromCents(review.pricing?.taxInCents)}
                  </OrderSummaryValue>
                </OrderSummaryRow>

                <OrderSummaryDivider />

                <OrderSummaryTotalRow>
                  <OrderSummaryTotalLabel>Total</OrderSummaryTotalLabel>

                  <OrderSummaryTotalValue>
                    {formatCurrencyFromCents(review.pricing?.totalInCents)}
                  </OrderSummaryTotalValue>
                </OrderSummaryTotalRow>

                <PlaceOrderButton
                  type="button"
                  disabled={isPlacingOrder}
                  onClick={handlePlaceOrder}
                >
                  {isPlacingOrder
                    ? "Placing order..."
                    : `Place Order · ${formatCurrencyFromCents(
                        review.pricing?.totalInCents
                      )}`}
                </PlaceOrderButton>

                {placeOrderError && (
                  <PlaceOrderError role="alert">
                    {placeOrderError}
                  </PlaceOrderError>
                )}

                <SecureMessage>
                  <FiLock aria-hidden="true" />

                  <span>
                    Your card will not be charged until you place the order.
                  </span>
                </SecureMessage>
              </OrderSummary>
            </ReviewSideColumn>
          </ReviewLayout>
        </ReviewContainer>
      </ReviewPage>
    </ReviewTransition>
  );
};
