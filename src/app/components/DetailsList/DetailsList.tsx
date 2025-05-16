import React from "react"
import { DescriptionList } from "@amsterdam/design-system-react"

type Props = {
  data?: {
    term: string
    details?: string | number | null
  }[]
}

export const DetailsList: React.FC<Props> = ({ data = [] }) => (
  <DescriptionList style={{ marginBottom: "32px" }}>
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
  </DescriptionList>
)

export default DetailsList
