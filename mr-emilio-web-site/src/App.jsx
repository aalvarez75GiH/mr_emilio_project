import { Navigate, Route, Routes } from "react-router-dom";

import { HomeScreen } from "./screens/home/home.screen";
import { Cart } from "./screens/cart/cart.screen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

// import { HomeScreen } from "./screens/home/home.screen";

// function App() {
//   return <HomeScreen />;
// }

// export default App;
