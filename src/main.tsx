import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryProvider } from "./app/providers/QueryProvider";
import AppRouter from "./app/router/AppRouter";
import { useInitAuth } from "./features/auth/hooks/useInitAuth";

function AuthInitializer() {
  const { userId, isReady, isError, error } = useInitAuth();

  if (!isReady) return (
    <div className="exam-state exam-state--loading">
      <div className="exam-state__spinner" />
      <p>جاري تحميل...</p>
    </div>
  );

  if (isError || !userId) return (
    <div className="exam-state exam-state--error" role="alert">
      <p>فشل تسجيل الدخول</p>
      {error && <p className="exam-state__detail">{error.message}</p>}
    </div>
  );

  return <AppRouter userId={userId} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthInitializer />
    </QueryProvider>
  </StrictMode>
);
