const DEFAULT_ITEMS = [
  "Президент Казахстана провёл переговоры с иностранными делегациями",
  "Новый экономический форум пройдёт в Астане в июле",
  "Курс тенге стабилизировался на отметке 445 за доллар",
]

interface BreakingTickerProps {
  items?: string[]
}

// Для бесшовного цикла контент дублируется и анимируется на -50%.
// В index.css нужно добавить:
//   @keyframes ticker-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
export function BreakingTicker({ items = DEFAULT_ITEMS }: BreakingTickerProps) {
  const text = items.join("  ·  ")

  return (
    <div className="flex items-center overflow-hidden bg-portal-red">
      <div className="shrink-0 bg-portal-red-dark px-2.5 py-1.5 text-[11px] font-semibold tracking-wide text-white uppercase">
        Срочно
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="inline-block animate-[ticker-scroll_30s_linear_infinite] py-1.5 pl-3 text-[11px] whitespace-nowrap text-white">
          {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}
        </p>
      </div>
    </div>
  )
}
