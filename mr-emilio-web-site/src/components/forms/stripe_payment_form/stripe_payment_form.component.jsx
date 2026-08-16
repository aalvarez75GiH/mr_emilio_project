import { forwardRef, useImperativeHandle, useRef } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { StripePaymentFormContainer } from "./stripe_payment_form.styles";

export const StripePaymentForm = forwardRef(
  ({ billingDetails, onReadyChange, onCompleteChange }, ref) => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentElementRef = useRef(null);
    const wasCompleteRef = useRef(false);

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

          /**
           * Stripe performs final client-side
           * validation before creating the
           * ConfirmationToken.
           *
           * This still does NOT charge the card.
           */
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

          /**
           * Create a ConfirmationToken containing
           * the payment information collected by
           * Stripe Elements.
           *
           * No PaymentIntent exists yet.
           * No payment is submitted yet.
           */
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
          onReady={(paymentElement) => {
            paymentElementRef.current = paymentElement;

            onReadyChange?.(true);
          }}
          onChange={(event) => {
            const isComplete = event.complete === true;

            onCompleteChange?.(isComplete);

            /**
             * Dismiss the mobile keyboard only when
             * Stripe transitions from incomplete → complete.
             *
             * This avoids repeatedly blurring the form
             * on every Stripe change event.
             */
            if (isComplete && !wasCompleteRef.current) {
              paymentElementRef.current?.blur();
            }

            wasCompleteRef.current = isComplete;
          }}
          onLoadError={(event) => {
            console.error("STRIPE PAYMENT ELEMENT LOAD ERROR:", event);

            paymentElementRef.current = null;
            wasCompleteRef.current = false;

            onReadyChange?.(false);
            onCompleteChange?.(false);
          }}
        />
      </StripePaymentFormContainer>
    );
  }
);

StripePaymentForm.displayName = "StripePaymentForm";
