import { useArticles } from "@/features/articles/hooks/useArticles"
import { HeroArticle } from "@/components/portal/HeroArticle"
import { TopNewsSidebar } from "@/components/portal/TopNewsSidebar"
import { NewsGrid } from "@/components/portal/NewsGrid"
import { QueryError } from "@/components/QueryError"
import { Skeleton } from "@/components/ui/skeleton"

function PageSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_220px] gap-2.5">
        <Skeleton className="h-50 rounded" />
        <div className="flex flex-col overflow-hidden rounded">
          <Skeleton className="h-9 rounded-none" />
          <div className="flex flex-col gap-px bg-gray-200">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14.5 rounded-none" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-12 rounded" />
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded" />
        ))}
      </div>
    </div>
  )
}

function AdStrip() {
  return (
    <div className="flex h-12 items-center justify-center rounded border border-dashed border-gray-300 bg-gray-100 text-[11px] tracking-wide text-gray-300">
      РЕКЛАМА
    </div>
  )
}

export function HomePage() {
  const { data, isLoading, isError, error, refetch } = useArticles()

  if (isLoading) return <PageSkeleton />

  if (isError) return <QueryError error={error} onRetry={refetch} />

  const hero = data?.[0]

  if (!hero) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Нет статей
      </p>
    )
  }

  const rest = data.slice(1, 10)

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_220px] place-items-center gap-2.5">
        <HeroArticle article={hero} />
        <TopNewsSidebar articles={rest} />
      </div>

      <AdStrip />

      <NewsGrid articles={rest} />
    </div>
  )
}
