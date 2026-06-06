import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import type { Article } from "../types"

export function useArticle(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data } = await api.get<Article>(`/articles/${id}`)
      return data
    },
    enabled: options?.enabled ?? true,
  })
}
