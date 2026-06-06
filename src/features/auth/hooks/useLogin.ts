import { useMutation } from "@tanstack/react-query"
import api from "@/lib/api"
import type { AuthResponse, LoginPayload } from "../types"
import { useAuth } from "@/hooks/useAuth"

export function useLogin() {
  const { login } = useAuth()

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<AuthResponse>("/auth/login", payload)
      return data
    },
    onSuccess: (data) => login(data.token, data.username),
  })
}
