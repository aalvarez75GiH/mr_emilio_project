/* eslint-disable */

const nodemailer = require("nodemailer");

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

const sendEmail = async ({ to, subject, text, html, replyTo = null }) => {
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

module.exports = {
  sendEmail,
};
