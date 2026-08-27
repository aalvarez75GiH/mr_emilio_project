/* eslint-disable */

const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const { buildOrderConfirmationEmail } = require("./email_templates");

const { EMAIL_FROM_NAME } = require("./email.constants");

let transporter = null;

const validateEmailConfiguration = () => {
  const requiredEnvironmentVariables = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASSWORD",
    "SMTP_FROM_EMAIL",
  ];

  const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
    (environmentVariable) => !process.env[environmentVariable]
  );

  if (missingEnvironmentVariables.length > 0) {
    throw new Error(
      `Missing email configuration: ${missingEnvironmentVariables.join(", ")}`
    );
  }
};

const getEmailTransporter = () => {
  if (transporter) {
    return transporter;
  }

  validateEmailConfiguration();

  const smtpPort = Number(process.env.SMTP_PORT);

  if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
    throw new Error("SMTP_PORT must be a valid positive integer");
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,

    port: smtpPort,

    secure: smtpPort === 465,

    auth: {
      user: process.env.SMTP_USER,

      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo = null,
  attachments = [],
}) => {
  if (typeof to !== "string" || !to.trim()) {
    throw new Error("Email recipient is required");
  }

  if (typeof subject !== "string" || !subject.trim()) {
    throw new Error("Email subject is required");
  }

  if (
    (typeof text !== "string" || !text.trim()) &&
    (typeof html !== "string" || !html.trim())
  ) {
    throw new Error("Email content is required");
  }

  const emailTransporter = getEmailTransporter();

  const fromEmail = process.env.SMTP_FROM_EMAIL.trim();

  const mailOptions = {
    from: `"${EMAIL_FROM_NAME}" <${fromEmail}>`,
    to: to.trim(),
    subject: subject.trim(),
    text: typeof text === "string" ? text : undefined,
    html: typeof html === "string" ? html : undefined,

    attachments: Array.isArray(attachments) ? attachments : [],
  };
  if (typeof replyTo === "string" && replyTo.trim()) {
    mailOptions.replyTo = replyTo.trim();
  }

  try {
    const result = await emailTransporter.sendMail(mailOptions);

    return {
      success: true,

      messageId: result.messageId || null,

      accepted: Array.isArray(result.accepted) ? result.accepted : [],

      rejected: Array.isArray(result.rejected) ? result.rejected : [],
    };
  } catch (error) {
    console.error("EMAIL SEND ERROR:", {
      to: to.trim(),

      subject: subject.trim(),

      message: error?.message || null,

      code: error?.code || null,

      command: error?.command || null,
    });

    throw new Error(error?.message || "Email could not be sent");
  }
};

const sendOrderConfirmationEmail = async ({
  order,
  fulfillmentCredential = null,
}) => {
  if (!order || typeof order !== "object" || Array.isArray(order)) {
    throw new Error("Confirmed order is required to send confirmation email");
  }

  const customerEmail =
    typeof order.customer?.email === "string"
      ? order.customer.email.trim()
      : "";

  if (!customerEmail) {
    throw new Error(
      "Confirmed order does not contain a customer email address"
    );
  }

  const credential =
    typeof fulfillmentCredential?.credential === "string"
      ? fulfillmentCredential.credential.trim()
      : "";

  let qrCodeAttachment = null;

  if (credential) {
    const qrCodeBuffer = await QRCode.toBuffer(credential, {
      type: "png",
      errorCorrectionLevel: "M",
      margin: 2,
      width: 440,
    });

    qrCodeAttachment = {
      filename: `mr-emilio-${order.orderNumber || "order"}-verification.png`,

      content: qrCodeBuffer,

      contentType: "image/png",

      cid: "mr-emilio-order-verification-qr",
    };
  }

  const email = buildOrderConfirmationEmail({
    order,

    hasFulfillmentQrCode: Boolean(qrCodeAttachment),
  });

  return sendEmail({
    to: customerEmail,

    subject: email.subject,

    text: email.text,

    html: email.html,

    attachments: qrCodeAttachment ? [qrCodeAttachment] : [],
  });
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail,
};
