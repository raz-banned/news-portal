import { Link } from "react-router"
import { useAuth } from "@/hooks/useAuth"

export function PortalFooter() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex h-16 items-center justify-center gap-3 bg-portal-navy">
      <p className="text-sm text-muted-foreground">
        © 2026 NewsPortal.kz — Все права защищены
      </p>
      <span className="text-[#2a4a6a]">·</span>
      <Link
        to={isAuthenticated ? "/admin" : "/login"}
        className="text-[11px] text-[#2a4a6a] transition-colors hover:text-portal-navy-text"
      >
        {isAuthenticated ? "Панель управления" : "Войти"}
      </Link>
    </div>
  )
}
