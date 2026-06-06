import { Outlet } from "react-router"
import { Header } from "./Header"

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Outlet />
    </div>
  )
}
