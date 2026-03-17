import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExamPage from "../../pages/ExamPage";

interface AppRouterProps { userId: string; }

export default function AppRouter({ userId }: AppRouterProps) {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/exam" element={<ExamPage userId={userId} />} />
        <Route path="*" element={<Navigate to="/exam" replace />} />
      </Routes>
    </BrowserRouter>
  );
}