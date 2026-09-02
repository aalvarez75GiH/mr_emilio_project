import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  FiCheck,
  FiPackage,
  FiShoppingBag,
  FiTruck,
  FiX,
} from "react-icons/fi";

import { QRCodeSVG } from "qrcode.react";

import { getDisplayProduct } from "../../home/shop_products_carousel/shop_products_carousel.helpers";

import {
  buildOrderTimeline,
  ORDER_TIMELINE_STATES,
} from "../../../infrastructure/services/orders/orders.helpers";

import {
  OrderCardRoot,
  OrderCardHeader,
  OrderIdentityIcon,
  OrderIdentityContent,
  OrderIdentityPrimaryRow,
  OrderNumber,
  OrderStatus,
  OrderDate,
  OrderTimeline,
  OrderTimelineTrack,
  OrderTimelineStep,
  OrderTimelineNode,
  OrderTimelineLabel,
  OrderTimelineDate,
  OrderSectionDivider,
  FulfillmentRow,
  FulfillmentIcon,
  FulfillmentContent,
  FulfillmentMethod,
  FulfillmentText,
  ProductSummaryRow,
  // ProductPreviewGroup,
  ProductVisual,
  ProductImage,
  ProductFallback,
  ProductPreviewMore,
  ProductPreviewDesktop,
  ProductPreviewMobile,
  ProductCount,
  ProductTotal,
  VerificationButton,
  VerificationThumbnail,
  VerificationContent,
  VerificationEyebrow,
  VerificationTitle,
  VerificationAction,
  QrModalBackdrop,
  QrModal,
  QrModalCloseButton,
  QrModalEyebrow,
  QrModalTitle,
  QrModalDescription,
  QrModalCodeFrame,
  QrModalOrderNumber,
  QrModalOrderLabel,
  QrModalOrderValue,
} from "./order_card.styles";

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

const formatOrderDate = (date) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const day = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parsedDate);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);

  return `${day} at ${time}`;
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

const formatFulfillmentMethod = (method) => {
  if (method === "local_delivery") {
    return "Local delivery";
  }

  if (method === "pickup") {
    return "Pickup";
  }

  return method || "Fulfillment";
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

const getQrContent = (fulfillmentMethod) => {
  if (fulfillmentMethod === "pickup") {
    return {
      title: "Your pickup QR code",

      description:
        "Show this QR code to a Mr. Emilio team member when you pick up your order.",
    };
  }

  if (fulfillmentMethod === "local_delivery") {
    return {
      title: "Your delivery QR code",

      description:
        "Show this QR code to the driver if your order is handed directly to you.",
    };
  }

  return {
    title: "Your order QR code",

    description:
      "Show this QR code to a Mr. Emilio team member when requested.",
  };
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
                <span>Pending</span>
              )}
            </OrderTimelineDate>
          </OrderTimelineStep>
        );
      })}
    </OrderTimeline>
  );
};

