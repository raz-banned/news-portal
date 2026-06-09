export interface Article {
  id: number
  title: string
  content: string
  author_id: number
  category: string
  image_url: string | null
  views: number
  created_at: string
}
