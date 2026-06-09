import { useState } from "react"
import { Link } from "react-router"
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react"
import { useArticles } from "@/features/articles/hooks/useArticles"
import { useDeleteArticle } from "@/features/articles/hooks/useDeleteArticle"
import { QueryError } from "@/components/QueryError"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { formatDateTime } from "@/lib/utils"

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <Skeleton className="h-2.5 w-40" />
      </div>
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-2.5 w-6 shrink-0" />
            <Skeleton className="h-2.5 flex-1" />
            <Skeleton className="h-2.5 w-32 shrink-0" />
            <Skeleton className="h-6 w-24 shrink-0 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminArticlesPage() {
  const { data, isLoading, isError, error, refetch } = useArticles()
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle()
  const [confirmId, setConfirmId] = useState<number | null>(null)

  function handleDelete(id: number) {
    deleteArticle(id, {
      onSuccess: () => setConfirmId(null),
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-portal-navy">Статьи</h1>
          {data && (
            <p className="mt-0.5 text-[11px] text-gray-400">
              {data.length} материалов
            </p>
          )}
        </div>
        <Button
          asChild
          size="sm"
          className="gap-1.5 bg-portal-red text-white hover:bg-portal-red/90"
        >
          <Link to="/admin/articles/new">
            <Plus className="size-3.5" />
            Создать статью
          </Link>
        </Button>
      </div>

      {isLoading && <TableSkeleton />}
      {isError && <QueryError error={error} onRetry={refetch} />}

      {data &&
        (data.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-400">
            Статей пока нет
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-medium tracking-wide text-gray-400 uppercase">
                  <th className="px-4 py-2.5 text-left">ID</th>
                  <th className="px-4 py-2.5 text-left">Заголовок</th>
                  <th className="px-4 py-2.5 text-left">Дата</th>
                  <th className="px-4 py-2.5 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((article) => (
                  <tr
                    key={article.id}
                    className="group bg-white transition-colors hover:bg-gray-50/60"
                  >
                    <td className="px-4 py-3 text-gray-400">{article.id}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="line-clamp-1 font-medium text-gray-800">
                          {article.title}
                        </span>
                        <a
                          href={`/articles/${article.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Открыть на сайте"
                          className="shrink-0 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-portal-red"
                        >
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {formatDateTime(article.created_at)}
                    </td>

                    <td className="px-4 py-3">
                      {confirmId === article.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[11px] text-gray-500">
                            Удалить?
                          </span>
                          <Button
                            size="xs"
                            disabled={isDeleting}
                            onClick={() => handleDelete(article.id)}
                            className="h-6 bg-portal-red px-2.5 text-white hover:bg-portal-red/90"
                          >
                            Да
                          </Button>
                          <Button
                            size="xs"
                            variant="outline"
                            disabled={isDeleting}
                            onClick={() => setConfirmId(null)}
                            className="h-6 px-2.5"
                          >
                            Нет
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="xs"
                            variant="ghost"
                            asChild
                            className="gap-1 text-gray-500 hover:text-portal-navy"
                          >
                            <Link to={`/admin/articles/${article.id}/edit`}>
                              <Pencil className="size-3" />
                              Изменить
                            </Link>
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={() => setConfirmId(article.id)}
                            className="gap-1 text-gray-400 hover:bg-red-50 hover:text-portal-red"
                          >
                            <Trash2 className="size-3" />
                            Удалить
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  )
}
