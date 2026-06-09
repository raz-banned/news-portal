import { Link, NavLink, Outlet, useNavigate } from "react-router"
import { LogOut, Newspaper } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

export function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-12 max-w-6xl items-center gap-5 px-5">
          <Link
            to="/"
            className="shrink-0 text-sm font-bold text-portal-navy [-webkit-font-smoothing:antialiased]"
          >
            News<em className="text-[#f5a623] not-italic">Portal</em>.kz
          </Link>

          <span className="text-gray-200">|</span>

          <span className="text-[11px] font-medium tracking-widest text-gray-400 uppercase">
            Панель управления
          </span>

          <nav className="flex flex-1 items-center gap-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-portal-navy/5 text-portal-navy"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`
              }
            >
              <Newspaper className="size-3.5" />
              Статьи
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">{user?.username}</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleLogout}
              className="gap-1.5 text-gray-500 hover:bg-red-50 hover:text-portal-red"
            >
              <LogOut className="size-3.5" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-6">
        <Outlet />
      </main>
    </div>
  )
}
