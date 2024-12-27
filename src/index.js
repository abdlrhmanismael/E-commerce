import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/scss/dashboard/style.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router } from "react-router-dom";
import { WindowWidthProvider } from "./Dasboard/Context/GetWidth";
import { SidebarProvider } from "./Dasboard/Context/SidebarIsOpen";
import { CartProvider } from "./Dasboard/Context/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <WindowWidthProvider>
        <SidebarProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </SidebarProvider>
      </WindowWidthProvider>
    </Router>
  </React.StrictMode>
);
