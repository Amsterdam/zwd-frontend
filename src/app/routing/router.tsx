import { DefaultLayout } from "app/components"
import { 
  AuthPage, AddressPage, CaseCreatePage, CaseDetailsPage, CasesPage, 
  NotFoundPage, SearchPage, TasksPage, BpmnPage, SearchHoaPage
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
        path: "adres/:bagId",
        element: <AddressPage />
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
        element: <SearchHoaPage />
      },
      {
        path: "vve/:hoaId/zaken/nieuw",
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

