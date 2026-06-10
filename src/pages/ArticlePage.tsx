import { Link, useParams } from "react-router"
import { ArrowLeft, Calendar, Eye } from "lucide-react"
import { useArticle } from "@/features/articles/hooks/useArticle"
import { useArticles } from "@/features/articles/hooks/useArticles"
import { TopNewsSidebar } from "@/components/portal/TopNewsSidebar"
import { ArticleCard } from "@/components/portal/ArticleCard"
import { QueryError } from "@/components/QueryError"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDateTime } from "@/lib/utils"

function ArticleSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_220px] md:items-start">
      <div className="flex flex-col gap-3.5">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-5/6" />
        <Skeleton className="h-7 w-3/5" />
        <Skeleton className="h-3 w-52" />
        <Skeleton className="aspect-video w-full rounded" />
        <div className="flex flex-col gap-2.5 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-3 ${i === 5 ? "w-2/3" : "w-full"}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col overflow-hidden rounded">
        <Skeleton className="h-9 rounded-none" />
        <div className="flex flex-col gap-px bg-gray-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-none" />
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

  // Сначала статьи той же категории, остальные добиваем из других
  const related = [
    ...(allArticles ?? []).filter(
      (a) => a.id !== article.id && a.category === article.category
    ),
    ...(allArticles ?? []).filter(
      (a) => a.id !== article.id && a.category !== article.category
    ),
  ].slice(0, 3)

  const paragraphs = article.content.split("\n").filter(Boolean)

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_220px] md:items-start">
      <article className="min-w-0">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-[11px] text-gray-400">
          <Link
            to="/"
            className="flex items-center gap-1 transition-colors hover:text-portal-red"
          >
            <ArrowLeft className="size-3" />
            Главная
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            to="/articles"
            className="transition-colors hover:text-portal-red"
          >
            {article.category}
          </Link>
        </nav>

        {/* Category + Title */}
        <span className="mb-3 inline-block rounded-sm bg-portal-red px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
          {article.category}
        </span>

        <h1 className="mb-4 text-[22px] leading-[1.3] font-bold text-portal-navy">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="mb-5 flex items-center gap-4 border-b border-gray-100 pb-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3" aria-hidden="true" />
            {formatDateTime(article.created_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="size-3" aria-hidden="true" />
            {article.views.toLocaleString()} просмотров
          </span>
        </div>

        {/* Image */}
        <div className="mb-6 aspect-video w-full overflow-hidden rounded bg-gray-100">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-gray-200 to-gray-300" />
          )}
        </div>

        {/* Content */}
        <div className="text-[13.5px] leading-[1.75] text-gray-800">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`mb-4 last:mb-0 ${
                i === 0
                  ? "text-[15px] leading-[1.65] font-[450] text-gray-900"
                  : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="mb-3 flex items-center gap-2.5">
              <h2 className="text-[13px] font-bold tracking-wide text-portal-navy uppercase">
                Читайте также
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        )}
      </article>

      <aside className="sticky top-3 hidden md:block">
        <TopNewsSidebar articles={sidebarArticles} />
      </aside>
    </div>
  )
}
