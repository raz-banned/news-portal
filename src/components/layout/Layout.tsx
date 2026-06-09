import { Outlet, useSearchParams } from "react-router"
import { TopBar } from "@/components/portal/TopBar"
import { PortalHeader } from "../portal/PortalHeader"
import { CategoryNav } from "../portal/CategoryNav"
import { BreakingTicker } from "../portal/BreakingTicker"
import { PortalFooter } from "../portal/PortalFooter"

export default function Layout() {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className="flex min-h-screen flex-col bg-portal-page">
      <header className="w-full border-b">
        <TopBar />
        <PortalHeader searchParams={searchParams} onSearch={setSearchParams} />
        <CategoryNav
          searchParams={searchParams}
          onCategoryChange={setSearchParams}
        />
        <BreakingTicker />
      </header>
      <main className="w-full flex-1 py-3">
        <div className="mx-auto max-w-5xl px-4">
          <Outlet />
        </div>
      </main>
      <footer className="mt-8">
        <PortalFooter />
      </footer>
    </div>
  )
}
