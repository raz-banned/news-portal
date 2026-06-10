import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Link, type SetURLSearchParams } from "react-router"

interface PortalHeaderProps {
  searchParams: URLSearchParams
  onSearch: SetURLSearchParams
}

export function PortalHeader({ searchParams, onSearch }: PortalHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-portal-navy px-4 py-2.5">
      <Link
        to="/"
        className="text-[19px] font-bold tracking-tight text-white [-webkit-font-smoothing:antialiased]"
      >
        News<em className="text-[#f5a623] not-italic">Portal</em>.kz
      </Link>
      <div className="flex h-7.5 w-44 overflow-hidden rounded bg-white sm:w-52">
        <Input
          type="text"
          placeholder="Поиск новостей..."
          className="min-w-0 flex-1 rounded-none bg-transparent px-2.5 text-xs text-gray-700 outline-none placeholder:text-gray-400"
          value={searchParams.get("q") || ""}
          onChange={(e) =>
            onSearch((prev) => {
              prev.set("q", e.target.value)
              return prev
            })
          }
        />
        <Button
          size="icon"
          aria-label="Поиск"
          className="hover:bg-portal-red-dar flex h-full w-8 shrink-0 items-center justify-center rounded-none bg-portal-red bg-clip-border text-white transition-colors active:translate-0!"
        >
          <Search className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
