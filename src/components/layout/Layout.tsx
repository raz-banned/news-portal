import { Outlet } from "react-router"
import { TopBar } from "@/components/portal/TopBar"
import { PortalHeader } from "../portal/PortalHeader"
import { CategoryNav } from "../portal/CategoryNav"
import { BreakingTicker } from "../portal/BreakingTicker"

export default function Layout() {
  return (
    <div className="min-h-screen bg-portal-page">
      <header>
        <TopBar />
        <PortalHeader />
        <CategoryNav />
        <BreakingTicker />
      </header>
      <main className="mx-auto max-w-5xl px-4 py-3">
        <Outlet />
      </main>
    </div>
  )
}
