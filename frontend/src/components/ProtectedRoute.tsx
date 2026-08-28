import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="admin-loading" data-testid="owner-auth-loading">Checking owner access…</div>;
  }
  if (!user) {
    return <Navigate to="/owner/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
