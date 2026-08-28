import { Routes, Route } from "react-router-dom";
import HomeLive from "@/pages/HomeLive";
import OwnerLogin from "@/pages/OwnerLogin";
import OwnerMenu from "@/pages/OwnerMenu";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/lib/auth";
import { LanguageProvider } from "@/lib/language";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeLive />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/menu" element={<ProtectedRoute><OwnerMenu /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  );
}
