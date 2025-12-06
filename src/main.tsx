import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { ToastProvider } from "./components/ToastProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Provider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </Provider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
