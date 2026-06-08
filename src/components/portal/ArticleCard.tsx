import { Link } from "react-router"
import type { Article } from "@/features/articles/types"
import { formatDate, formatTime } from "@/lib/utils"

interface ArticleCardProps {
  article: Article
}

// Плейсхолдеры пока нет поля image_url и category в API.
const CARD_VARIANTS = [
  { bg: "bg-[#d8e4ef]", category: "Казахстан" },
  { bg: "bg-[#dde8d4]", category: "Экономика" },
  { bg: "bg-[#f0e8d0]", category: "Спорт" },
  { bg: "bg-[#e4d8ef]", category: "Технологии" },
  { bg: "bg-[#d8eee4]", category: "Общество" },
  { bg: "bg-[#efd8d8]", category: "Мир" },
] as const

export function ArticleCard({ article }: ArticleCardProps) {
  const variant = CARD_VARIANTS[article.id % CARD_VARIANTS.length]

  return (
    <Link
      to={`/articles/${article.id}`}
      className="group block overflow-hidden rounded bg-white"
    >
      <div className={`h-22.5 ${variant.bg}`} />
      <div className="p-2">
        <p className="mb-1 text-[10px] font-semibold tracking-wide text-portal-red uppercase">
          {variant.category}
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
