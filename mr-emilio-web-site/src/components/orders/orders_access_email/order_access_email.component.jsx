import { useState } from "react";

import { useOrders } from "../../../infrastructure/services/orders/use-orders.hook";

import {
  OrderAccessSection,
  OrderAccessCard,
  OrderAccessHeader,
  OrderAccessTitle,
  OrderAccessDescription,
  OrderAccessForm,
  OrderAccessField,
  OrderAccessLabel,
  OrderAccessInput,
  OrderAccessError,
  OrderAccessButton,
} from "./order_access_email.styles";

export const OrderAccessEmail = () => {
  const { requestAccessCode, isRequestingCode, error } = useOrders();
  console.log("Error:", error);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail || isRequestingCode) {
      return;
    }

    try {
      await requestAccessCode(normalizedEmail);
    } catch {
      // OrdersProvider owns the error state.
    }
  };

  return (
    <OrderAccessSection>
      <OrderAccessCard>
        <OrderAccessHeader>
          <OrderAccessTitle>My Orders</OrderAccessTitle>

          <OrderAccessDescription>
            Enter the email address you used when placing your order. We’ll send
            you a verification code to securely access your order history.
          </OrderAccessDescription>
        </OrderAccessHeader>

        <OrderAccessForm onSubmit={handleSubmit}>
          <OrderAccessField>
            <OrderAccessLabel htmlFor="customer-orders-email">
              Email address
            </OrderAccessLabel>

            <OrderAccessInput
              id="customer-orders-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              disabled={isRequestingCode}
              placeholder="you@example.com"
            />
          </OrderAccessField>

          {error && <OrderAccessError role="alert">{error}</OrderAccessError>}

          <OrderAccessButton
            type="submit"
            disabled={isRequestingCode || !email.trim()}
          >
            {isRequestingCode ? "Sending code..." : "Send verification code"}
          </OrderAccessButton>
        </OrderAccessForm>
      </OrderAccessCard>
    </OrderAccessSection>
  );
};
