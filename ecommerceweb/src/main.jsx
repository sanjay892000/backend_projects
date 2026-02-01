import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductState from "./context/ProductState.jsx";
import ShopState from "./context/ShopState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProductState>
        <ShopState>
          <App />
        </ShopState>
      </ProductState>
    </BrowserRouter>
  </StrictMode>,
);
