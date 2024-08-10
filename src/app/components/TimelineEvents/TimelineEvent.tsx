import React from "react"
import { DescriptionList } from "@amsterdam/design-system-react"
import { getEventValueName } from "./dictionaries"
import { isValidDate, formatDate } from "app/utils/dates"
import { styled } from "styled-components"


type Props = {
  event: CaseEvent
}

const Wrapper = styled.div`
  margin-left: 25px;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.08);;
  border: 0.5px solid #d4d2d2;
  border-radius: 4px;
  box-shadow: 
    0px 6px 16px -8px rgba(0, 0, 0, 0.08),
    0px 9px 28px 0px rgba(0, 0, 0, 0.05),
    0px 12px 48px 16px rgba(0, 0, 0, 0.03);
`

export const TimelineEvent: React.FC<Props> = ({ event }) => {
  const { event_values } = event
  return (
    <Wrapper>
      <DescriptionList>
        { Object.entries(event_values).map(([key, value], index) => (
          <React.Fragment key={ `event_values-${ index }` }>
            <DescriptionList.Term>
              { getEventValueName(key) }
            </DescriptionList.Term><DescriptionList.Details>
              { isValidDate(value) ? formatDate(value, true) : value }
            </DescriptionList.Details>
          </React.Fragment>
        ))}
      </DescriptionList>
    </Wrapper>
  )
}
