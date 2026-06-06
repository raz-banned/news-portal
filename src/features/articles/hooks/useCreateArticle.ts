import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
import { toast } from "sonner"

interface ArticlePayload {
  title: string
  content: string
}

export function useCreateArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: ArticlePayload) => {
      const { data } = await api.post("/articles", payload)
      return data
    },
    onSuccess: () => {
      toast.success("Статья успешно создана.")
      queryClient.invalidateQueries({ queryKey: ["articles"] })
    },
    onError: (error) => {
      toast.error(`Не удалось создать статью. ${error.message}`)
    },
  })
}
