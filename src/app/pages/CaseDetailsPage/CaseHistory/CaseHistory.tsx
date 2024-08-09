import { useCaseEvents } from "app/state/rest"
import { SmallSkeleton, PageHeading, TimelineEvents } from "app/components"


type Props = {
  caseId: Components.Schemas.Case["id"]
}

export const CaseHistory: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useCaseEvents(caseId)
  const events = data ? [...data]?.reverse() : []

  if (isBusy) {
    return <SmallSkeleton height={ 4 } />
  }
  return (
    <>
      <PageHeading label="Zaakhistorie" level={ 4 } border/>
      <TimelineEvents events={ events }/>
    </>
  )
}

export default CaseHistory
    