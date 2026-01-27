import { DefaultLayout } from "app/components"
import {
  AuthPage,
  AddressPage,
  ApartmentsPage,
  CaseCreatePage,
  CaseDetailsPage,
  CasesPage,
  NotFoundPage,
  SearchPage,
  TasksPage,
  BpmnPage,
  ImportPage,
} from "app/pages"
import { HoaPage } from "app/pages/HoaPage/HoaPage"
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom"

const RedirectToSearch = () => {
  const location = useLocation()
  const searchParams = location.search
  return <Navigate to={`/zoeken${searchParams}`} replace />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <RedirectToSearch />
      },
      {
        path: "zoeken",
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
        path: "vve/:hoaId",
        element: <AddressPage />
      },
      {
        path: "vve/:hoaId/zaken/nieuw",
        element: <CaseCreatePage />
      },
      {
        path: "vve/:hoaId/woningen",
        element: <ApartmentsPage />
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
        path: "import",
        element: <ImportPage />
      },
      {
        path: "/auth",
        element: <AuthPage />
      },
      {
        path: "vve",
        element: <HoaPage />
      }
    ]
  }
])

export default router
