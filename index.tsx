import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom"; // ✅ Add this

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/habitquest-gamified-habit-tracker">  {/* ✅ VERY IMPORTANT */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
