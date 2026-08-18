import "./i18n/i18n";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App.jsx";
import { theme } from "./infrastructure/theme/index.js";

import { ProductsProvider } from "./infrastructure/services/products/products.provider.jsx";
import { WarehouseProvider } from "./infrastructure/services/warehouse/warehouse.provider.jsx";
import { CustomerCatalogProvider } from "./infrastructure/services/catalog/customer_catalog.provider.jsx";
import { GeolocationProvider } from "./infrastructure/services/geolocation/geolocation.provider.jsx";
import { CartProvider } from "./infrastructure/services/cart/cart.provider.jsx";
import { CheckoutProvider } from "./infrastructure/services/checkout/checkout.provider.jsx";
import { OrdersProvider } from "./infrastructure/services/orders/orders.provider.jsx";
import { GlobalStyles } from "./styles/global.styles";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <ProductsProvider>
          <GeolocationProvider>
            <WarehouseProvider>
              <CustomerCatalogProvider>
                <CartProvider>
                  <CheckoutProvider>
                    <OrdersProvider>
                      <App />
                    </OrdersProvider>
                  </CheckoutProvider>
                </CartProvider>
              </CustomerCatalogProvider>
            </WarehouseProvider>
          </GeolocationProvider>
        </ProductsProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
