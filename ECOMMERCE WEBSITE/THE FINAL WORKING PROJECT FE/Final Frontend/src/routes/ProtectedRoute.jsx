import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/token";

export default function ProtectedRoute() {
  // 🔴 IF NOT LOGGED IN → BLOCK ACCESS
  if (!isLoggedIn()) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 🟢 IF LOGGED IN → ALLOW PAGE
  return <Outlet />;
}
