import { Navigate, Outlet, useLocation } from "react-router"
import { useAuth } from "@/hooks/useAuth"

export function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
