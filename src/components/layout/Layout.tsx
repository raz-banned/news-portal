import { Outlet } from "react-router"
import { TopBar } from "@/components/portal/TopBar"
import { PortalHeader } from "../portal/PortalHeader"

export default function Layout() {
  return (
    <div className="min-h-screen bg-portal-page">
      <header>
        <TopBar />
        <PortalHeader />
      </header>
      <main className="mx-auto max-w-5xl px-4 py-3">
        <Outlet />
      </main>
    </div>
  )
}
