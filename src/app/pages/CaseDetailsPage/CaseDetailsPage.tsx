import { useParams } from "react-router-dom"
import { DocumentIcon } from "@amsterdam/design-system-react-icons"
import { Heading } from "@amsterdam/design-system-react"
import { useCase } from "app/state/rest"
import { PageHeading, PageSpinner, DetailsList } from "app/components"
import Workflows from "./Workflows/Workflows"
import CaseEvents from "./CaseEvents/CaseEvents"


export const CaseDetailsPage: React.FC = () => {
  const { caseId } = useParams()
  const [data, { isBusy }] = useCase(Number(caseId))

  if (isBusy) {
    return <PageSpinner />
  }

  const dataDetailsList = [
    { term: "Zaak ID:", details: data?.id  },
    { term: "Beschrijving:", details: data?.description }
  ]

  return (
    <>
      <PageHeading label="Zaakdetails" icon={DocumentIcon}/>
      <Heading level={ 4 } style={{ marginBottom: 24 }}>{ data?.homeowner_association }</Heading>
      <DetailsList data={ dataDetailsList } />
      { data?.id && <Workflows caseId={ data?.id } /> }
      { data?.id && <CaseEvents caseId={ data?.id } /> }
    </>
  )
}

export default CaseDetailsPage
    