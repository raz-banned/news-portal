import { Link } from "react-router"
import type { Article } from "@/features/articles/types"
import { formatDate, formatTime } from "@/lib/utils"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group block overflow-hidden rounded bg-white"
    >
      <div className={`h-22.5`}>
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>
      <div className="p-2">
        <p className="mb-1 text-[10px] font-semibold tracking-wide text-portal-red uppercase">
          {article.category}
        </p>
        <h3 className="line-clamp-3 text-xs leading-[1.4] font-semibold text-gray-900 transition-colors group-hover:text-portal-red">
          {article.title}
        </h3>
        <div className="mt-1.5 flex gap-2 text-[10px] text-gray-400">
          <span>{formatDate(article.created_at)}</span>
          <span>{formatTime(article.created_at)}</span>
        </div>
      </div>
    </Link>
  )
}
