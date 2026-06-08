import { useState } from "react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "home", label: "Главная" },
  { id: "kz", label: "Казахстан" },
  { id: "world", label: "Мир" },
  { id: "economy", label: "Экономика" },
  { id: "sport", label: "Спорт" },
  { id: "culture", label: "Культура" },
  { id: "tech", label: "Технологии" },
] as const

type CategoryId = (typeof CATEGORIES)[number]["id"]

// Пока состояние локальное. Когда добавятся роуты по категориям —
// заменить на NavLink из react-router с useParams.
export function CategoryNav() {
  const [active, setActive] = useState<CategoryId>("home")

  return (
    <nav className="flex items-center border-b-2 border-portal-red bg-white px-4">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActive(cat.id)}
          className={cn(
            "-mb-0.5 border-b-2 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors",
            active === cat.id
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
