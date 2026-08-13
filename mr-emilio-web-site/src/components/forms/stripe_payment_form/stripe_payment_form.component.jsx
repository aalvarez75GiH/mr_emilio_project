import { forwardRef, useImperativeHandle } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { StripePaymentFormContainer } from "./stripe_payment_form.styles";

export const StripePaymentForm = forwardRef(
  ({ billingDetails, onReadyChange }, ref) => {
    const stripe = useStripe();
    const elements = useElements();

    useImperativeHandle(
      ref,
      () => ({
        prepareForReview: async () => {
          if (!stripe || !elements) {
            return {
              ok: false,

              error: {
                code: "stripe_not_ready",
                message:
                  "The secure payment form is still loading. Please try again.",
              },
            };
          }

          const { error: submitError } = await elements.submit();

          if (submitError) {
            return {
              ok: false,
              error: submitError,
            };
          }

          const fullName = [billingDetails?.firstName, billingDetails?.lastName]
            .filter(Boolean)
            .join(" ")
            .trim();

          const { error, confirmationToken } =
            await stripe.createConfirmationToken({
              elements,

              params: {
                payment_method_data: {
                  billing_details: {
                    name: fullName || undefined,

                    email: billingDetails?.email || undefined,

                    phone: billingDetails?.phone || undefined,
                  },
                },
              },
            });

          if (error) {
            return {
              ok: false,
              error,
            };
          }

          if (!confirmationToken?.id) {
            return {
              ok: false,

              error: {
                code: "confirmation_token_missing",

                message:
                  "We couldn't prepare your payment information. Please try again.",
              },
            };
          }

          return {
            ok: true,

            confirmationToken,
          };
        },
      }),
      [stripe, elements, billingDetails]
    );

    return (
      <StripePaymentFormContainer>
        <PaymentElement
          options={{
            layout: "tabs",

            wallets: {
              applePay: "never",
              googlePay: "never",
            },
          }}
          onReady={() => {
            onReadyChange?.(true);
          }}
          onLoadError={() => {
            onReadyChange?.(false);
          }}
        />
        {/* <PaymentElement
          options={{
            layout: "tabs",
          }}
          onReady={() => {
            onReadyChange?.(true);
          }}
          onLoadError={() => {
            onReadyChange?.(false);
          }}
        /> */}
      </StripePaymentFormContainer>
    );
  }
);

StripePaymentForm.displayName = "StripePaymentForm";
// import { PaymentElement } from "@stripe/react-stripe-js";

// import { StripePaymentFormContainer } from "./stripe_payment_form.styles";

// export const StripePaymentForm = () => {
//   const handleReady = () => {
//     console.log("STRIPE PAYMENT ELEMENT READY");
//   };

//   const handleLoadError = (event) => {
//     console.error("STRIPE PAYMENT ELEMENT LOAD ERROR:", event);
//   };

//   const handleChange = (event) => {
//     console.log("STRIPE PAYMENT ELEMENT CHANGE:", {
//       complete: event.complete,
//       empty: event.empty,
//       value: event.value,
//     });
//   };

//   return (
//     <StripePaymentFormContainer>
//       <PaymentElement
//         options={{
//           layout: "tabs",
//         }}
//         onReady={handleReady}
//         onLoadError={handleLoadError}
//         onChange={handleChange}
//       />
//     </StripePaymentFormContainer>
//   );
// };
