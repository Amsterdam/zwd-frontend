import React from "react"
import { DescriptionList } from "@amsterdam/design-system-react"
import { styled } from "styled-components"

type Props = {
  data?: {
    term: string
    details?: string | number | null
  }[]
}

const Wrapper = styled(DescriptionList)`
  margin-bottom: 32px;
`

export const DetailsList: React.FC<Props> = ({ data = [] }) => (
  <Wrapper>
    {data.map((item) => (
      <React.Fragment key={item?.term}>
        <DescriptionList.Term key={item?.term}>
          {item?.term}
        </DescriptionList.Term>
        <DescriptionList.Description key={item?.details}>
          {item?.details}
        </DescriptionList.Description>
      </React.Fragment>
    ))}
  </Wrapper>
)

export default DetailsList
