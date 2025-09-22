import { Icon } from "@amsterdam/design-system-react"
import {
  ArrowDownIcon,
  ArrowUpIcon
} from "@amsterdam/design-system-react-icons"
import { SortingType, ASCEND, DESCEND } from "../../types"
import styles from "./Sorter.module.css"

type Props = {
  header?: React.ReactNode
  sorting?: SortingType
  onChangeSorting: (sorting: SortingType) => void
  index: number
}

const Sorter: React.FC<Props> = ({
  header,
  index,
  sorting,
  onChangeSorting
}) => {
  const isSelected = sorting?.index === index
  // Only show arrow down icon when order is DESCEND and sorting is already selected.
  const iconSvg =
    isSelected && sorting?.order === DESCEND ? ArrowDownIcon : ArrowUpIcon

  const onSorterClick = () => {
    const newOrder = isSelected && sorting?.order === ASCEND ? DESCEND : ASCEND
    onChangeSorting({ index: index, order: newOrder })
  }

  return (
    <div
      className={`${styles.label} ${isSelected ? styles.selected : ""}`}
      data-sortorder={sorting?.order ?? ASCEND}
      onClick={onSorterClick}
    >
      {header ?? <>&nbsp;</>}
      <Icon
        className={`${styles.icon} ${isSelected ? styles.visible : ""}`}
        svg={iconSvg}
        size="heading-4"
      />
    </div>
  )
}

export default Sorter
