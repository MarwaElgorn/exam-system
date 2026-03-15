import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ExamPage from "./pages/ExamPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExamPage />
  </StrictMode>
);