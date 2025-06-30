import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { FolderIcon } from "@amsterdam/design-system-react-icons"
import { Row, Tabs } from "@amsterdam/design-system-react"
import { useCase } from "app/state/rest"
import { PageHeading, PageSpinner, DetailsList, PageGrid } from "app/components"
import { useURLState } from "app/hooks"
import Workflows from "./Workflows/Workflows"
import CaseEvents from "./CaseEvents/CaseEvents"
import Documents from "./Documents/Documents"
import AddSubtask from "./AddSubtask/AddSubtask"
import DownloadPdf from "./DownloadPdf/DownloadPdf"
import createDataDetailsList from "./utils/createDataDetailsList"

export const CaseDetailsPage: React.FC = () => {
  const { caseId } = useParams()
  const [data, { isBusy }] = useCase(Number(caseId))
  const [activeTab, setActiveTab] = useURLState("tab", "taken")
  const dataDetailsList = useMemo(() => createDataDetailsList(data), [data])

  if (isBusy) {
    return <PageSpinner />
  }

  return (
    <PageGrid>
      <PageHeading label="Zaakdetails" icon={FolderIcon} />
      <Row align="between" alignVertical="start" wrap>
        <DetailsList data={dataDetailsList} />
        <DownloadPdf caseId={Number(caseId)} />
      </Row>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Button aria-controls="taken">Open taken</Tabs.Button>
          <Tabs.Button aria-controls="documenten">Documenten</Tabs.Button>
        </Tabs.List>
        <Tabs.Panel id="taken">
          {data?.id && (
            <>
              <AddSubtask />
              <Workflows caseId={data?.id} />
              <CaseEvents caseId={data?.id} />
            </>
          )}
        </Tabs.Panel>
        <Tabs.Panel id="documenten">
          <Documents />
        </Tabs.Panel>
      </Tabs>
    </PageGrid>
  )
}

export default CaseDetailsPage
