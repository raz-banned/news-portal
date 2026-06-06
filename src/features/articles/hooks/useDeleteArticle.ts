import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
import { toast } from "sonner"

export function useDeleteArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/articles/${id}`)
      return data
    },
    onSuccess: () => {
      toast.success("Статья успешно удалена.")
      queryClient.invalidateQueries({ queryKey: ["articles"] })
    },
    onError: (error) => {
      toast.error(`Не удалось удалить статью. ${error.message}`)
    },
  })
}
