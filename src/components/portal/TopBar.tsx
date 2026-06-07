import { useState } from "react"
import { cn } from "@/lib/utils"

const LANGUAGES = [
  { code: "ru", label: "РУС" },
  { code: "kz", label: "ҚАЗ" },
  { code: "en", label: "ENG" },
] as const

type LangCode = (typeof LANGUAGES)[number]["code"]

export function TopBar() {
  const [lang, setLang] = useState<LangCode>("ru")

  const date = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <div className="flex items-center justify-between bg-portal-navy px-4 py-1.5 text-[11px] text-portal-navy-text">
      <span className="capitalize">{date} · Астана, +22°C</span>
      <div className="flex items-center">
        {LANGUAGES.map((l, i) => (
          <span key={l.code} className="flex items-center">
            {i > 0 && <span className="mx-2.5 text-[#4a6a8a]">|</span>}
            <button
              onClick={() => setLang(l.code)}
              className={cn(
                "text-[11px] font-medium transition-colors",
                lang === l.code
                  ? "text-white"
                  : "text-portal-navy-text hover:text-white/80"
              )}
            >
              {l.label}
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
