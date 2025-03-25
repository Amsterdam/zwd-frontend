import { DescriptionList } from "@amsterdam/design-system-react"
import { Fragment } from "react"

type DescriptionItem = {
  label: string
  value: React.ReactNode
}

type DescriptionsProps = {
  items: DescriptionItem[]
}

export const Descriptions: React.FC<DescriptionsProps> = ({ items }) => (
  <DescriptionList>
    {items.map((item, index) => (
      <Fragment key={ index }>
        <DescriptionList.Term>
          {item.label}
        </DescriptionList.Term>
        <DescriptionList.Description>
          {item.value}
        </DescriptionList.Description>
      </Fragment>
    ))}
  </DescriptionList>
)

export default Descriptions
