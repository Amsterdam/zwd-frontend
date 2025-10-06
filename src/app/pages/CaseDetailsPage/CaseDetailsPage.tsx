import { useMemo } from "react"
import { useParams } from "react-router-dom"
import {
  FolderIcon,
  DocumentsIcon,
  DocumentCheckMarkIcon,
} from "@amsterdam/design-system-react-icons"
import { Icon, Row, Tabs } from "@amsterdam/design-system-react"
import { useCase } from "app/state/rest"
import { PageHeading, PageSpinner, DetailsList, PageGrid } from "app/components"
import { useURLState } from "app/hooks"
import Workflows from "./Workflows/Workflows"
import CaseEvents from "./CaseEvents/CaseEvents"
import Documents from "./Documents"
import Communication from "./Communication"
import AddSubtask from "./AddSubtask/AddSubtask"
import DownloadPdf from "./DownloadPdf/DownloadPdf"
import createDataDetailsList from "./utils/createDataDetailsList"

const TabHeader: React.FC<{ svg: React.FC; label: string }> = ({
  svg,
  label
}) => (
  <div style={{ display: "flex", gap: "0.5rem" }}>
    <Icon svg={svg} />
    {label}
  </div>
)

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
          <Tabs.Button aria-controls="taken">
            <TabHeader svg={DocumentCheckMarkIcon} label="Open taken" />
          </Tabs.Button>
          <Tabs.Button aria-controls="documenten">
            <TabHeader svg={DocumentsIcon} label="Documenten" />
          </Tabs.Button>
          <Tabs.Button aria-controls="communicatie">
            <TabHeader svg={MegaphoneIcon} label="Communicatie" />
          </Tabs.Button>
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
        <Tabs.Panel id="communicatie">
          <Communication />
        </Tabs.Panel>
      </Tabs>
    </PageGrid>
  )
}

export default CaseDetailsPage
