import { useCaseEvents } from "app/state/rest"
import { SmallSkeleton, PageHeading, Timeline } from "app/components"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

export const CaseEvents: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useCaseEvents(caseId)

  const events = data ? [...data]?.reverse() : []

  if (isBusy) {
    return <SmallSkeleton height={4} />
  }

  return (
    <div style={{ marginBottom: "32px" }}>
      <PageHeading label="Zaakhistorie" level={3} border />
      <Timeline events={events} style={{ marginTop: "32px" }} />
    </div>
  )
}

export default CaseEvents
