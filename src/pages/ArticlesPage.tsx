import { useArticles } from "@/features/articles/hooks/useArticles"
import { ArticleCard } from "@/components/portal/ArticleCard"
import { QueryError } from "@/components/QueryError"
import { Skeleton } from "@/components/ui/skeleton"

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
  const { data, isLoading, isError, error, refetch } = useArticles()

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

      {isLoading && <GridSkeleton />}

      {isError && <QueryError error={error} onRetry={refetch} />}

      {data &&
        (data.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Нет статей
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {data.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ))}
    </div>
  )
}
