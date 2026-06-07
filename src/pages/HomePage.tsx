import { HeroArticle } from "@/components/portal/HeroArticle"
import { useArticles } from "@/features/articles/hooks/useArticles"

export function HomePage() {
  return (
    <HeroArticle
      article={{
        id: 1,
        title: "Sample Article",
        content: "Sample content",
        created_at: new Date().toDateString(),
        author_id: 1,
      }}
    />
  )
}
