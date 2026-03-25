import { Fragment } from "react"
import { DescriptionList } from "@amsterdam/design-system-react"
import styles from "./Descriptions.module.css"

type Variant = "default" | "subtle"

type DescriptionItem = {
  label: string
  value: React.ReactNode
}

type Props = {
  items: DescriptionItem[]
  variant?: Variant
}

export const Descriptions: React.FC<Props> = ({
  items,
  variant = "default"
}) => (
  <DescriptionList
    className={`${variant === "subtle" ? styles.subtle : ""} ${styles.breakAnywhere}`}
  >
    {items.map((item, index) => (
      <Fragment key={index}>
        <DescriptionList.Term>{item.label}</DescriptionList.Term>
        <DescriptionList.Description>{item.value}</DescriptionList.Description>
      </Fragment>
    ))}
  </DescriptionList>
)

export default Descriptions
