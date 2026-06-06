import { useCallback, useMemo, useState, type ReactNode } from "react"
import { AuthContext, type AuthUser } from "./AuthContext"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const username = localStorage.getItem("username")
    return username ? { username } : null
  })

  const login = useCallback((token: string, username: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("username", username)
    setUser({ username })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: !!user }),
    [user, login, logout]
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
