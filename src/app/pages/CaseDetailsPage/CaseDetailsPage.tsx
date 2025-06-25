import { useParams, useNavigate } from "react-router-dom"
import { FolderIcon } from "@amsterdam/design-system-react-icons"
import { Heading, Row, Tabs } from "@amsterdam/design-system-react"
import { useCase } from "app/state/rest"
import { PageHeading, PageSpinner, DetailsList, PageGrid } from "app/components"
import { useURLState } from "app/hooks"
import Workflows from "./Workflows/Workflows"
import CaseEvents from "./CaseEvents/CaseEvents"
import Documents from "./Documents/Documents"
import AddSubtask from "./AddSubtask/AddSubtask"
import DownloadPdf from "./DownloadPdf/DownloadPdf"
import { formatDate } from "app/utils/dates"
import styles from "./CaseDetailsPage.module.css"

export const CaseDetailsPage: React.FC = () => {
  const { caseId } = useParams()
  const [data, { isBusy }] = useCase(Number(caseId))
  const [activeTab, setActiveTab] = useURLState("tab", "taken")
  const navigate = useNavigate()

  if (isBusy) {
    return <PageSpinner />
  }

  const dataDetailsList = [
    { term: "Zaak ID", details: data?.prefixed_dossier_id },
    { term: "Adviestype", details: data?.advice_type },
    { term: "Status", details: data?.status }
  ]
  if (data?.end_date) {
    dataDetailsList.push({
      term: "Einddatum",
      details: formatDate(data.end_date)
    })
  }
  if (data?.legacy_id && data.legacy_id !== "") {
    dataDetailsList.push({
      term: "Dossiernummer (Excel)",
      details: `${data.legacy_id}`
    })
  }

  return (
    <PageGrid>
      <PageHeading label="Zaakdetails" icon={FolderIcon} />
      <Heading
        onClick={() => void navigate(`/vve/${data?.homeowner_association?.id}`)}
        level={4}
        className={styles.heading}
      >
        {data?.homeowner_association?.name}
      </Heading>
      <Row align="between" alignVertical="start">
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