export const OrderCard = ({ order, customerCatalogProducts = [] }) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const timeline = useMemo(() => {
    return buildOrderTimeline(order);
  }, [order]);

  const confirmedTimelineEntry = useMemo(() => {
    if (!Array.isArray(order?.statusHistory)) {
      return null;
    }

    return (
      order.statusHistory.find((entry) => entry?.status === "confirmed") || null
    );
  }, [order]);

  const displayDate =
    confirmedTimelineEntry?.createdAt || order?.createdAt || null;

  const items = Array.isArray(order?.items) ? order.items : [];

  const itemCount = items.length;

  const MAX_DESKTOP_PRODUCT_PREVIEWS = 4;
  const MAX_MOBILE_PRODUCT_PREVIEWS = 3;

  const desktopPreviewItems = items.slice(0, MAX_DESKTOP_PRODUCT_PREVIEWS);

  const mobilePreviewItems = items.slice(0, MAX_MOBILE_PRODUCT_PREVIEWS);

  const desktopRemainingItemCount = Math.max(
    0,
    items.length - MAX_DESKTOP_PRODUCT_PREVIEWS
  );

  const mobileRemainingItemCount = Math.max(
    0,
    items.length - MAX_MOBILE_PRODUCT_PREVIEWS
  );

  const fulfillmentMethod = order?.fulfillment?.method || null;

  const credential =
    typeof order?.fulfillmentCredential?.credential === "string"
      ? order.fulfillmentCredential.credential.trim()
      : "";

  const qrContent = getQrContent(fulfillmentMethod);

  useEffect(() => {
    if (!isQrModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsQrModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQrModalOpen]);

  const handleOpenQrModal = () => {
    if (!credential) {
      return;
    }

    setIsQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
  };

  const qrModal =
    credential && isQrModalOpen
      ? createPortal(
          <QrModalBackdrop role="presentation" onMouseDown={handleCloseQrModal}>
            <QrModal
              role="dialog"
              aria-modal="true"
              aria-labelledby={`qr-title-${order?.id || "order"}`}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <QrModalCloseButton
                type="button"
                onClick={handleCloseQrModal}
                aria-label="Close QR code"
              >
                <FiX />
              </QrModalCloseButton>

              <QrModalEyebrow>Order verification</QrModalEyebrow>

              <QrModalTitle id={`qr-title-${order?.id || "order"}`}>
                {qrContent.title}
              </QrModalTitle>

              <QrModalDescription>{qrContent.description}</QrModalDescription>

              <QrModalCodeFrame>
                <QRCodeSVG
                  value={credential}
                  size={320}
                  level="M"
                  marginSize={2}
                  bgColor="#ffffff"
                  fgColor="#111827"
                />
              </QrModalCodeFrame>

              {order?.orderNumber && (
                <QrModalOrderNumber>
                  <QrModalOrderLabel>Order</QrModalOrderLabel>

                  <QrModalOrderValue>{order.orderNumber}</QrModalOrderValue>
                </QrModalOrderNumber>
              )}
            </QrModal>
          </QrModalBackdrop>,
          document.body
        )
      : null;

  return (
    <>
      <OrderCardRoot>
        <OrderCardHeader>
          <OrderIdentityIcon aria-hidden="true">
            <FiPackage />
          </OrderIdentityIcon>

          <OrderIdentityContent>
            <OrderIdentityPrimaryRow>
              <OrderNumber>{order?.orderNumber || "Order"}</OrderNumber>

              <OrderStatus $status={order?.status}>
                {formatOrderStatus(order?.status)}
              </OrderStatus>
            </OrderIdentityPrimaryRow>

            {displayDate && (
              <OrderDate>{formatOrderDate(displayDate)}</OrderDate>
            )}
          </OrderIdentityContent>
        </OrderCardHeader>

        <OrderTimelineView timeline={timeline} />

        <OrderSectionDivider />

        <FulfillmentRow>
          <FulfillmentIcon aria-hidden="true">
            {getFulfillmentIcon(fulfillmentMethod)}
          </FulfillmentIcon>

          <FulfillmentContent>
            <FulfillmentMethod>
              {formatFulfillmentMethod(fulfillmentMethod)}
            </FulfillmentMethod>

            {order?.fulfillment?.warehouseName && (
              <FulfillmentText>
                {order.fulfillment.warehouseName}
              </FulfillmentText>
            )}

            {order?.fulfillment?.address && (
              <FulfillmentText>{order.fulfillment.address}</FulfillmentText>
            )}
          </FulfillmentContent>
        </FulfillmentRow>

        <OrderSectionDivider />
        <ProductSummaryRow>
          <ProductCount>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </ProductCount>

          <ProductPreviewDesktop>
            {desktopPreviewItems.map((item) => {
              const displayProduct = getItemDisplayProduct(
                item,
                customerCatalogProducts
              );

              return (
                <ProductVisual key={item.productId}>
                  {displayProduct?.image ? (
                    <ProductImage
                      src={displayProduct.image}
                      alt={displayProduct.alt || getItemAlt(item)}
                      $imageScale={displayProduct.imageScale}
                    />
                  ) : (
                    <ProductFallback aria-hidden="true">
                      <FiPackage />
                    </ProductFallback>
                  )}
                </ProductVisual>
              );
            })}

            {desktopRemainingItemCount > 0 && (
              <ProductPreviewMore>
                +{desktopRemainingItemCount}
              </ProductPreviewMore>
            )}
          </ProductPreviewDesktop>

          <ProductPreviewMobile>
            {mobilePreviewItems.map((item) => {
              const displayProduct = getItemDisplayProduct(
                item,
                customerCatalogProducts
              );

              return (
                <ProductVisual key={item.productId}>
                  {displayProduct?.image ? (
                    <ProductImage
                      src={displayProduct.image}
                      alt={displayProduct.alt || getItemAlt(item)}
                      $imageScale={displayProduct.imageScale}
                    />
                  ) : (
                    <ProductFallback aria-hidden="true">
                      <FiPackage />
                    </ProductFallback>
                  )}
                </ProductVisual>
              );
            })}

            {mobileRemainingItemCount > 0 && (
              <ProductPreviewMore>
                +{mobileRemainingItemCount}
              </ProductPreviewMore>
            )}
          </ProductPreviewMobile>

          <ProductTotal>
            {formatCurrencyFromCents(order?.pricing?.totalInCents)}
          </ProductTotal>
        </ProductSummaryRow>

        {credential && (
          <>
            <OrderSectionDivider />

            <VerificationButton
              type="button"
              onClick={handleOpenQrModal}
              aria-label={`View full-size verification QR code for ${
                order?.orderNumber || "this order"
              }`}
            >
              <VerificationThumbnail aria-hidden="true">
                <QRCodeSVG
                  value={credential}
                  size={88}
                  level="M"
                  marginSize={1}
                  bgColor="#ffffff"
                  fgColor="#111827"
                />
              </VerificationThumbnail>

              <VerificationContent>
                <VerificationEyebrow>Order verification</VerificationEyebrow>

                <VerificationTitle>{qrContent.title}</VerificationTitle>

                <VerificationAction>Tap to view full size</VerificationAction>
              </VerificationContent>
            </VerificationButton>
          </>
        )}
      </OrderCardRoot>

      {qrModal}
    </>
  );
};
