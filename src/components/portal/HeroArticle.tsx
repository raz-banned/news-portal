import { Eye } from "lucide-react"
import { Link } from "react-router"
import type { Article } from "@/features/articles/types"
import { formatDateTime } from "@/lib/utils"
import { Badge } from "../ui/badge"

interface HeroArticleProps {
  article: Article
}

export function HeroArticle({ article }: HeroArticleProps) {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group relative flex aspect-video w-full items-center overflow-hidden rounded"
    >
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 px-3.5 pt-4 pb-3.5">
        <Badge className="mb-1.5 inline-block rounded-sm bg-portal-red px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
          Главное
        </Badge>

        <h2 className="text-[15px] leading-snug font-semibold text-white transition-opacity group-hover:opacity-90">
          {article.title}
        </h2>

        <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-white/60">
          <span>{formatDateTime(article.created_at)}</span>
          <span>·</span>
          <Eye className="size-2.5" aria-hidden="true" />
          <span>{article.views.toLocaleString()}</span>
        </p>
      </div>
    </Link>
  )
}
