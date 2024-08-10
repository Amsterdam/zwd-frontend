import { useParams } from "react-router-dom"
import { DocumentIcon } from "@amsterdam/design-system-react-icons"
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
      <DetailsList data={ dataDetailsList } />
      { data?.id && <Workflows caseId={ data?.id } /> }
      { data?.id && <CaseEvents caseId={ data?.id } /> }
    </>
  )
}

export default CaseDetailsPage
    