import { cn } from "@/lib/utils"
import type { SetURLSearchParams } from "react-router"

const CATEGORIES = [
  { id: "home", label: "Главная" },
  { id: "kz", label: "Казахстан" },
  { id: "world", label: "Мир" },
  { id: "economy", label: "Экономика" },
  { id: "sport", label: "Спорт" },
  { id: "culture", label: "Культура" },
  { id: "tech", label: "Технологии" },
] as const

export function CategoryNav({
  searchParams,
  onCategoryChange,
}: {
  searchParams: URLSearchParams
  onCategoryChange: SetURLSearchParams
}) {
  return (
    <nav className="flex items-center border-b-2 border-portal-red bg-white px-4">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() =>
            onCategoryChange((prev) => {
              if (cat.id === "home") {
                prev.delete("category")
                return prev
              }
              prev.set("category", cat.id)
              return prev
            })
          }
          className={cn(
            "-mb-0.5 border-b-2 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors",
            searchParams.get("category") === cat.id
              ? "border-portal-red text-portal-red"
              : "border-transparent text-gray-700 hover:text-portal-red"
          )}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  )
}
