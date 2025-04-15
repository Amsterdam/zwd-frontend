import { styled } from "styled-components"
import { useCaseEvents } from "app/state/rest"
import { SmallSkeleton, PageHeading, TimelineEvents } from "app/components"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const Wrapper = styled.div`
  margin-bottom: 32px;
`

export const CaseEvents: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useCaseEvents(caseId)
  const events = data ? [...data]?.reverse() : []

  if (isBusy) {
    return <SmallSkeleton height={4} />
  }
  return (
    <Wrapper>
      <PageHeading label="Zaakhistorie" level={4} border />
      <TimelineEvents events={events} />
    </Wrapper>
  )
}

export default CaseEvents
