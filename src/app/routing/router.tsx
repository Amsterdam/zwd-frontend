import { DefaultLayout } from "app/components"
import { 
  AuthPage, CaseCreatePage, CaseDetailsPage, CasesPage, 
  NotFoundPage, SearchPage, TasksPage, BpmnPage, SearchVvePage  
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
        path: "bpmn",
        element: <BpmnPage />
      },
      {
        path: "taken",
        element: <TasksPage />
      },
      {
        path: "vve",
        element: <SearchVvePage />
      },
      {
        path: "vve/:vveId/zaken/nieuw",
        element: <CaseCreatePage />
      },
      {
        path: "zaken",
        element: <CasesPage />
      },
      {
        path: "zaken/:caseId",
        element: <CaseDetailsPage />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthPage />
  }
])

export default router

