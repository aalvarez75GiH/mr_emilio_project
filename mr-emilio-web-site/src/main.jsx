import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/global.styles";
import { theme } from "./infrastructure/theme/index.js";
import { ProductsProvider } from "./infrastructure/services/products/products.provider.jsx";

import "./i18n/i18n";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
