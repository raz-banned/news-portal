import { useInfiniteQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import type { Article } from "../types"

interface UseInfiniteArticlesResponse {
  articles: Article[]
  nextCursor: number | null
}

export function useInfiniteArticles(limit?: number) {
  return useInfiniteQuery({
    queryKey: ["articles", "infinite", limit || 12],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get<UseInfiniteArticlesResponse>("/articles", {
        params: {
          cursor: pageParam,
          limit: limit || 12,
        },
      })
      return data
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}
