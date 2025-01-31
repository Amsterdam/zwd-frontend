import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { DocumentIcon } from "@amsterdam/design-system-react-icons"
import { Heading, Tabs } from "@amsterdam/design-system-react"
import { useCase } from "app/state/rest"
import { PageHeading, PageSpinner, DetailsList, PageGrid } from "app/components"
import { useURLState } from "app/hooks"
import Workflows from "./Workflows/Workflows"
import CaseEvents from "./CaseEvents/CaseEvents"
import Documents from "./Documents/Documents"
import AddSubtask from "./AddSubtask/AddSubtask"


const HeaderLink = styled(Heading)`
  margin-bottom: 24px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  } 
`

export const CaseDetailsPage: React.FC = () => {
  const { caseId } = useParams()
  const [data, { isBusy }] = useCase(Number(caseId))
  const [activeTab, setActiveTab] = useURLState("tab", "0")
  const navigate = useNavigate()

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
    <PageGrid>
      <PageHeading label="Zaakdetails" icon={DocumentIcon}/>
      <HeaderLink 
        onClick={() => navigate(`/vve/${ data?.homeowner_association?.id }`)} 
        level={4} 
      >
        { data?.homeowner_association?.name }
      </HeaderLink>
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
          {data?.id && (
            <>
              <AddSubtask />
              <Workflows caseId={ data?.id } /> 
              <CaseEvents caseId={ data?.id } /> 
            </>
          )}
        </Tabs.Panel>
        <Tabs.Panel tab={1}>
          <Documents />
        </Tabs.Panel>
      </Tabs>
    </PageGrid>
  )
}

export default CaseDetailsPage
    