import { createContext } from "react"

export interface AuthUser {
  username: string
}

interface AuthContext {
  user: AuthUser | null
  login: (token: string, username: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContext | null>(null)
