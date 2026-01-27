import type { ColumnType } from "app/components"
import {
  createNumberSorter,
  createStringSorter,
  getSortOrder
} from "app/components"

type DataType = Components.Schemas.CaseList

export const DEFAULT_COLUMNS = [
  "name",
]

const getColumns = (sorting: TABLE.Sorting): ColumnType<DataType>[] => [
  {
    header: "Statutaire naam",
    dataIndex: "name",
    sorter: createStringSorter<DataType>("name"),
    sortOrder: getSortOrder(sorting, "name")
  },
  {
    header: "Appartementen",
    dataIndex: "number_of_apartments",
    sorter: createNumberSorter<DataType>("number_of_apartments"),
    sortOrder: getSortOrder(sorting, "number_of_apartments")
  },
  {
    header: "Stadsdeel",
    dataIndex: "district",
    sorter: createStringSorter<DataType>("district"),
    sortOrder: getSortOrder(sorting, "district")
  },
  {
    header: "Cursisten",
    dataIndex: "course_participant_count",
    sorter: createNumberSorter<DataType>("course_participant_count"),
    sortOrder: getSortOrder(sorting, "course_participant_count")
  },
]

export default getColumns
