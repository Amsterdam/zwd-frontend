import { useParams } from "react-router-dom"
import { DocumentIcon } from "@amsterdam/design-system-react-icons"
import { useCase } from "app/state/rest"
import { PageHeading, PageSpinner } from "app/components"
import Workflows from "./Workflows"
import { Grid, Row } from "@amsterdam/design-system-react"

export const CaseDetailsPage: React.FC = () => {
  const { caseId } = useParams()
  const [data, { isBusy }] = useCase(Number(caseId))

  if (isBusy) {
    return <PageSpinner />
  }
  return (
    <>
      <PageHeading label="Zaakdetails" icon={DocumentIcon}/>
      <Row>
        <Grid.Cell span={4} start={1} >
          <div>Zaak ID:</div>
          <div>Beschrijving:</div>
        </Grid.Cell>
        <Grid.Cell span={4} >
          <div>{ data?.id }</div>
          <div>{ data?.description }</div>
        </Grid.Cell>
      </Row>
      <br />
      <br />
      { data?.id && <Workflows caseId={ data?.id } /> }
    </>
  )
}

export default CaseDetailsPage
    