import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import type { Article } from "../types"

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await api.get<Article[]>("/articles")
      return data
    },
  })
}
