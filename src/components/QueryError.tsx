import { getErrorMessage } from "@/lib/getErrorMessage"
import { Button } from "./ui/button"

interface QueryErrorProps {
  error: unknown
  onRetry?: () => void
}

export function QueryError({ error, onRetry }: QueryErrorProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-4 py-8 text-center">
      <p className="text-sm text-muted-foreground">{getErrorMessage(error)}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Попробовать снова
        </Button>
      )}
    </div>
  )
}
