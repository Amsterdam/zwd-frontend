import { useCaseEvents } from "app/state/rest"
import {
  SmallSkeleton,
  PageHeading,
  TimelineEvents,
  Timeline
} from "app/components"
import { sortEvents } from "./sortCaseEvents"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

export const CaseEvents: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useCaseEvents(caseId)

  const events = data ? sortEvents(data) : []

  console.log("events", events)

  if (isBusy) {
    return <SmallSkeleton height={4} />
  }

  return (
    <div style={{ marginBottom: "32px" }}>
      <PageHeading label="Zaakhistorie" level={3} border />
      <Timeline events={events} />
      <TimelineEvents events={events} />
    </div>
  )
}

export default CaseEvents
