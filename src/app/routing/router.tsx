import { DefaultLayout } from "app/components"
import { 
  CasesPage, NotFoundPage, SearchPage, TasksPage, AuthPage 
} from "app/pages"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <SearchPage />
      },
      {
        path: "zaken",
        element: <CasesPage />
      },
      {
        path: "zaken/:zaakId",
        element: <SearchPage />
      },
      {
        path: "taken",
        element: <TasksPage />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthPage />
  }
])

export default router

