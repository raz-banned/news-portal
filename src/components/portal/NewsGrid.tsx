import type { Article } from "@/features/articles/types"

export function NewsGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {articles.map((article) => (
        <div key={article.id} className="flex flex-col gap-2">
          <div className="h-[160px] rounded bg-gray-200" />
          <p className="text-sm font-medium text-gray-900">{article.title}</p>
        </div>
      ))}
    </div>
  )
}
