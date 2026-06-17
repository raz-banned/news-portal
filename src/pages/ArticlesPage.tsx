import { ArticleCard } from "@/components/portal/ArticleCard"
import { QueryError } from "@/components/QueryError"
import { Skeleton } from "@/components/ui/skeleton"
import { useInfiniteArticles } from "@/features/articles/hooks/useInfiniteArticles"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton key={i} className="h-40 rounded" />
      ))}
    </div>
  )
}

export function ArticlesPage() {
  const {
    data,
    isPending,
    isFetchingNextPage,
    isError,
    hasNextPage,
    error,
    fetchNextPage,
    refetch,
  } = useInfiniteArticles()
  const { ref, inView } = useInView({ threshold: 0.5 })

  const articles = data?.pages.flatMap((page) => page.articles) || []

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const render = () => {
    if (isPending) return <GridSkeleton />
    if (isError) return <QueryError error={error} onRetry={refetch} />
    if (data && articles.length === 0) {
      return (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Нет статей
        </p>
      )
    }

    return (
      <>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div ref={ref} className="h-4 opacity-0" />
      </>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <h1 className="text-[13px] font-bold tracking-wide text-portal-navy uppercase">
          Все новости
        </h1>
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-[11px] text-gray-400">
          {articles.length}
          материалов
        </span>
      </div>

      {render()}
    </div>
  )
}
