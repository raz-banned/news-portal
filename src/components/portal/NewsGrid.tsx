import { Link } from "react-router"
import type { Article } from "@/features/articles/types"
import { ArticleCard } from "./ArticleCard"

interface NewsGridProps {
  articles: Article[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (!articles.length) return null

  return (
    <section>
      <div className="mb-2 flex items-center gap-2.5">
        <h2 className="text-[13px] font-bold tracking-wide text-portal-navy uppercase">
          Последние новости
        </h2>
        <div className="h-px flex-1 bg-gray-200" />
        <Link
          to="/articles"
          className="text-[11px] font-semibold text-portal-red hover:underline"
        >
          Все →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
