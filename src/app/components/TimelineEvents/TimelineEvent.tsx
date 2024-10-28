import React from "react"
import { DescriptionList } from "@amsterdam/design-system-react"
import { styled } from "styled-components"
import { useValues } from "./useValues"


type Props = {
  event: CaseEvent
}

const Wrapper = styled.div`
  margin-left: 25px;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.08);
  border: 0.5px solid #d4d2d2;
  border-radius: 4px;
  box-shadow: 
    0px 6px 16px -8px rgba(0, 0, 0, 0.08),
    0px 9px 28px 0px rgba(0, 0, 0, 0.05),
    0px 12px 48px 16px rgba(0, 0, 0, 0.03);
`


export const TimelineEvent: React.FC<Props> = ({ event }) => {
  const data = useValues(event)
  return (
    <Wrapper>
      <DescriptionList>
        {data.map((item, index) => (
          <React.Fragment key={ `event_values-${ index }` }>
            <DescriptionList.Term>
              { item.key }
            </DescriptionList.Term>
            <DescriptionList.Description>
              { item.value }
            </DescriptionList.Description>
          </React.Fragment>
        ))}
      </DescriptionList>
    </Wrapper>
  )
}
