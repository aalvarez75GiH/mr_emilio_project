import { Navigate, Route, Routes } from "react-router-dom";

import { HomeScreen } from "./screens/home/home.screen";
import { Cart } from "./screens/cart/cart.screen";
import { CheckoutEntry } from "./screens/checkout/checkout_entry.screen";
import { DeliveryOptions } from "./screens/checkout/delivery_options.screen";
import { PickupStore } from "./screens/checkout/pickup_store.screen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutEntry />} />

      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/checkout/delivery" element={<DeliveryOptions />} />
      <Route path="/checkout/delivery/pickup" element={<PickupStore />} />
    </Routes>
  );
}

export default App;
