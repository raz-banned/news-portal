import { HeroArticle } from "@/components/portal/HeroArticle"
import { TopNewsSidebar } from "@/components/portal/TopNewsSidebar"

export function HomePage() {
  const articles = [
    {
      id: 1,
      title: "Sample Article",
      content: "Sample content",
      created_at: new Date().toDateString(),
      author_id: 1,
    },
    {
      id: 2,
      title: "Sample Article 2",
      content: "Sample content 2",
      created_at: new Date().toDateString(),
      author_id: 1,
    },
  ]

  return (
    <>
      <HeroArticle
        article={{
          id: 1,
          title: "Sample Article",
          content: "Sample content",
          created_at: new Date().toDateString(),
          author_id: 1,
        }}
      />
      <TopNewsSidebar articles={articles} />
    </>
  )
}
