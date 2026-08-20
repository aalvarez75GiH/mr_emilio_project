import {
  FiCheck,
  FiClock,
  FiCopy,
  FiCreditCard,
  FiPhone,
  FiShoppingBag,
  FiPackage,
} from "react-icons/fi";
import storeIcon from "../../assets/checkout/icons/storeIcon.svg";

import { useNavigate } from "react-router-dom";
import confirmationBanner from "../../assets/checkout/images/confirmation_screen_logo.png";
import { useCheckout } from "../../infrastructure/services/checkout/use-checkout.hook";
import { FULFILLMENT_METHODS } from "../../infrastructure/services/checkout/checkout.helpers";

import {
  ConfirmationPage,
  ConfirmationContainer,
  ConfirmationCard,
  ConfirmationBanner,
  ConfirmationBannerImage,
  ConfirmationSuccessIcon,
  ConfirmationHeader,
  ConfirmationTitle,
  ConfirmationSubtitle,
  ConfirmationSection,
  ConfirmationSectionIcon,
  ConfirmationSectionContent,
  ConfirmationEyebrow,
  ConfirmationSectionTitle,
  ConfirmationText,
  OrderNumberCard,
  OrderNumberContent,
  OrderNumberLabel,
  OrderNumberValue,
  FulfillmentMeta,
  FulfillmentMetaStrong,
  OrderItems,
  OrderItem,
  OrderItemContent,
  OrderItemName,
  OrderItemMeta,
  OrderItemPrice,
  OrderPricingDivider,
  OrderPricingRow,
  OrderPricingLabel,
  OrderPricingValue,
  OrderTotalRow,
  OrderTotalLabel,
  OrderTotalValue,
  PaymentRow,
  PaymentStatusBadge,
  NextStepsCard,
  ContinueShoppingButton,
  ConfirmationUnavailable,
  CopyOrderButton,
  PaymentDetails,
  PaymentAmountGroup,
  SupportLink,
  BackHomeButton,
  SupportIcon,
} from "./order_confirmation.styles";

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

const formatSize = (size) => {
  if (!size || typeof size !== "object") {
    return "";
  }

  const value = size.value;
  const unit = size.unit;

  if (value === undefined || value === null || !unit) {
    return "";
  }

  if (unit === "piece") {
    return `${value} pcs`;
  }

  return `${value} ${unit}`;
};

