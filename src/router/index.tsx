import { createBrowserRouter } from "react-router"
import Layout from "@/components/layout/Layout"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { HomePage } from "@/pages/HomePage"
import { ArticlePage } from "@/pages/ArticlePage"
import { ArticlesPage } from "@/pages/ArticlesPage"
import { LoginPage } from "@/pages/LoginPage"
import { AdminArticlesPage } from "@/pages/admin/AdminArticlesPage"
import { AdminFormPage } from "@/pages/admin/AdminFormPage"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/articles", element: <ArticlesPage /> },
      { path: "/articles/:id", element: <ArticlePage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <AdminArticlesPage /> },
          { path: "/admin/articles/new", element: <AdminFormPage /> },
          {
            path: "/admin/articles/:id/edit",
            element: <AdminFormPage />,
          },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
])
