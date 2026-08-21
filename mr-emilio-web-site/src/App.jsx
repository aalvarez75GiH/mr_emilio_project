import { Navigate, Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/common/scroll_to_top/scroll_to_top.component";

import { HomeScreen } from "./screens/home/home.screen";
import { Cart } from "./screens/cart/cart.screen";
import { CheckoutEntry } from "./screens/checkout/checkout_entry.screen";
import { DeliveryOptions } from "./screens/checkout/delivery_options.screen";
import { PickupStore } from "./screens/checkout/pickup_store.screen";
import { CustomerInformation } from "./screens/checkout/customer_information.screen";
import { Payment } from "./screens/checkout/payment.screen";
import { Review } from "./screens/checkout/review.screen";
import { OrderConfirmation } from "./screens/checkout/order_confirmation.screen";
import { MyOrders } from "./screens/orders/my_orders.screen";
import { ChangeStore } from "./screens/change_store/change_store.component";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutEntry />} />
        <Route path="/checkout/delivery" element={<DeliveryOptions />} />
        <Route path="/checkout/delivery/pickup" element={<PickupStore />} />
        <Route path="/checkout/information" element={<CustomerInformation />} />
        <Route path="/checkout/payment" element={<Payment />} />
        <Route path="/checkout/review" element={<Review />} />
        <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/change-store" element={<ChangeStore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
