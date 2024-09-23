import { DefaultLayout } from "app/components"
import { 
  AuthPage, CaseCreatePage, CaseDetailsPage, CasesPage, 
  NotFoundPage, SearchPage, TasksPage, BpmnPage  
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
        path: "zaken/:caseId",
        element: <CaseDetailsPage />
      },
      {
        path: "taken",
        element: <TasksPage />
      },
      {
        path: "bpmn",
        element: <BpmnPage />
      },
      {
        path: "vve/:vveId/zaken/nieuw",
        element: <CaseCreatePage />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthPage />
  }
])

export default router

