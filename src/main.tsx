import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryProvider } from "./app/providers/QueryProvider";
import AppRouter from "./app/router/AppRouter";
import { useInitAuth } from "./features/auth/hooks/useInitAuth";

function AuthInitializer() {
  const { userId, isReady, isError, error } = useInitAuth();

  if (!isReady)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center text-gray-500 text-base">
        <div className="spinner" />
        <p>جاري تحميل...</p>
      </div>
    );

  if (isError || !userId)
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4 text-center text-red-500 text-base"
        role="alert"
      >
        <p>فشل تسجيل الدخول</p>
        {error && (
          <p className="text-xs text-gray-500 max-w-sm">{error.message}</p>
        )}
      </div>
    );

  return <AppRouter userId={userId} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthInitializer />
    </QueryProvider>
  </StrictMode>,
);
