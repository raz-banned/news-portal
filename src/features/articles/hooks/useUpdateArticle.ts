import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
import { toast } from "sonner"

interface UpdatePayload {
  id: number
  title: string
  content: string
}

export function useUpdateArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, title, content }: UpdatePayload) => {
      const { data } = await api.put(`/articles/${id}`, { title, content })
      return data
    },
    onSuccess: (_, { id }) => {
      toast.success("Статья успешно обновлена.")
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      queryClient.invalidateQueries({ queryKey: ["article", String(id)] })
    },
    onError: (error) => {
      toast.error(`Не удалось обновить статью. ${error.message}`)
    },
  })
}
