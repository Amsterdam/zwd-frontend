import { useParams } from "react-router-dom"
import { DocumentIcon } from "@amsterdam/design-system-react-icons"
import { Heading, Tabs } from "@amsterdam/design-system-react"
import { useCase } from "app/state/rest"
import { PageHeading, PageSpinner, DetailsList } from "app/components"
import Workflows from "./Workflows/Workflows"
import CaseEvents from "./CaseEvents/CaseEvents"
import Documents from "./Documents/Documents"
import { useURLState } from "app/hooks"


export const CaseDetailsPage: React.FC = () => {
  const { caseId } = useParams()
  const [data, { isBusy }] = useCase(Number(caseId))
  const [activeTab, setActiveTab] = useURLState("tab", "0")

  if (isBusy) {
    return <PageSpinner />
  }

  const dataDetailsList = [
    { term: "Zaak ID:", details: data?.id  },
    { term: "Beschrijving:", details: data?.description }
  ]

  const onClickTab = (e: React.MouseEvent<HTMLElement>) => {
    const lastChar = (e.target as HTMLElement).id.slice(-1)
    setActiveTab(lastChar)
  }

  return (
    <>
      <PageHeading label="Zaakdetails" icon={DocumentIcon}/>
      <Heading level={4} style={{ marginBottom: 24 }}>{ data?.homeowner_association }</Heading>
      <DetailsList data={ dataDetailsList } />
      <Tabs activeTab={ Number(activeTab) } >
        <Tabs.List onClick={ onClickTab }>
          <Tabs.Button tab={0} >
            Open taken
          </Tabs.Button>
          <Tabs.Button tab={1}>
            Documenten
          </Tabs.Button>
        </Tabs.List>
        <Tabs.Panel tab={0}>
          { data?.id && <Workflows caseId={ data?.id } /> }
          { data?.id && <CaseEvents caseId={ data?.id } /> }
        </Tabs.Panel>
        <Tabs.Panel tab={1}>
          <Documents />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default CaseDetailsPage
    