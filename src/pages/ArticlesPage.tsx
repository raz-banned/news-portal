import { ArticleCard } from "@/components/portal/ArticleCard"
import { QueryError } from "@/components/QueryError"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "react-router"
import { usePaginatedArticles } from "@/features/articles/hooks/usePaginatedArticles"

function GridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton key={i} className="h-40 rounded" />
      ))}
    </div>
  )
}

export function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isPending, isError, error, refetch } = usePaginatedArticles({
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "12",
  })

  const render = () => {
    if (isPending) return <GridSkeleton />
    if (isError) return <QueryError error={error} onRetry={refetch} />
    if (data && data.length === 0) {
      return (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Нет статей
        </p>
      )
    }

    return (
      <>
        <div className="grid grid-cols-3 gap-2">
          {data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div>
          {data.length >= 12 && (
            <button
              onClick={() => {
                const nextPage = parseInt(searchParams.get("page") || "1") + 1
                setSearchParams((prev) => {
                  prev.set("page", String(nextPage))
                  return prev
                })
              }}
              className="mx-auto mt-4 block rounded bg-portal-red px-4 py-2 text-sm font-medium text-white hover:bg-portal-red/90"
            >
              Загрузить еще
            </button>
          )}
        </div>
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
          {data?.length ?? 0} материалов
        </span>
      </div>

      {render()}
    </div>
  )
}
