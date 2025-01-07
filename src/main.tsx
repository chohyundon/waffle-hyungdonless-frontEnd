import { StrictMode } from "react";
import "./index.css";
import Router from "./components/routes/index.tsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
