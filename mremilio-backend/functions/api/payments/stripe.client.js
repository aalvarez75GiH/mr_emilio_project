/* eslint-disable */

const Stripe = require("stripe");

const getStripeSecretKey = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (typeof stripeSecretKey !== "string" || !stripeSecretKey.trim()) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }

  return stripeSecretKey.trim();
};

const stripe = new Stripe(getStripeSecretKey());

module.exports = stripe;
