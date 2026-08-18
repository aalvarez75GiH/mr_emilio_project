import { useOrders } from "../../../infrastructure/services/orders/use-orders.hook";

import {
  OrderHistorySection,
  OrderHistoryContainer,
  OrderHistoryHeader,
  OrderHistoryTitle,
  OrderHistorySubtitle,
  OrdersList,
  OrderCard,
  OrderCardHeader,
  OrderCardHeaderGroup,
  OrderNumber,
  OrderDate,
  OrderStatus,
  OrderMetaGrid,
  OrderMetaItem,
  OrderMetaLabel,
  OrderMetaValue,
  OrderItems,
  OrderItem,
  OrderItemContent,
  OrderItemName,
  OrderItemMeta,
  OrderItemPrice,
  OrderSummary,
  OrderSummaryRow,
  OrderSummaryLabel,
  OrderSummaryValue,
  OrderSummaryTotalRow,
  OrderSummaryTotalLabel,
  OrderSummaryTotalValue,
  PaymentDetails,
  EmptyOrdersState,
} from "./order_history.styles";

const formatCurrencyFromCents = (amountInCents) => {
  const amount = Number(amountInCents);

  if (!Number.isFinite(amount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
};

const formatOrderDate = (date) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const formatFulfillmentMethod = (method) => {
  if (method === "local_delivery") {
    return "Local Delivery";
  }

  if (method === "pickup") {
    return "Pickup";
  }

  return method || "Fulfillment";
};

const formatCardBrand = (brand) => {
  if (!brand || typeof brand !== "string") {
    return "Card";
  }

  return brand.charAt(0).toUpperCase() + brand.slice(1);
};

export const OrderHistory = () => {
  const { customerOrders } = useOrders();

  if (!Array.isArray(customerOrders) || customerOrders.length === 0) {
    return (
      <OrderHistorySection>
        <OrderHistoryContainer>
          <EmptyOrdersState>You do not have any orders yet.</EmptyOrdersState>
        </OrderHistoryContainer>
      </OrderHistorySection>
    );
  }

  return (
    <OrderHistorySection>
      <OrderHistoryContainer>
        <OrderHistoryHeader>
          <OrderHistoryTitle>My Orders</OrderHistoryTitle>

          <OrderHistorySubtitle>
            Review your recent Mr. Emilio orders and fulfillment details.
          </OrderHistorySubtitle>
        </OrderHistoryHeader>

        <OrdersList>
          {customerOrders.map((order) => (
            <OrderCard key={order.id}>
              <OrderCardHeader>
                <OrderCardHeaderGroup>
                  <OrderNumber>{order.orderNumber}</OrderNumber>

                  <OrderDate>{formatOrderDate(order.createdAt)}</OrderDate>
                </OrderCardHeaderGroup>

                <OrderStatus>{order.status}</OrderStatus>
              </OrderCardHeader>

              <OrderMetaGrid>
                <OrderMetaItem>
                  <OrderMetaLabel>Fulfillment</OrderMetaLabel>

                  <OrderMetaValue>
                    {formatFulfillmentMethod(order.fulfillment?.method)}
                  </OrderMetaValue>
                </OrderMetaItem>

                <OrderMetaItem>
                  <OrderMetaLabel>Store</OrderMetaLabel>

                  <OrderMetaValue>
                    {order.fulfillment?.warehouseName || "—"}
                  </OrderMetaValue>
                </OrderMetaItem>

                <OrderMetaItem>
                  <OrderMetaLabel>
                    {order.fulfillment?.method === "pickup"
                      ? "Pickup location"
                      : "Delivery address"}
                  </OrderMetaLabel>

                  <OrderMetaValue>
                    {order.fulfillment?.address || "—"}
                  </OrderMetaValue>
                </OrderMetaItem>
              </OrderMetaGrid>

              <OrderItems>
                {order.items?.map((item) => (
                  <OrderItem key={item.productId}>
                    <OrderItemContent>
                      <OrderItemName>{item.productName}</OrderItemName>

                      <OrderItemMeta>
                        Qty {item.quantity} ·{" "}
                        {formatCurrencyFromCents(item.unitPriceInCents)} each
                      </OrderItemMeta>
                    </OrderItemContent>

                    <OrderItemPrice>
                      {formatCurrencyFromCents(item.lineTotalInCents)}
                    </OrderItemPrice>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderSummary>
                <OrderSummaryRow>
                  <OrderSummaryLabel>Subtotal</OrderSummaryLabel>

                  <OrderSummaryValue>
                    {formatCurrencyFromCents(order.pricing?.subtotalInCents)}
                  </OrderSummaryValue>
                </OrderSummaryRow>

                <OrderSummaryRow>
                  <OrderSummaryLabel>
                    {order.fulfillment?.method === "pickup"
                      ? "Pickup"
                      : "Local delivery"}
                  </OrderSummaryLabel>

                  <OrderSummaryValue>
                    {order.fulfillment?.method === "pickup"
                      ? "Free"
                      : formatCurrencyFromCents(
                          order.pricing?.deliveryFeeInCents
                        )}
                  </OrderSummaryValue>
                </OrderSummaryRow>

                <OrderSummaryRow>
                  <OrderSummaryLabel>Sales tax</OrderSummaryLabel>

                  <OrderSummaryValue>
                    {formatCurrencyFromCents(order.pricing?.taxInCents)}
                  </OrderSummaryValue>
                </OrderSummaryRow>

                <OrderSummaryTotalRow>
                  <OrderSummaryTotalLabel>Total</OrderSummaryTotalLabel>

                  <OrderSummaryTotalValue>
                    {formatCurrencyFromCents(order.pricing?.totalInCents)}
                  </OrderSummaryTotalValue>
                </OrderSummaryTotalRow>
              </OrderSummary>

              <PaymentDetails>
                {order.payment?.card?.last4
                  ? `${formatCardBrand(order.payment.card.brand)} ending in ${
                      order.payment.card.last4
                    }`
                  : "Card payment"}
              </PaymentDetails>
            </OrderCard>
          ))}
        </OrdersList>
      </OrderHistoryContainer>
    </OrderHistorySection>
  );
};