export const OrderConfirmation = () => {
  const navigate = useNavigate();

  const { checkout, resetCheckout } = useCheckout();

  const order = checkout.completedOrder;

  console.log("OrderConfirmation: order:", JSON.stringify(order, null, 2));

  const isPickup = order?.fulfillment?.method === FULFILLMENT_METHODS.PICKUP;

  const isLocalDelivery =
    order?.fulfillment?.method === FULFILLMENT_METHODS.LOCAL_DELIVERY;

  const handleBackHome = () => {
    resetCheckout();

    navigate("/");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (!order || order.status !== "confirmed") {
    return (
      <ConfirmationPage>
        <ConfirmationContainer>
          <ConfirmationUnavailable>
            <h1>Order confirmation unavailable</h1>

            <p>We could not load your confirmed order information.</p>

            <ContinueShoppingButton
              type="button"
              onClick={handleContinueShopping}
            >
              Continue shopping
            </ContinueShoppingButton>
          </ConfirmationUnavailable>
        </ConfirmationContainer>
      </ConfirmationPage>
    );
  }

  const pickupHours = order.fulfillment?.pickupHours || null;

  const deliveryEstimate = order.fulfillment?.estimatedTimeMinutes || null;

  return (
    <ConfirmationPage>
      <ConfirmationContainer>
        <ConfirmationCard>
          <ConfirmationBanner>
            <ConfirmationBannerImage
              src={confirmationBanner}
              alt="Mr. Emilio celebrating your confirmed order"
            />
          </ConfirmationBanner>

          <ConfirmationSuccessIcon aria-hidden="true">
            <FiCheck />
          </ConfirmationSuccessIcon>

          <ConfirmationHeader>
            <ConfirmationTitle>Thank you!</ConfirmationTitle>

            <ConfirmationSubtitle>
              Your order has been placed successfully.
            </ConfirmationSubtitle>
          </ConfirmationHeader>

          <OrderNumberCard>
            <OrderNumberContent>
              <OrderNumberLabel>Order Number</OrderNumberLabel>

              <OrderNumberValue>{order.orderNumber}</OrderNumberValue>
            </OrderNumberContent>

            <CopyOrderButton
              type="button"
              aria-label="Copy order number"
              onClick={() => {
                navigator.clipboard?.writeText(order.orderNumber);
              }}
            >
              <FiCopy aria-hidden="true" />
            </CopyOrderButton>
          </OrderNumberCard>

          {isPickup && (
            <ConfirmationSection>
              <ConfirmationSectionIcon aria-hidden="true">
                <img src={storeIcon} alt="" />
              </ConfirmationSectionIcon>

              <ConfirmationSectionContent>
                <ConfirmationEyebrow>Pickup at</ConfirmationEyebrow>

                <ConfirmationSectionTitle>
                  {order.fulfillment?.warehouseName}
                </ConfirmationSectionTitle>

                <ConfirmationText>
                  {order.fulfillment?.address}
                </ConfirmationText>

                {pickupHours && (
                  <FulfillmentMeta>
                    <FiClock aria-hidden="true" />

                    <div>
                      <span>Pickup hours</span>

                      <FulfillmentMetaStrong>
                        {pickupHours.openingTime || "—"}
                        {" – "}
                        {pickupHours.closingTime || "—"}
                      </FulfillmentMetaStrong>
                    </div>
                  </FulfillmentMeta>
                )}
              </ConfirmationSectionContent>
            </ConfirmationSection>
          )}

          {isLocalDelivery && (
            <ConfirmationSection>
              <ConfirmationSectionIcon aria-hidden="true">
                <FiShoppingBag />
              </ConfirmationSectionIcon>

              <ConfirmationSectionContent>
                <ConfirmationEyebrow>Delivering to</ConfirmationEyebrow>

                <ConfirmationSectionTitle>
                  Delivery address
                </ConfirmationSectionTitle>

                <ConfirmationText>
                  {order.fulfillment?.address}
                </ConfirmationText>

                <ConfirmationText>
                  Fulfilled by{" "}
                  <strong>{order.fulfillment?.warehouseName}</strong>
                </ConfirmationText>

                {deliveryEstimate && (
                  <FulfillmentMeta>
                    <FiClock aria-hidden="true" />

                    <div>
                      <span>Estimated delivery</span>

                      <FulfillmentMetaStrong>
                        {deliveryEstimate.minimum ?? "—"}
                        {" – "}
                        {deliveryEstimate.maximum ?? "—"} minutes
                      </FulfillmentMetaStrong>
                    </div>
                  </FulfillmentMeta>
                )}
              </ConfirmationSectionContent>
            </ConfirmationSection>
          )}

          <ConfirmationSection>
            <ConfirmationSectionIcon aria-hidden="true">
              <FiPackage />
            </ConfirmationSectionIcon>

            <ConfirmationSectionContent>
              <ConfirmationEyebrow>Order Summary</ConfirmationEyebrow>

              <OrderItems>
                {order.items.map((item) => {
                  const sizeLabel = formatSize(item.size);

                  return (
                    <OrderItem key={item.productId}>
                      <OrderItemContent>
                        <OrderItemName>{item.productName}</OrderItemName>

                        <OrderItemMeta>
                          Qty {item.quantity}
                          {sizeLabel ? ` · ${sizeLabel}` : ""}
                        </OrderItemMeta>
                      </OrderItemContent>

                      <OrderItemPrice>
                        {formatCurrencyFromCents(item.lineTotalInCents)}
                      </OrderItemPrice>
                    </OrderItem>
                  );
                })}
              </OrderItems>

              <OrderPricingDivider />

              <OrderPricingRow>
                <OrderPricingLabel>Subtotal</OrderPricingLabel>

                <OrderPricingValue>
                  {formatCurrencyFromCents(order.pricing?.subtotalInCents)}
                </OrderPricingValue>
              </OrderPricingRow>

              {isLocalDelivery && (
                <OrderPricingRow>
                  <OrderPricingLabel>Local delivery</OrderPricingLabel>

                  <OrderPricingValue>
                    {formatCurrencyFromCents(order.pricing?.deliveryFeeInCents)}
                  </OrderPricingValue>
                </OrderPricingRow>
              )}

              <OrderPricingRow>
                <OrderPricingLabel>Sales tax</OrderPricingLabel>

                <OrderPricingValue>
                  {formatCurrencyFromCents(order.pricing?.taxInCents)}
                </OrderPricingValue>
              </OrderPricingRow>

              <OrderTotalRow>
                <OrderTotalLabel>Total</OrderTotalLabel>

                <OrderTotalValue>
                  {formatCurrencyFromCents(order.pricing?.totalInCents)}
                </OrderTotalValue>
              </OrderTotalRow>
            </ConfirmationSectionContent>
          </ConfirmationSection>
          <ConfirmationSection>
            <ConfirmationSectionIcon aria-hidden="true">
              <FiCreditCard />
            </ConfirmationSectionIcon>

            <ConfirmationSectionContent>
              <ConfirmationEyebrow>Payment</ConfirmationEyebrow>

              <PaymentRow>
                <PaymentDetails>
                  <ConfirmationText>
                    {order.payment?.card?.last4
                      ? `${order.payment.card.brand || "Card"} ending in ${
                          order.payment.card.last4
                        }`
                      : "Card payment"}
                  </ConfirmationText>
                </PaymentDetails>

                <PaymentAmountGroup>
                  <strong>
                    {formatCurrencyFromCents(order.pricing?.totalInCents)}
                  </strong>

                  <PaymentStatusBadge>Paid</PaymentStatusBadge>
                </PaymentAmountGroup>
              </PaymentRow>
            </ConfirmationSectionContent>
          </ConfirmationSection>

          <NextStepsCard>
            <ConfirmationSectionIcon aria-hidden="true">
              <FiClock />
            </ConfirmationSectionIcon>

            <ConfirmationSectionContent>
              <ConfirmationSectionTitle>What’s next?</ConfirmationSectionTitle>

              {isPickup && (
                <ConfirmationText>
                  Your order is confirmed. Pick it up anytime during the store’s
                  pickup hours.
                </ConfirmationText>
              )}

              {isLocalDelivery && (
                <ConfirmationText>
                  We’ll prepare your order and deliver it to the address above.
                  {deliveryEstimate
                    ? ` Estimated delivery is ${deliveryEstimate.minimum}–${deliveryEstimate.maximum} minutes.`
                    : ""}
                </ConfirmationText>
              )}
            </ConfirmationSectionContent>
          </NextStepsCard>
          <SupportLink href="tel:7066124602">
            <SupportIcon aria-hidden="true">
              <FiPhone />
            </SupportIcon>

            <span>Need help? (706) 612-4602</span>
          </SupportLink>
          <BackHomeButton type="button" onClick={handleBackHome}>
            Back to Home
          </BackHomeButton>
        </ConfirmationCard>
      </ConfirmationContainer>
    </ConfirmationPage>
  );
};
