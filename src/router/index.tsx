import { createBrowserRouter } from "react-router"
import Layout from "@/components/layout/Layout"
import { HomePage } from "@/pages/HomePage"
import { ArticlePage } from "@/pages/ArticlePage"
import { ArticlesPage } from "@/pages/ArticlesPage"
import { LoginPage } from "@/pages/LoginPage"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/articles", element: <ArticlesPage /> },
      { path: "/articles/:id", element: <ArticlePage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
])
