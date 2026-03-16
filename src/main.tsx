import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryProvider } from "./app/providers/QueryProvider";
import AppRouter from "./app/router/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </StrictMode>
);