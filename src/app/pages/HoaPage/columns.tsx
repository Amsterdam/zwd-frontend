import type { ColumnType } from "app/components"
import {
  createStringSorter,
  getSortOrder
} from "app/components"

type DataType = Components.Schemas.CaseList

export const DEFAULT_COLUMNS = [
  "name",
]

const getColumns = (sorting: TABLE.Sorting): ColumnType<DataType>[] => [
  {
    header: "Vve statutaire naam",
    dataIndex: "name",
    sorter: createStringSorter<DataType>("name"),
    sortOrder: getSortOrder(sorting, "name")
  },
  {
    header: "Stadsdeel",
    dataIndex: "district",
    sorter: createStringSorter<DataType>("district"),
    sortOrder: getSortOrder(sorting, "district")
  }
]

export default getColumns
