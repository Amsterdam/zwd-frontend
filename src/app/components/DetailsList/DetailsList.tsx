import React from "react"
import { DescriptionList } from "@amsterdam/design-system-react"

type Props = {
  data?: {
    term: string;
    details?: string | number | null;
  }[]
}

export const DetailsList: React.FC<Props> = ({ data = [] }) => (
  <DescriptionList>
    { data.map((item) => ( 
      <React.Fragment key={item?.term}>
        <DescriptionList.Term key={item?.term}>{item?.term}</DescriptionList.Term>
        <DescriptionList.Details  key={item?.details}>{item?.details}</DescriptionList.Details>
      </React.Fragment>
    ))}
  </DescriptionList>
)

export default DetailsList
