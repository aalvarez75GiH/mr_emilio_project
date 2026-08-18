import { useEffect } from "react";

import { MainHeader } from "../../components/main_header/main_header.component";
import { OrderAccessEmail } from "../../components/orders/orders_access_email/order_access_email.component";
import { OrderAccessCode } from "../../components/orders/order_access_code/order_access_code.component";
import { useOrders } from "../../infrastructure/services/orders/use-orders.hook";
import { OrderHistory } from "../../components/orders/order_history/order_history.component";

export const MyOrders = () => {
  const { accessState, checkCustomerAccessSession, orderAccessStates, error } =
    useOrders();

  useEffect(() => {
    checkCustomerAccessSession();
  }, [checkCustomerAccessSession]);

  if (
    accessState === orderAccessStates.IDLE ||
    accessState === orderAccessStates.CHECKING_SESSION
  ) {
    return (
      <>
        <MainHeader />

        <main>
          <p>Checking your order access...</p>
        </main>
      </>
    );
  }

  if (accessState === orderAccessStates.EMAIL_REQUIRED) {
    return (
      <>
        <MainHeader />

        <main>
          <OrderAccessEmail />
        </main>
      </>
    );
  }

  if (accessState === orderAccessStates.CODE_REQUIRED) {
    return (
      <>
        <MainHeader />

        <main>
          <OrderAccessCode />
        </main>
      </>
    );
  }

  if (accessState === orderAccessStates.VERIFIED) {
    return (
      <>
        <MainHeader />

        <main>
          <OrderHistory />
        </main>
      </>
    );
  }

  return (
    <>
      <MainHeader />

      <main>
        <p>{error || "We could not load your orders."}</p>
      </main>
    </>
  );
};
