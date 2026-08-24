import { QRCodeSVG } from "qrcode.react";

import {
  OrderQrCodeCard,
  OrderQrCodeHeader,
  OrderQrCodeEyebrow,
  OrderQrCodeTitle,
  OrderQrCodeDescription,
  OrderQrCodeVisual,
  OrderQrCodeFrame,
  OrderQrCodeOrderNumber,
  OrderQrCodeOrderLabel,
  OrderQrCodeOrderValue,
  OrderQrCodeHelpText,
} from "./order_qr_code.styles";

const getQrContent = (fulfillmentMethod) => {
  if (fulfillmentMethod === "pickup") {
    return {
      eyebrow: "Order verification",
      title: "Your pickup QR code",
      description:
        "Show this QR code to a Mr. Emilio team member when you pick up your order.",
      helpText:
        "This QR code verifies that the order belongs to you. Keep it available until your order is picked up.",
    };
  }

  if (fulfillmentMethod === "local_delivery") {
    return {
      eyebrow: "Order verification",
      title: "Your delivery QR code",
      description:
        "If your order is handed directly to you, show this QR code to the delivery driver.",
      helpText:
        "You do not need to be home for delivery. If the order is left at your door, the driver will complete delivery using photo confirmation instead.",
    };
  }

  return {
    eyebrow: "Order verification",
    title: "Your order QR code",
    description:
      "Show this QR code to a Mr. Emilio team member when requested.",
    helpText: "This QR code is securely connected to your order.",
  };
};

export const OrderQrCode = ({ credential, orderNumber, fulfillmentMethod }) => {
  if (typeof credential !== "string" || !credential.trim()) {
    return null;
  }

  const content = getQrContent(fulfillmentMethod);

  return (
    <OrderQrCodeCard>
      <OrderQrCodeHeader>
        <OrderQrCodeEyebrow>{content.eyebrow}</OrderQrCodeEyebrow>

        <OrderQrCodeTitle>{content.title}</OrderQrCodeTitle>

        <OrderQrCodeDescription>{content.description}</OrderQrCodeDescription>
      </OrderQrCodeHeader>

      <OrderQrCodeVisual>
        <OrderQrCodeFrame
          role="img"
          aria-label={
            orderNumber
              ? `Verification QR code for order ${orderNumber}`
              : "Order verification QR code"
          }
        >
          <QRCodeSVG
            value={credential.trim()}
            size={220}
            level="M"
            marginSize={2}
            bgColor="#ffffff"
            fgColor="#111827"
          />
        </OrderQrCodeFrame>
      </OrderQrCodeVisual>

      {orderNumber && (
        <OrderQrCodeOrderNumber>
          <OrderQrCodeOrderLabel>Order</OrderQrCodeOrderLabel>

          <OrderQrCodeOrderValue>{orderNumber}</OrderQrCodeOrderValue>
        </OrderQrCodeOrderNumber>
      )}

      <OrderQrCodeHelpText>{content.helpText}</OrderQrCodeHelpText>
    </OrderQrCodeCard>
  );
};
