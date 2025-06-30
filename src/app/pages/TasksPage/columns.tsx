import {
  ColumnType,
  createDateSorter,
  createStringSorter,
  getSortOrder,
  LinkButton
} from "app/components"
import { formatDate } from "app/utils/dates"

export const getColumns = (
  sorting: TABLE.Sorting
): ColumnType<CustomCaseUserTask>[] => [
  {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association",
    sorter: createStringSorter<CustomCaseUserTask>("homeowner_association"),
    sortOrder: getSortOrder(sorting, "homeowner_association")
  },
  {
    header: "Open taak",
    dataIndex: "name",
    sorter: createStringSorter<CustomCaseUserTask>("name"),
    sortOrder: getSortOrder(sorting, "name")
  },
  {
    header: "Aangemaakt",
    dataIndex: "created",
    width: 130,
    sorter: createDateSorter<CustomCaseUserTask>("created"),
    defaultSortOrder: "DESCEND" as const,
    sortOrder: getSortOrder(sorting, "created"),
    render: (text) => formatDate(text, true)
  },
  {
    header: "",
    dataIndex: "case",
    width: 100,
    render: (caseId) => (
      <LinkButton
        label="Zaakdetails"
        to={`/zaken/${caseId}`}
        onClick={() => {}}
      />
    )
  }
]

export default getColumns
