import { DefaultLayout } from "app/components"
import { 
  CasesPage, NotFoundPage, SearchPage, TasksPage 
} from "app/pages"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "zoeken",
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
  }
])

export default router

