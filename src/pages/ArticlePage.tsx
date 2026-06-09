import { Link, useParams } from "react-router"
import { ArrowLeft, Calendar, Eye } from "lucide-react"
import { useArticle } from "@/features/articles/hooks/useArticle"
import { useArticles } from "@/features/articles/hooks/useArticles"
import { TopNewsSidebar } from "@/components/portal/TopNewsSidebar"
import { QueryError } from "@/components/QueryError"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/lib/utils"

function ArticleSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_220px] items-start gap-5">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-3.5 w-48" />
        <Skeleton className="h-52 w-full rounded" />
        <div className="flex flex-col gap-2 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3.5 w-full last:w-2/3" />
          ))}
        </div>
      </div>
      <div className="flex flex-col overflow-hidden rounded">
        <Skeleton className="h-9 rounded-none" />
        <div className="flex flex-col gap-px bg-gray-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14.5 rounded-none" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ArticlePage() {
  const { id } = useParams<{ id: string }>()

  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useArticle(id ?? "", { enabled: !!id })

  // useArticles кешируется React Query — повторный запрос не уходит
  const { data: allArticles } = useArticles()

  if (isLoading) return <ArticleSkeleton />
  if (isError) return <QueryError error={error} />
  if (!article) return null

  const sidebarArticles = (allArticles ?? []).filter((a) => a.id !== article.id)

  return (
    <div className="grid grid-cols-[1fr_220px] items-start gap-5">
      <article className="min-w-0">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1.5 text-[11px] text-gray-400 transition-colors hover:text-portal-red"
        >
          <ArrowLeft className="size-3.5" />
          На главную
        </Link>

        <Badge className="mb-2.5 block rounded-sm bg-portal-red px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
          {article.category}
        </Badge>

        <h1 className="mb-3 text-xl leading-snug font-bold text-portal-navy">
          {article.title}
        </h1>

        <div className="mb-4 flex items-center gap-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" aria-hidden="true" />
            {formatDateTime(article.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="size-3" aria-hidden="true" />
            {article.views.toLocaleString()} просмотров
          </span>
        </div>

        <div className="mb-5 h-52 w-full rounded">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="text-sm leading-relaxed text-gray-800">
          {article.content
            .split("\n")
            .filter(Boolean)
            .map((paragraph, i) => (
              <p key={i} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
        </div>
      </article>

      <aside className="sticky top-3">
        <TopNewsSidebar articles={sidebarArticles} />
      </aside>
    </div>
  )
}
