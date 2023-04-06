import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "../../static/style.css"

const root = createRoot(document.getElementById("app"));

root.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
