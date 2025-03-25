import { ColumnType, LinkButton } from "app/components"
import { formatDate } from "app/utils/dates"

export const getColumns = (
  sorting: TABLE.Sorting
): ColumnType<CustomCaseUserTask>[] => [
  {
    header: "Taak ID",
    dataIndex: "id",
    sorter: (a: CustomCaseUserTask, b: CustomCaseUserTask) => a?.id - b?.id,
    sortOrder:
      sorting.dataIndex === "id" && sorting.order ? sorting.order : undefined,
    width: 100
  },
  {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association"
  },
  {
    header: "Open taak",
    dataIndex: "name"
  },
  {
    header: "Aangemaakt",
    dataIndex: "created",
    width: 130,
    sorter: (a: CustomCaseUserTask, b: CustomCaseUserTask) =>
      new Date(a.created).getTime() - new Date(b.created).getTime(),
    defaultSortOrder: "DESCEND" as const,
    sortOrder:
      sorting.dataIndex === "created" && sorting.order
        ? sorting.order
        : undefined,
    render: (text) => formatDate(text, true)
  },
  {
    header: "",
    dataIndex: "case",
    width: 100,
    render: () => <LinkButton label="Zaakdetails" />
  }
]

export default getColumns
