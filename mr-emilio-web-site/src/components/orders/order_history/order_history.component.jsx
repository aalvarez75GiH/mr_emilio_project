import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  //   FiHome,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
// import storeIcon from "../../../assets/checkout/icons/storeIcon.svg";
import { StoreIcon } from "../../icons/store_icon/store_icon.component";
import { getDisplayProduct } from "../../home/shop_products_carousel/shop_products_carousel.helpers";
import {
  buildOrderTimeline,
  ORDER_TIMELINE_STATES,
} from "../../../infrastructure/services/orders/orders.helpers";

import { ScreenTransition } from "../../common/screen_transition/screen_transition.styles";
const TRANSITION_DURATION_MS = 260;
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
  OrderHeaderPrimaryRow,
  OrderNumber,
  OrderNumberLabel,
  // OrderDate,
  OrderStatus,
  OrderCardHeaderRight,
  OrderHeaderTotal,
  OrderHeaderPayment,
  OrderCollapseButton,
  OrderTimeline,
  OrderTimelineTrack,
  OrderTimelineStep,
  OrderTimelineNode,
  OrderTimelineLabel,
  OrderTimelineDate,
  DesktopOrderDetails,
  DesktopMetaGrid,
  DesktopMetaItem,
  DesktopMetaLabel,
  DesktopMetaValue,
  DesktopBottomGrid,
  DesktopOrderItems,
  DesktopOrderItem,
  DesktopOrderItemVisual,
  ProductThumbnail,
  ProductThumbnailFallback,
  DesktopOrderItemContent,
  DesktopOrderItemName,
  DesktopOrderItemMeta,
  DesktopOrderItemPrice,
  DesktopOrderSummary,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryTotalRow,
  SummaryTotalLabel,
  SummaryTotalValue,
  CompactOrderDetails,
  CompactFulfillmentRow,
  CompactFulfillmentIcon,
  CompactFulfillmentContent,
  CompactFulfillmentMethod,
  CompactFulfillmentText,
  CompactFulfillmentArrow,
  CompactFooter,
  CompactItemsSummary,
  CompactItemCount,
  CompactThumbnails,
  // CompactThumbnail,
  CompactThumbnailFrame,
  CompactThumbnailImage,
  CompactThumbnailFallback,
  CompactTotalGroup,
  CompactTotalLabel,
  CompactTotalValue,
  Pagination,
  PaginationSummary,
  PaginationControls,
  PaginationButton,
  PaginationPageButton,
  EmptyOrdersState,
  DesktopMetaIcon,
  DesktopMetaContent,
} from "./order_history.styles";
import { BackHeader } from "../../common/back_header/back_header.component";

import { useOrders } from "../../../infrastructure/services/orders/use-orders.hook";
import { useCustomerCatalog } from "../../../infrastructure/services/catalog/use-customer_catalog.hook";

const ORDERS_PER_PAGE = 2;

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

const formatTimelineDate = (date) => {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(parsedDate),

    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(parsedDate),
  };
};

