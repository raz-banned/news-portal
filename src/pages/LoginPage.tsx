import { isAxiosError } from "axios"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { useLogin } from "@/features/auth/hooks/useLogin"
import { useAuth } from "@/hooks/useAuth"
import { getErrorMessage } from "@/lib/getErrorMessage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// getErrorMessage возвращает "Пользователь не авторизован." на 401 —
// для формы логина это неинформативно, нужно конкретное сообщение
function getLoginError(error: unknown): string {
  if (isAxiosError(error) && error.response?.status === 401) {
    return "Неверный логин или пароль."
  }
  return getErrorMessage(error)
}

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // ProtectedRoute передаёт state={{ from: location }} при редиректе
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { mutate, isPending, isError, error } = useLogin()

  // Уже залогинен — сразу уходим
  if (isAuthenticated) return <Navigate to={from} replace />

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutate(
      { username, password },
      { onSuccess: () => navigate(from, { replace: true }) }
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-portal-navy px-4 py-12">
      <div className="w-full max-w-85">
        {/* Лого */}
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold tracking-tight text-white [-webkit-font-smoothing:antialiased]">
            News<em className="text-[#f5a623] not-italic">Portal</em>.kz
          </p>
          <p className="mt-1 text-[11px] tracking-widest text-portal-navy-text uppercase">
            Редакционная панель
          </p>
        </div>

        {/* Карточка */}
        <div className="overflow-hidden rounded-lg bg-white shadow-2xl">
          <div className="h-0.5 bg-portal-red" />
          <div className="px-6 pt-6 pb-7">
            <h1 className="mb-5 text-sm font-semibold text-portal-navy">
              Вход в систему
            </h1>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="username"
                  className="text-[11px] font-medium tracking-wide text-gray-500 uppercase"
                >
                  Пользователь
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-[11px] font-medium tracking-wide text-gray-500 uppercase"
                >
                  Пароль
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Скрыть пароль" : "Показать пароль"
                    }
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {isError && (
                <div className="rounded bg-red-50 px-3 py-2 text-[11px] text-portal-red">
                  {getLoginError(error)}
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending || !username || !password}
                className="mt-1 h-9 w-full bg-portal-red text-white hover:bg-portal-red/90"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Входим…
                  </>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>
          </div>
        </div>

        <Link
          to="/"
          className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-portal-navy-text transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3.5" />
          Вернуться на сайт
        </Link>
      </div>
    </div>
  )
}
