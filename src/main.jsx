import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
        <App />
    </AuthProvider>
  </BrowserRouter>,
);
