import { useCallback, useState, type SubmitEvent } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useArticle } from "@/features/articles/hooks/useArticle"
import { useCreateArticle } from "@/features/articles/hooks/useCreateArticle"
import { useUpdateArticle } from "@/features/articles/hooks/useUpdateArticle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { QueryError } from "@/components/QueryError"
import { cn } from "@/lib/utils"
import type { Article } from "@/features/articles/types"

interface FormErrors {
  title?: string
  content?: string
}

interface ArticleFormPageProps {
  article?: Article
  onSubmit: (data: { title: string; content: string }) => void
  isSubmitting: boolean
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-20" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  )
}

function ArticleForm({
  article,
  onSubmit,
  isSubmitting,
}: ArticleFormPageProps) {
  const navigate = useNavigate()

  const [editTitle, setEditTitle] = useState(article?.title ?? "")
  const [editContent, setEditContent] = useState(article?.content ?? "")
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): boolean {
    const next: FormErrors = {}
    if (!editTitle.trim()) next.title = "Заголовок обязателен"
    if (!editContent.trim()) next.content = "Содержание обязательно"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    const payload = { title: editTitle.trim(), content: editContent.trim() }

    onSubmit(payload)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
        <Link
          to="/admin"
          className="flex items-center gap-1 transition-colors hover:text-portal-navy"
        >
          <ArrowLeft className="size-3" />
          Статьи
        </Link>
        <span className="text-gray-200">/</span>
        <span className="text-gray-500">
          {article ? "Редактировать" : "Новая статья"}
        </span>
      </div>

      <h1 className="text-sm font-semibold text-portal-navy">
        {article ? `Редактировать статью #${article?.id}` : "Новая статья"}
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="title"
              className="text-[11px] font-medium tracking-wide text-gray-500 uppercase"
            >
              Заголовок
            </label>
            <Input
              id="title"
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value)
                if (errors.title) setErrors((p) => ({ ...p, title: undefined }))
              }}
              placeholder="Введите заголовок статьи"
              aria-invalid={!!errors.title}
              autoFocus={!article}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-[11px] text-portal-red">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="content"
              className="text-[11px] font-medium tracking-wide text-gray-500 uppercase"
            >
              Содержание
            </label>
            <textarea
              id="content"
              value={editContent}
              onChange={(e) => {
                setEditContent(e.target.value)
                if (errors.content)
                  setErrors((p) => ({ ...p, content: undefined }))
              }}
              placeholder="Введите текст статьи..."
              rows={16}
              className={cn(
                "w-full min-w-0 resize-y rounded-lg border bg-transparent px-2.5 py-2 text-sm leading-relaxed text-foreground transition-colors outline-none placeholder:text-muted-foreground",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                errors.content
                  ? "border-destructive ring-3 ring-destructive/20"
                  : "border-input"
              )}
              disabled={isSubmitting}
            />
            {errors.content && (
              <p className="text-[11px] text-portal-red">{errors.content}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin")}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="gap-1.5 bg-portal-red text-white hover:bg-portal-red/90"
            >
              {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
              {article ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

function ArticleEdit({ id }: { id: string }) {
  const navigate = useNavigate()
  const {
    data: article,
    isPending: isArticlePending,
    isError: isArticleError,
    error: articleError,
  } = useArticle(id)
  const { mutate: update, isPending: isUpdating } = useUpdateArticle()

  const handleSubmit = useCallback(
    () => (data: { title: string; content: string }) => {
      update(
        { id: Number(id), ...data },
        {
          onSuccess: () => {
            navigate("/admin")
          },
        }
      )
    },
    [id, update, navigate]
  )

  if (isArticlePending) return <FormSkeleton />
  if (isArticleError) return <QueryError error={articleError} />
  return (
    <ArticleForm
      article={article}
      onSubmit={handleSubmit}
      isSubmitting={isUpdating}
    />
  )
}

function ArticleCreate() {
  const navigate = useNavigate()
  const { mutate: create, isPending: isCreating } = useCreateArticle()

  const handleSubmit = useCallback(
    () => (data: { title: string; content: string }) => {
      create(data, {
        onSuccess: () => {
          navigate("/admin")
        },
      })
    },
    [create, navigate]
  )

  return <ArticleForm onSubmit={handleSubmit} isSubmitting={isCreating} />
}

export function AdminFormPage() {
  const { id } = useParams<{ id: string }>()

  return id ? <ArticleEdit id={id} /> : <ArticleCreate />
}
