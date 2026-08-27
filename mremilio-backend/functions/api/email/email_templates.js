/* eslint-disable */

const { EMAIL_BRAND_ASSETS } = require("./email.constants");

const buildCustomerAccessCodeEmail = ({
  firstName,
  verificationCode,
  expiresInMinutes,
}) => {
  const normalizedFirstName =
    typeof firstName === "string" && firstName.trim()
      ? firstName.trim()
      : "there";

  const normalizedCode = String(verificationCode || "").trim();

  const normalizedExpiration = Number(expiresInMinutes);

  if (!normalizedCode) {
    throw new Error(
      "Verification code is required to build customer access email"
    );
  }

  const expirationMinutes =
    Number.isInteger(normalizedExpiration) && normalizedExpiration > 0
      ? normalizedExpiration
      : 10;

  const subject = "Your Mr. Emilio verification code";

  const text = [
    `Hi ${normalizedFirstName},`,
    "",
    "Use this verification code to access your Mr. Emilio orders:",
    "",
    normalizedCode,
    "",
    `This code expires in ${expirationMinutes} minutes.`,
    "",
    "If you did not request access to your orders, you can ignore this email.",
    "",
    "Mr. Emilio",
  ].join("\n");

  const html = `
      <!DOCTYPE html>
      <html>
        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f5f7fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #1d2a44;
          "
        >
          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="background-color: #f5f7fb; padding: 32px 16px;"
          >
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    max-width: 560px;
                    background-color: #ffffff;
                    border-radius: 16px;
                    padding: 40px;
                  "
                >
                  <tr>
                    <td>
                      <h1
                        style="
                          margin: 0 0 20px;
                          font-size: 26px;
                          line-height: 1.25;
                          color: #173b8f;
                        "
                      >
                        Access your orders
                      </h1>

                      <p
                        style="
                          margin: 0 0 16px;
                          font-size: 16px;
                          line-height: 1.6;
                        "
                      >
                        Hi ${normalizedFirstName},
                      </p>

                      <p
                        style="
                          margin: 0 0 24px;
                          font-size: 16px;
                          line-height: 1.6;
                        "
                      >
                        Use this verification code to securely access
                        your Mr. Emilio orders.
                      </p>

                      <div
                        style="
                          margin: 0 0 24px;
                          padding: 20px;
                          border-radius: 12px;
                          background-color: #f2f5fb;
                          text-align: center;
                          font-size: 32px;
                          font-weight: 700;
                          letter-spacing: 8px;
                          color: #173b8f;
                        "
                      >
                        ${normalizedCode}
                      </div>

                      <p
                        style="
                          margin: 0 0 16px;
                          font-size: 14px;
                          line-height: 1.6;
                          color: #60708f;
                        "
                      >
                        This code expires in ${expirationMinutes} minutes.
                      </p>

                      <p
                        style="
                          margin: 0;
                          font-size: 14px;
                          line-height: 1.6;
                          color: #60708f;
                        "
                      >
                        If you did not request access to your orders,
                        you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

  return {
    subject,
    text,
    html,
  };
};

const escapeHtml = (value) => {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const formatCurrencyFromCents = (amountInCents) => {
  const normalizedAmount = Number(amountInCents);

  if (!Number.isInteger(normalizedAmount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(normalizedAmount / 100);
};

const getOrderItemName = (item) => {
  if (typeof item?.productName === "string" && item.productName.trim()) {
    return item.productName.trim();
  }

  const productName = item?.product?.product_name;

  if (typeof productName === "string" && productName.trim()) {
    return productName.trim();
  }

  if (productName && typeof productName === "object") {
    return productName.en || productName.es || item?.productId || "Product";
  }

  return item?.name || item?.productId || "Product";
};

const getOrderItemUnitPriceInCents = (item) => {
  const directPrice = Number(item?.unitPriceInCents);

  if (Number.isInteger(directPrice) && directPrice >= 0) {
    return directPrice;
  }

  const nestedPrice = Number(item?.pricing?.unitPriceInCents);

  if (Number.isInteger(nestedPrice) && nestedPrice >= 0) {
    return nestedPrice;
  }

  return 0;
};

const getOrderItemLineTotalInCents = (item) => {
  const directLineTotal = Number(item?.lineTotalInCents);

  if (Number.isInteger(directLineTotal) && directLineTotal >= 0) {
    return directLineTotal;
  }

  const nestedLineTotal = Number(item?.pricing?.lineTotalInCents);

  if (Number.isInteger(nestedLineTotal) && nestedLineTotal >= 0) {
    return nestedLineTotal;
  }

  const quantity = Number(item?.quantity) || 0;

  return getOrderItemUnitPriceInCents(item) * quantity;
};

const getOrderItemSizeLabel = (item) => {
  const size = item?.size || item?.product?.size || null;

  if (!size) {
    return "";
  }

  if (typeof size === "string") {
    return size;
  }

  if (typeof size !== "object") {
    return "";
  }

  const value = size.value;

  const unit =
    typeof size.unit === "string" ? size.unit.trim().toLowerCase() : "";

  if (value === null || value === undefined) {
    return "";
  }

  const unitLabels = {
    piece: "pcs",
    pieces: "pcs",
    ounce: "oz",
    ounces: "oz",
    pound: "lb",
    pounds: "lb",
  };

  const formattedUnit = unitLabels[unit] || unit;

  return [value, formattedUnit].filter(Boolean).join(" ");
};

const formatCardBrand = (brand) => {
  if (typeof brand !== "string" || !brand.trim()) {
    return "Card";
  }

  const normalizedBrand = brand.trim().toLowerCase();

  const brandLabels = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "American Express",
    discover: "Discover",
  };

  return brandLabels[normalizedBrand] || brand.trim();
};

const buildOrderConfirmationEmail = ({
  order,
  hasFulfillmentQrCode = false,
}) => {
  if (!order || typeof order !== "object" || Array.isArray(order)) {
    throw new Error("Confirmed order is required to build confirmation email");
  }

  const orderNumber = order.orderNumber || order.id || "Order";

  const customerFirstName =
    typeof order.customer?.firstName === "string" &&
    order.customer.firstName.trim()
      ? order.customer.firstName.trim()
      : "there";

  const fulfillment = order.fulfillment || {};
  const pricing = order.pricing || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const payment = order.payment || {};
  const card = payment.card || {};

  const isPickup = fulfillment.method === "pickup";

  const qrTitle = isPickup ? "Your pickup QR code" : "Your delivery QR code";

  const qrDescription = isPickup
    ? "Show this QR code to a Mr. Emilio team member when you pick up your order."
    : "If your order is handed directly to you, show this QR code to the delivery driver.";

  const qrHelpText = isPickup
    ? "This QR code verifies your order. Keep it available until your order is picked up."
    : "You do not need to be home for delivery. If the order is left at your door, the driver will complete delivery using photo confirmation instead.";

  const subtotalInCents = Number(pricing.subtotalInCents || 0);
  const deliveryFeeInCents = Number(pricing.deliveryFeeInCents || 0);
  const taxInCents = Number(pricing.taxInCents || 0);
  const totalInCents = Number(pricing.totalInCents || 0);

  const subject = `Order ${orderNumber} confirmed — Mr. Emilio`;

  const fulfillmentTitle = isPickup ? "Pickup store" : "Delivery address";

  const fulfillmentAddress = fulfillment.address || "";

  const fulfillmentStore =
    fulfillment.warehouseName || fulfillment.warehouse_name || "";

  const itemRowsHtml = items
    .map((item) => {
      const itemName = escapeHtml(getOrderItemName(item));
      const quantity = Number(item.quantity || 0);
      const lineTotalInCents = getOrderItemLineTotalInCents(item);
      const sizeLabel = getOrderItemSizeLabel(item);

      return `
        <tr>
          <td
            valign="top"
            style="
              padding: 14px 12px 14px 0;
              border-bottom: 1px solid #e4e9f2;
              vertical-align: top;
            "
          >
            <div
              style="
                margin: 0;
                font-size: 15px;
                line-height: 1.35;
                font-weight: 700;
                color: #182033;
              "
            >
              ${itemName}
            </div>

            <div
              style="
                margin-top: 5px;
                font-size: 13px;
                line-height: 1.4;
                color: #687386;
              "
            >
              Qty ${quantity}
              ${sizeLabel ? ` · ${escapeHtml(sizeLabel)}` : ""}
            </div>
          </td>

          <td
            align="right"
            valign="top"
            style="
              width: 90px;
              padding: 14px 0;
              border-bottom: 1px solid #e4e9f2;
              vertical-align: top;
              white-space: nowrap;
            "
          >
            <div
              style="
                margin: 0;
                font-size: 15px;
                line-height: 1.35;
                font-weight: 600;
                color: #182033;
                text-align: right;
              "
            >
              ${formatCurrencyFromCents(lineTotalInCents)}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  const fulfillmentDetailsHtml = isPickup
    ? `
      <div
        style="
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.55;
          color: #687386;
        "
      >
        ${escapeHtml(fulfillmentStore)}
        ${fulfillmentAddress ? `<br />${escapeHtml(fulfillmentAddress)}` : ""}
      </div>
    `
    : `
      <div
        style="
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.55;
          color: #687386;
        "
      >
        ${escapeHtml(fulfillmentAddress)}
        ${
          fulfillmentStore
            ? `<br />Fulfilled by <strong style="color:#182033;">${escapeHtml(
                fulfillmentStore
              )}</strong>`
            : ""
        }
      </div>
    `;

  const estimatedTime = fulfillment.estimatedTimeMinutes;

  const estimatedTimeHtml =
    !isPickup && estimatedTime && typeof estimatedTime === "object"
      ? `
        <div
          style="
            margin-top: 16px;
            font-size: 13px;
            line-height: 1.45;
            color: #687386;
          "
        >
          Estimated delivery
          <br />

          <strong style="color:#182033;">
            ${escapeHtml(estimatedTime.minimum ?? "")} – ${escapeHtml(
          estimatedTime.maximum ?? ""
        )} minutes
          </strong>
        </div>
      `
      : "";

  const textItems = items.map((item) => {
    const quantity = Number(item.quantity || 0);
    const lineTotalInCents = getOrderItemLineTotalInCents(item);
    const sizeLabel = getOrderItemSizeLabel(item);

    const itemDetails = [`Qty ${quantity}`, sizeLabel]
      .filter(Boolean)
      .join(" · ");

    return `${getOrderItemName(
      item
    )} — ${itemDetails} — ${formatCurrencyFromCents(lineTotalInCents)}`;
  });

  const text = [
    `Hi ${customerFirstName},`,
    "",
    "Thank you! Your order has been placed successfully.",
    "",
    `Order Number: ${orderNumber}`,
    "",
    `${fulfillmentTitle}:`,
    fulfillmentAddress,
    fulfillmentStore ? `Fulfilled by ${fulfillmentStore}` : "",
    "",
    "Order Summary:",
    ...textItems,
    "",
    `Subtotal: ${formatCurrencyFromCents(subtotalInCents)}`,
    isPickup
      ? "Pickup: Free"
      : `Local delivery: ${formatCurrencyFromCents(deliveryFeeInCents)}`,
    `Sales tax: ${formatCurrencyFromCents(taxInCents)}`,
    `Total: ${formatCurrencyFromCents(totalInCents)}`,
    "",
    card.last4
      ? `Payment: ${formatCardBrand(card.brand)} ending in ${card.last4}`
      : "Payment: Paid",
    "",
    isPickup
      ? "We'll prepare your order for pickup."
      : "We'll prepare your order and deliver it to the address above.",
    "",
    hasFulfillmentQrCode
      ? isPickup
        ? "Your confirmation email includes a QR code to present when picking up your order."
        : "Your confirmation email includes a QR code you can show to the driver if your order is handed directly to you."
      : null,
    hasFulfillmentQrCode ? "" : null,
    "Thank you for shopping with Mr. Emilio.",
  ]
    .filter((line) => line !== null && line !== undefined)
    .join("\n");

  const html = `
    <!DOCTYPE html>

    <html>
      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f5f7fb;
          font-family: Arial, Helvetica, sans-serif;
          color: #182033;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            background-color: #f5f7fb;
            padding: 32px 14px;
          "
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  max-width: 620px;
                  background-color: #ffffff;
                  border-radius: 18px;
                  overflow: hidden;
                "
              >
                <!-- MR. EMILIO CONFIRMATION BANNER -->

                <tr>
                  <td
                    align="center"
                    style="
                      padding: 0;
                      background-color: #1646ac;
                    "
                  >
                    <img
                      src="${EMAIL_BRAND_ASSETS.ORDER_CONFIRMATION_BANNER}"
                      alt="Mr. Emilio"
                      width="620"
                      style="
                        display: block;
                        width: 100%;
                        max-width: 620px;
                        height: auto;
                        margin: 0;
                        padding: 0;
                        border: 0;
                        outline: none;
                        text-decoration: none;
                      "
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 26px 26px 8px;
                    "
                  >
                    <!-- SUCCESS ICON -->

                    <div
                      align="center"
                      style="
                        margin: 0 auto 14px;
                        width: 46px;
                        height: 46px;
                        border-radius: 50%;
                        background-color: #27a866;
                        color: #ffffff;
                        font-size: 27px;
                        line-height: 46px;
                        font-weight: 700;
                      "
                    >
                      ✓
                    </div>

                    <h1
                      style="
                        margin: 0;
                        text-align: center;
                        color: #1646ac;
                        font-size: 28px;
                        line-height: 1.2;
                      "
                    >
                      Thank you!
                    </h1>

                    <p
                      style="
                        margin: 8px 0 28px;
                        text-align: center;
                        color: #687386;
                        font-size: 14px;
                        line-height: 1.5;
                      "
                    >
                      Your order has been placed successfully.
                    </p>

                    <!-- ORDER NUMBER -->

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        margin-bottom: 14px;
                        border: 1px solid #dce3ef;
                        border-radius: 14px;
                      "
                    >
                      <tr>
                        <td style="padding: 18px;">
                          <div
                            style="
                              font-size: 12px;
                              color: #1646ac;
                            "
                          >
                            Order Number
                          </div>

                          <div
                            style="
                              margin-top: 7px;
                              font-size: 18px;
                              font-weight: 700;
                              color: #182033;
                            "
                          >
                            ${escapeHtml(orderNumber)}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- FULFILLMENT -->

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        margin-bottom: 14px;
                        border: 1px solid #dce3ef;
                        border-radius: 14px;
                      "
                    >
                      <tr>
                        <td style="padding: 18px;">
                          <div
                            style="
                              font-size: 12px;
                              color: #1646ac;
                            "
                          >
                            ${escapeHtml(fulfillmentTitle)}
                          </div>

                          <div
                            style="
                              margin-top: 6px;
                              font-size: 16px;
                              font-weight: 700;
                              color: #182033;
                            "
                          >
                            ${
                              isPickup
                                ? escapeHtml(fulfillmentStore || "Pickup")
                                : "Delivery address"
                            }
                          </div>

                          ${fulfillmentDetailsHtml}
                          ${estimatedTimeHtml}
                        </td>
                      </tr>
                    </table>

                    <!-- ORDER SUMMARY -->

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        margin-bottom: 14px;
                        border: 1px solid #dce3ef;
                        border-radius: 14px;
                      "
                    >
                      <tr>
                        <td style="padding: 18px;">
                          <div
                            style="
                              margin-bottom: 6px;
                              font-size: 12px;
                              color: #1646ac;
                            "
                          >
                            Order Summary
                          </div>

                          <table
                            role="presentation"
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                          >
                            ${itemRowsHtml}

                            <tr>
                              <td
                                style="
                                  padding-top: 14px;
                                  font-size: 14px;
                                  color: #687386;
                                "
                              >
                                Subtotal
                              </td>

                              <td
                                align="right"
                                style="
                                  padding-top: 14px;
                                  font-size: 14px;
                                  color: #182033;
                                "
                              >
                                ${formatCurrencyFromCents(subtotalInCents)}
                              </td>
                            </tr>

                            <tr>
                              <td
                                style="
                                  padding-top: 10px;
                                  font-size: 14px;
                                  color: #687386;
                                "
                              >
                                ${isPickup ? "Pickup" : "Local delivery"}
                              </td>

                              <td
                                align="right"
                                style="
                                  padding-top: 10px;
                                  font-size: 14px;
                                  color: #182033;
                                "
                              >
                                ${
                                  isPickup
                                    ? "Free"
                                    : formatCurrencyFromCents(
                                        deliveryFeeInCents
                                      )
                                }
                              </td>
                            </tr>

                            <tr>
                              <td
                                style="
                                  padding-top: 10px;
                                  font-size: 14px;
                                  color: #687386;
                                "
                              >
                                Sales tax
                              </td>

                              <td
                                align="right"
                                style="
                                  padding-top: 10px;
                                  font-size: 14px;
                                  color: #182033;
                                "
                              >
                                ${formatCurrencyFromCents(taxInCents)}
                              </td>
                            </tr>

                            <tr>
                              <td
                                style="
                                  padding-top: 16px;
                                  border-top: 1px solid #e4e9f2;
                                  font-size: 18px;
                                  font-weight: 700;
                                  color: #1646ac;
                                "
                              >
                                Total
                              </td>

                              <td
                                align="right"
                                style="
                                  padding-top: 16px;
                                  border-top: 1px solid #e4e9f2;
                                  font-size: 20px;
                                  font-weight: 700;
                                  color: #1646ac;
                                "
                              >
                                ${formatCurrencyFromCents(totalInCents)}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- PAYMENT -->

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        margin-bottom: 14px;
                        border: 1px solid #dce3ef;
                        border-radius: 14px;
                      "
                    >
                      <tr>
                        <td style="padding: 18px;">
                          <div
                            style="
                              font-size: 12px;
                              color: #1646ac;
                            "
                          >
                            Payment
                          </div>

                          <div
                            style="
                              margin-top: 8px;
                              font-size: 14px;
                              color: #182033;
                            "
                          >
                            ${
                              card.last4
                                ? `${escapeHtml(
                                    formatCardBrand(card.brand)
                                  )} ending in ${escapeHtml(card.last4)}`
                                : "Card payment"
                            }
                          </div>

                          <div
                            style="
                              margin-top: 6px;
                              font-size: 15px;
                              font-weight: 700;
                              color: #27a866;
                            "
                          >
                            Paid · ${formatCurrencyFromCents(totalInCents)}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- WHAT'S NEXT -->

                    <div
                      style="
                        padding: 18px;
                        border: 1px solid #bfd0f5;
                        border-radius: 14px;
                        background-color: #f1f5ff;
                      "
                    >
                      <div
                        style="
                          font-size: 15px;
                          font-weight: 700;
                          color: #182033;
                        "
                      >
                        What’s next?
                      </div>

                      <div
                        style="
                          margin-top: 7px;
                          font-size: 13px;
                          line-height: 1.55;
                          color: #687386;
                        "
                      >
                        ${
                          isPickup
                            ? "We’ll prepare your order for pickup at the selected store."
                            : "We’ll prepare your order and deliver it to the address above."
                        }
                      </div>
                    </div>

                    ${
                      hasFulfillmentQrCode
                        ? `
                    <!-- ORDER VERIFICATION QR -->

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        margin-top: 14px;
                        border: 1px solid #dce3ef;
                        border-radius: 14px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 24px 18px;
                          "
                        >
                          <div
                            style="
                              margin: 0;
                              font-size: 11px;
                              line-height: 1.2;
                              font-weight: 700;
                              letter-spacing: 0.6px;
                              text-transform: uppercase;
                              color: #1646ac;
                            "
                          >
                            Order verification
                          </div>

                          <div
                            style="
                              margin-top: 8px;
                              font-size: 20px;
                              line-height: 1.25;
                              font-weight: 700;
                              color: #182033;
                            "
                          >
                            ${escapeHtml(qrTitle)}
                          </div>

                          <div
                            style="
                              max-width: 420px;
                              margin: 10px auto 0;
                              font-size: 14px;
                              line-height: 1.55;
                              color: #687386;
                            "
                          >
                            ${escapeHtml(qrDescription)}
                          </div>

                          <div
                            style="
                              margin: 22px auto 0;
                              text-align: center;
                            "
                          >
                            <img
                              src="cid:mr-emilio-order-verification-qr"
                              alt="Verification QR code for order ${escapeHtml(
                                orderNumber
                              )}"
                              width="220"
                              height="220"
                              style="
                                display: block;
                                width: 220px;
                                height: 220px;
                                max-width: 100%;
                                margin: 0 auto;
                                padding: 12px;
                                border: 1px solid #dce3ef;
                                border-radius: 14px;
                                background-color: #ffffff;
                              "
                            />
                          </div>

                          <div
                            style="
                              margin-top: 16px;
                              font-size: 13px;
                              line-height: 1.4;
                              color: #687386;
                            "
                          >
                            Order

                            <strong
                              style="
                                margin-left: 4px;
                                color: #182033;
                              "
                            >
                              ${escapeHtml(orderNumber)}
                            </strong>
                          </div>

                          <div
                            style="
                              max-width: 430px;
                              margin: 16px auto 0;
                              font-size: 12px;
                              line-height: 1.55;
                              color: #687386;
                            "
                          >
                            ${escapeHtml(qrHelpText)}
                          </div>
                        </td>
                      </tr>
                    </table>
                    `
                        : ""
                    }

                    <p
                      style="
                        margin: 28px 0 4px;
                        text-align: center;
                        font-size: 13px;
                        color: #687386;
                      "
                    >
                      Thank you for shopping with Mr. Emilio.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return {
    subject,
    text,
    html,
  };
};

module.exports = {
  buildCustomerAccessCodeEmail,
  buildOrderConfirmationEmail,
};
