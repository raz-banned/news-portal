import { isAxiosError } from "axios"

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Сетевая ошибка — нет соединения
    if (
      error.message === "Failed to fetch" ||
      error.message.includes("Network")
    ) {
      return "Нет соединения с сервером. Проверьте интернет."
    }
  }

  // HTTP-статусы — если используешь axios или сам бросаешь
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return "Материалы не найдены."
    if (status === 401) return "Пользователь не авторизован."
    if (status === 403) return "Нет доступа."
    if (status !== undefined && status >= 500)
      return "Ошибка на сервере. Попробуйте позже."
  }

  return "Что-то пошло не так."
}
