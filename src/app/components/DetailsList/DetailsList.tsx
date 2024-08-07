import React from "react"
import styled from "styled-components"
import { DescriptionList } from "@amsterdam/design-system-react"

type Props = {
  data?: {
    term: string;
    details?: string | number | null;
  }[]
}

const StyledDescriptionList = styled(DescriptionList)`
  font-size: var(--ams-text-level-6-font-size); 
`

export const DetailsList: React.FC<Props> = ({ data = [] }) => (
  <StyledDescriptionList>
    { data.map((item) => ( 
      <React.Fragment key={item?.term}>
        <DescriptionList.Term key={item?.term}>{item?.term}</DescriptionList.Term>
        <DescriptionList.Details  key={item?.details}>{item?.details}</DescriptionList.Details>
      </React.Fragment>
    ))}
  </StyledDescriptionList>
)

export default DetailsList
