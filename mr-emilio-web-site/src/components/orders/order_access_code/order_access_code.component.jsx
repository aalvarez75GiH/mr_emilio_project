import { useState } from "react";

import { useOrders } from "../../../infrastructure/services/orders/use-orders.hook";

import {
  OrderAccessSection,
  OrderAccessCard,
  OrderAccessHeader,
  OrderAccessTitle,
  OrderAccessDescription,
  OrderAccessEmail,
  OrderAccessForm,
  OrderAccessField,
  OrderAccessLabel,
  OrderAccessCodeInput,
  OrderAccessError,
  OrderAccessButton,
  OrderAccessSecondaryButton,
} from "./order_access_code.styles";

export const OrderAccessCode = () => {
  const { email, verifyAccessCode, resetOrderAccess, isVerifyingCode, error } =
    useOrders();

  const [code, setCode] = useState("");

  const handleCodeChange = (event) => {
    const numericCode = event.target.value.replace(/\D/g, "").slice(0, 6);

    setCode(numericCode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (code.length !== 6 || isVerifyingCode) {
      return;
    }

    try {
      await verifyAccessCode(code);
    } catch {
      // OrdersProvider owns the error state.
    }
  };

  return (
    <OrderAccessSection>
      <OrderAccessCard>
        <OrderAccessHeader>
          <OrderAccessTitle>Check your email</OrderAccessTitle>

          <OrderAccessDescription>
            We sent a 6-digit verification code to
          </OrderAccessDescription>

          <OrderAccessEmail>{email}</OrderAccessEmail>
        </OrderAccessHeader>

        <OrderAccessForm onSubmit={handleSubmit}>
          <OrderAccessField>
            <OrderAccessLabel htmlFor="customer-orders-code">
              Verification code
            </OrderAccessLabel>

            <OrderAccessCodeInput
              id="customer-orders-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={handleCodeChange}
              maxLength={6}
              placeholder="000000"
              disabled={isVerifyingCode}
              autoFocus
            />
          </OrderAccessField>

          {error && <OrderAccessError role="alert">{error}</OrderAccessError>}

          <OrderAccessButton
            type="submit"
            disabled={isVerifyingCode || code.length !== 6}
          >
            {isVerifyingCode ? "Verifying..." : "Verify code"}
          </OrderAccessButton>

          <OrderAccessSecondaryButton
            type="button"
            onClick={resetOrderAccess}
            disabled={isVerifyingCode}
          >
            Use a different email
          </OrderAccessSecondaryButton>
        </OrderAccessForm>
      </OrderAccessCard>
    </OrderAccessSection>
  );
};
