export const getStripeCustomerError = (error) => {
  const code = error?.decline_code || error?.declineCode || error?.code || null;

  switch (code) {
    case "invalid_number":
    case "incorrect_number":
      return {
        title: "Check your card number",
        message: "The card number is not valid. Please check it and try again.",
      };

    case "invalid_cvc":
    case "incorrect_cvc":
      return {
        title: "Check your security code",
        message:
          "The card security code is not valid. Please check it and try again.",
      };

    case "invalid_expiry_month":
    case "invalid_expiry_year":
    case "expired_card":
      return {
        title: "Check your expiration date",
        message:
          "The card expiration date is not valid. Please check it or use another card.",
      };

    case "insufficient_funds":
      return {
        title: "Payment declined",
        message:
          "This card has insufficient funds. Please use another payment method.",
      };

    case "processing_error":
      return {
        title: "Payment could not be processed",
        message: "We couldn't process this card. Please try again in a moment.",
      };

    case "issuer_not_available":
      return {
        title: "Bank unavailable",
        message:
          "Your bank could not be reached. Please try again in a moment.",
      };

    case "generic_decline":
    case "card_declined":
    case "lost_card":
    case "stolen_card":
    case "fraudulent":
      return {
        title: "Payment declined",
        message:
          "Your card was declined. Please try another card or contact your bank.",
      };

    case "incomplete_number":
    case "incomplete_cvc":
    case "incomplete_expiry":
      return {
        title: "Complete your card details",
        message:
          "Please complete all required payment information before continuing.",
      };

    default:
      return {
        title: "Check your payment details",
        message:
          error?.message ||
          "We couldn't validate your payment information. Please check your details and try again.",
      };
  }
};