const formatFulfillmentMethod = (method) => {
  if (method === "local_delivery") {
    return "Local delivery";
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

const formatOrderStatus = (status) => {
  if (!status) {
    return "";
  }

  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const getTimelineIcon = (status) => {
  if (status === "order_placed") {
    return <FiPackage />;
  }

  if (status === "out_for_delivery") {
    return <FiTruck />;
  }

  return <FiCheck />;
};

const getFulfillmentIcon = (method) => {
  if (method === "local_delivery") {
    return <FiTruck />;
  }

  return <FiShoppingBag />;
};

const getUpcomingTimelineText = (status) => {
  if (status === "picked_up") {
    return "Pending";
  }

  if (status === "out_for_delivery") {
    return "Pending";
  }

  if (status === "delivered") {
    return "Pending";
  }

  return "Pending";
};

const getItemImageSrc = (item, customerCatalogProducts) => {
  if (!item?.productId) {
    return null;
  }

  if (!Array.isArray(customerCatalogProducts)) {
    return null;
  }

  const catalogProduct = customerCatalogProducts.find(
    (product) => product?.id === item.productId
  );

  if (!catalogProduct) {
    return null;
  }

  const displayProduct = getDisplayProduct(catalogProduct);

  if (
    typeof displayProduct?.image === "string" &&
    displayProduct.image.trim()
  ) {
    return displayProduct.image.trim();
  }

  return null;
};
const getItemDisplayProduct = (item, customerCatalogProducts) => {
  if (!item?.productId || !Array.isArray(customerCatalogProducts)) {
    return null;
  }

  const catalogProduct = customerCatalogProducts.find(
    (product) => product?.id === item.productId
  );

  if (!catalogProduct) {
    return null;
  }

  return getDisplayProduct(catalogProduct);
};

const getItemAlt = (item) => {
  return (
    item?.image?.alt?.en ||
    item?.image?.alt?.es ||
    item?.productName ||
    "Mr. Emilio product"
  );
};

const OrderTimelineView = ({ timeline }) => {
  return (
    <OrderTimeline $stepCount={timeline.length}>
      <OrderTimelineTrack />

      {timeline.map((step) => {
        const timelineDate = formatTimelineDate(step.createdAt);

        const isCompleted = step.state === ORDER_TIMELINE_STATES.COMPLETED;

        return (
          <OrderTimelineStep key={step.status}>
            <OrderTimelineNode $completed={isCompleted} $status={step.status}>
              {isCompleted ? getTimelineIcon(step.status) : null}
            </OrderTimelineNode>

            <OrderTimelineLabel>{step.label}</OrderTimelineLabel>

            <OrderTimelineDate>
              {timelineDate ? (
                <>
                  <span>{timelineDate.date}</span>
                  <span>{timelineDate.time}</span>
                </>
              ) : (
                <span>{getUpcomingTimelineText(step.status)}</span>
              )}
            </OrderTimelineDate>
          </OrderTimelineStep>
        );
      })}
    </OrderTimeline>
  );
};

export const OrderHistory = () => {
  const navigate = useNavigate();

  const { customerOrders } = useOrders();
  const { customerCatalogProducts } = useCustomerCatalog();

  const [currentPage, setCurrentPage] = useState(1);

  const [expandedOrders, setExpandedOrders] = useState({});

  const [transitionState, setTransitionState] = useState({
    isExiting: false,
    direction: "forward",
  });

  const handleBack = () => {
    setTransitionState({
      isExiting: true,
      direction: "back",
    });

    window.setTimeout(() => {
      navigate(-1);
    }, TRANSITION_DURATION_MS);
  };

  const totalPages = Math.max(
    1,
    Math.ceil((customerOrders?.length || 0) / ORDERS_PER_PAGE)
  );

  const pageOrders = useMemo(() => {
    if (!Array.isArray(customerOrders)) {
      return [];
    }

    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;

    return customerOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  }, [customerOrders, currentPage]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((current) => ({
      ...current,

      [orderId]: current[orderId] === undefined ? false : !current[orderId],
    }));
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  if (!Array.isArray(customerOrders) || customerOrders.length === 0) {
    return (
      <OrderHistorySection>
        <OrderHistoryContainer>
          <EmptyOrdersState>You do not have any orders yet.</EmptyOrdersState>
        </OrderHistoryContainer>
      </OrderHistorySection>
    );
  }

  const firstVisibleOrder = (currentPage - 1) * ORDERS_PER_PAGE + 1;

  const lastVisibleOrder = Math.min(
    currentPage * ORDERS_PER_PAGE,
    customerOrders.length
  );

  return (
    <ScreenTransition
      $isExiting={transitionState.isExiting}
      $direction={transitionState.direction}
    >
      <BackHeader
        label="Back"
        ariaLabel="Go back from My Orders"
        onBack={handleBack}
      />
      <OrderHistorySection>
        <OrderHistoryContainer>
          <OrderHistoryHeader>
            <OrderHistoryTitle>My Orders</OrderHistoryTitle>

            <OrderHistorySubtitle>
              Track your orders, from placement to pickup or delivery.
            </OrderHistorySubtitle>
          </OrderHistoryHeader>

          <OrdersList>
            {pageOrders.map((order) => {
              const timeline = buildOrderTimeline(order);
              const isExpanded = expandedOrders[order.id] !== false;
              const isPickup = order.fulfillment?.method === "pickup";
              const itemCount = Array.isArray(order.items)
                ? order.items.length
                : 0;
              const isSingleItemOrder = itemCount === 1;

              return (
                <OrderCard key={order.id}>
                  <OrderCardHeader>
                    <OrderCardHeaderGroup>
                      <OrderNumberLabel>Order #</OrderNumberLabel>

                      <OrderHeaderPrimaryRow>
                        <OrderNumber>{order.orderNumber}</OrderNumber>

                        <OrderStatus $status={order.status}>
                          {formatOrderStatus(order.status)}
                        </OrderStatus>
                      </OrderHeaderPrimaryRow>
                    </OrderCardHeaderGroup>

                    <OrderCardHeaderRight>
                      <OrderHeaderTotal>
                        {formatCurrencyFromCents(order.pricing?.totalInCents)}
                      </OrderHeaderTotal>

                      <OrderHeaderPayment>
                        {order.payment?.card?.last4
                          ? `${formatCardBrand(
                              order.payment.card.brand
                            )} ending in ${order.payment.card.last4}`
                          : "Card payment"}
                      </OrderHeaderPayment>
                    </OrderCardHeaderRight>

                    <OrderCollapseButton
                      type="button"
                      aria-label={
                        isExpanded
                          ? `Collapse ${order.orderNumber}`
                          : `Expand ${order.orderNumber}`
                      }
                      aria-expanded={isExpanded}
                      $expanded={isExpanded}
                      onClick={() => toggleOrder(order.id)}
                    >
                      <FiChevronDown />
                    </OrderCollapseButton>
                  </OrderCardHeader>

                  {isExpanded && (
                    <>
                      <OrderTimelineView timeline={timeline} />

                      <DesktopOrderDetails>
                        <DesktopMetaGrid>
                          <DesktopMetaItem>
                            <DesktopMetaIcon>
                              {getFulfillmentIcon(order.fulfillment?.method)}
                            </DesktopMetaIcon>

                            <DesktopMetaContent>
                              <DesktopMetaLabel>Fulfillment</DesktopMetaLabel>

                              <DesktopMetaValue>
                                {formatFulfillmentMethod(
                                  order.fulfillment?.method
                                )}
                              </DesktopMetaValue>
                            </DesktopMetaContent>
                          </DesktopMetaItem>

                          <DesktopMetaItem>
                            <DesktopMetaIcon>
                              <StoreIcon />
                            </DesktopMetaIcon>
                            <DesktopMetaContent>
                              <DesktopMetaLabel>Store</DesktopMetaLabel>

                              <DesktopMetaValue>
                                {order.fulfillment?.warehouseName || "—"}
                              </DesktopMetaValue>
                            </DesktopMetaContent>
                          </DesktopMetaItem>

                          <DesktopMetaItem>
                            <DesktopMetaIcon>
                              <FiMapPin />
                            </DesktopMetaIcon>

                            <DesktopMetaContent>
                              <DesktopMetaLabel>
                                {isPickup
                                  ? "Pickup location"
                                  : "Delivery address"}
                              </DesktopMetaLabel>

                              <DesktopMetaValue>
                                {order.fulfillment?.address || "—"}
                              </DesktopMetaValue>
                            </DesktopMetaContent>
                          </DesktopMetaItem>
                        </DesktopMetaGrid>

                        <DesktopBottomGrid $singleItem={isSingleItemOrder}>
                          <DesktopOrderItems>
                            {order.items?.map((item) => {
                              const imageSrc = getItemImageSrc(
                                item,
                                customerCatalogProducts
                              );
                              return (
                                <DesktopOrderItem key={item.productId}>
                                  <DesktopOrderItemVisual>
                                    {imageSrc ? (
                                      <ProductThumbnail
                                        src={imageSrc}
                                        alt={getItemAlt(item)}
                                      />
                                    ) : (
                                      <ProductThumbnailFallback>
                                        <FiPackage />
                                      </ProductThumbnailFallback>
                                    )}
                                  </DesktopOrderItemVisual>

                                  <DesktopOrderItemContent>
                                    <DesktopOrderItemName>
                                      {item.productName}
                                    </DesktopOrderItemName>

                                    <DesktopOrderItemMeta>
                                      Qty {item.quantity} ·{" "}
                                      {formatCurrencyFromCents(
                                        item.unitPriceInCents
                                      )}{" "}
                                      each
                                    </DesktopOrderItemMeta>
                                  </DesktopOrderItemContent>

                                  <DesktopOrderItemPrice>
                                    {formatCurrencyFromCents(
                                      item.lineTotalInCents
                                    )}
                                  </DesktopOrderItemPrice>
                                </DesktopOrderItem>
                              );
                            })}
                          </DesktopOrderItems>

                          <DesktopOrderSummary $singleItem={isSingleItemOrder}>
                            <SummaryRow>
                              <SummaryLabel>Subtotal</SummaryLabel>

                              <SummaryValue>
                                {formatCurrencyFromCents(
                                  order.pricing?.subtotalInCents
                                )}
                              </SummaryValue>
                            </SummaryRow>

                            <SummaryRow>
                              <SummaryLabel>
                                {isPickup ? "Pickup" : "Delivery fee"}
                              </SummaryLabel>

                              <SummaryValue>
                                {isPickup
                                  ? "Free"
                                  : formatCurrencyFromCents(
                                      order.pricing?.deliveryFeeInCents
                                    )}
                              </SummaryValue>
                            </SummaryRow>

                            <SummaryRow>
                              <SummaryLabel>Sales tax</SummaryLabel>

                              <SummaryValue>
                                {formatCurrencyFromCents(
                                  order.pricing?.taxInCents
                                )}
                              </SummaryValue>
                            </SummaryRow>

                            <SummaryTotalRow $singleItem={isSingleItemOrder}>
                              <SummaryTotalLabel>Total</SummaryTotalLabel>

                              <SummaryTotalValue>
                                {formatCurrencyFromCents(
                                  order.pricing?.totalInCents
                                )}
                              </SummaryTotalValue>
                            </SummaryTotalRow>
                          </DesktopOrderSummary>
                        </DesktopBottomGrid>
                      </DesktopOrderDetails>

                      <CompactOrderDetails>
                        <CompactFulfillmentRow>
                          <CompactFulfillmentIcon>
                            {getFulfillmentIcon(order.fulfillment?.method)}
                          </CompactFulfillmentIcon>

                          <CompactFulfillmentContent>
                            <CompactFulfillmentMethod>
                              {formatFulfillmentMethod(
                                order.fulfillment?.method
                              )}
                            </CompactFulfillmentMethod>

                            <CompactFulfillmentText>
                              {order.fulfillment?.warehouseName || "—"}
                            </CompactFulfillmentText>

                            <CompactFulfillmentText>
                              {order.fulfillment?.address || "—"}
                            </CompactFulfillmentText>
                          </CompactFulfillmentContent>

                          <CompactFulfillmentArrow>
                            <FiChevronRight />
                          </CompactFulfillmentArrow>
                        </CompactFulfillmentRow>

                        <CompactFooter>
                          <CompactItemsSummary>
                            <CompactItemCount>
                              {order.items?.length || 0}{" "}
                              {(order.items?.length || 0) === 1
                                ? "item"
                                : "items"}
                            </CompactItemCount>

                            <CompactThumbnails>
                              {order.items?.slice(0, 4).map((item) => {
                                const displayProduct = getItemDisplayProduct(
                                  item,
                                  customerCatalogProducts
                                );

                                if (!displayProduct?.image) {
                                  return (
                                    <CompactThumbnailFallback
                                      key={item.productId}
                                    >
                                      <FiPackage />
                                    </CompactThumbnailFallback>
                                  );
                                }

                                return (
                                  <CompactThumbnailFrame key={item.productId}>
                                    <CompactThumbnailImage
                                      src={displayProduct.image}
                                      alt={
                                        displayProduct.alt || getItemAlt(item)
                                      }
                                      $imageScale={displayProduct.imageScale}
                                    />
                                  </CompactThumbnailFrame>
                                );
                              })}
                            </CompactThumbnails>
                          </CompactItemsSummary>

                          <CompactTotalGroup>
                            <CompactTotalLabel>Total</CompactTotalLabel>

                            <CompactTotalValue>
                              {formatCurrencyFromCents(
                                order.pricing?.totalInCents
                              )}
                            </CompactTotalValue>
                          </CompactTotalGroup>
                        </CompactFooter>
                      </CompactOrderDetails>
                    </>
                  )}
                </OrderCard>
              );
            })}
          </OrdersList>

          {customerOrders.length > ORDERS_PER_PAGE && (
            <Pagination>
              <PaginationSummary>
                Showing {firstVisibleOrder}–{lastVisibleOrder} of{" "}
                {customerOrders.length} orders
              </PaginationSummary>

              <PaginationControls>
                <PaginationButton
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  aria-label="Previous orders"
                >
                  <FiChevronLeft />
                </PaginationButton>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1
                ).map((page) => (
                  <PaginationPageButton
                    key={page}
                    type="button"
                    $active={page === currentPage}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </PaginationPageButton>
                ))}

                <PaginationButton
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  aria-label="Next orders"
                >
                  <FiChevronRight />
                </PaginationButton>
              </PaginationControls>
            </Pagination>
          )}
        </OrderHistoryContainer>
      </OrderHistorySection>
    </ScreenTransition>
  );
};
