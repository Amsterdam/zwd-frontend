import Sorter from "./Sorter"
import { ColumnType, SortingType } from "../../types"
import styles from "./TableHeader.module.css"

type Props<T> = {
  columns: ColumnType<T>[]
  onChangeSorting: (sorting: SortingType) => void
  sorting?: SortingType
}

const TableHeader = <T,>({ columns, onChangeSorting, sorting }: Props<T>) => (
  <thead>
    <tr>
      {columns.map(({ header, width, sorter }, index) => (
        <th
          key={index}
          className={styles.tableHeader}
          style={{ width: width ?? "auto" }}
        >
          {sorter ? (
            <Sorter
              header={header}
              sorting={sorting}
              onChangeSorting={onChangeSorting}
              index={index}
            />
          ) : (
            header
          )}
        </th>
      ))}
    </tr>
  </thead>
)

export default TableHeader
