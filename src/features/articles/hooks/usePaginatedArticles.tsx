import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import type { Article } from "../types"

interface UsePaginatedArticlesOptions {
  page?: string
  limit?: string
}

export function usePaginatedArticles(options: UsePaginatedArticlesOptions) {
  return useQuery({
    queryKey: ["articles", options.page ?? 1],
    queryFn: async () => {
      const { data } = await api.get<Article[]>("/articles", {
        params: {
          page: options.page ?? 1,
          limit: options.limit ?? 10,
        },
      })
      return data
    },
  })
}
