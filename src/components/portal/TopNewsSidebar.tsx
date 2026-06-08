import { Link } from "react-router"
import type { Article } from "@/features/articles/types"
import { formatTime } from "@/lib/utils"
import { Badge } from "../ui/badge"

interface TopNewsSidebarProps {
  articles: Article[]
}

const MAX_ITEMS = 5

export function TopNewsSidebar({ articles }: TopNewsSidebarProps) {
  const items = articles.slice(0, MAX_ITEMS)

  return (
    <div className="flex flex-col overflow-hidden rounded">
      <div className="bg-portal-navy px-2.5 py-2">
        <span className="text-[11px] font-semibold tracking-wide text-white uppercase">
          Топ новостей
        </span>
      </div>

      <div className="flex flex-col gap-px bg-gray-200">
        {items.map((article, index) => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="flex items-start gap-2 bg-white px-2.5 py-2.5 transition-colors hover:bg-gray-50"
          >
            <Badge className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-sm bg-portal-red text-[10px] font-bold text-white">
              {index + 1}
            </Badge>
            <div className="min-w-0">
              <p className="line-clamp-3 text-xs leading-[1.4] font-medium text-gray-900">
                {article.title}
              </p>
              <p className="mt-1 text-[10px] text-gray-400">
                {formatTime(article.created_at)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
