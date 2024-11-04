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
  border-radius: 8px;
  background-color: rgb(245, 245, 245);
  border: 1px solid #E6E6E6;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
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
