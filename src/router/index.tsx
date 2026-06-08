import { createBrowserRouter } from "react-router"
import Layout from "@/components/layout/Layout"
import { HomePage } from "@/pages/HomePage"
import { ArticlePage } from "@/pages/ArticlePage"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/articles/:id", element: <ArticlePage /> },
    ],
  },
])
