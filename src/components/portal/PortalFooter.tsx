import { Link } from "react-router"
import { useAuth } from "@/hooks/useAuth"

export function PortalFooter() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex h-16 flex-col items-center justify-center gap-1 bg-portal-navy px-4 md:flex-row md:gap-3">
      <p className="text-sm text-muted-foreground">
        © 2026 NewsPortal.kz — Все права защищены
      </p>
      <span className="hidden text-[#2a4a6a] md:inline">·</span>
      <Link
        to={isAuthenticated ? "/admin" : "/login"}
        className="text-[11px] text-[#2a4a6a] transition-colors hover:text-portal-navy-text"
      >
        {isAuthenticated ? "Панель управления" : "Войти"}
      </Link>
    </div>
  )
}
