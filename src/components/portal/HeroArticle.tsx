import { Eye } from "lucide-react"
import type { Article } from "@/features/articles/types"
import { formatDateTime } from "@/lib/utils"

interface HeroArticleProps {
  article: Article
}

// Плейсхолдер градиента. Заменить на <img> когда появится поле image_url в API.
const IMAGE_PLACEHOLDER =
  "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800"

export function HeroArticle({ article }: HeroArticleProps) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded">
      <div className={`h-50 w-full ${IMAGE_PLACEHOLDER}`} />

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-3.5 pt-12 pb-3.5">
        {/* category — поля нет в API, пока статично */}
        <span className="mb-1.5 inline-block rounded-sm bg-portal-red px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
          Главное
        </span>

        <h2 className="text-[15px] leading-snug font-semibold text-white transition-opacity group-hover:opacity-90">
          {article.title}
        </h2>

        <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-white/60">
          <span>{formatDateTime(article.created_at)}</span>
          <span>·</span>
          <Eye className="size-2.5" aria-hidden="true" />
          {/* views — поля нет в API, убрать когда появится */}
          <span>12 450</span>
        </p>
      </div>
    </div>
  )
}
