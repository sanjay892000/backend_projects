import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductState from "./context/ProductState.jsx";
import ShopState from "./context/ShopState.jsx";
import AuthState from "./context/AuthState.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthState>
        <ProductState>
          <ShopState>
            <App />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="colored"
            />
          </ShopState>
        </ProductState>
      </AuthState>
    </BrowserRouter>
  </StrictMode>,
);
