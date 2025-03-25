import type { ColumnType } from "app/components"
import { LinkButton } from "app/components"
import { formatDate } from "app/utils/dates"

type DataType = Components.Schemas.CaseList

const getColumns = (sorting: TABLE.Sorting): ColumnType<DataType>[] => [
  {
    header: "ID",
    dataIndex: "id",
    sorter: (a: DataType, b: DataType) => a?.id - b?.id,
    sortOrder:
      sorting.dataIndex === "id" && sorting.order ? sorting.order : undefined
  },
  {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association.name"
  },
  {
    header: "Status",
    dataIndex: "status"
  },
  {
    header: "Startdatum zaak",
    dataIndex: "created",
    sorter: (a: DataType, b: DataType) =>
      new Date(a.created).getTime() - new Date(b.created).getTime(),
    defaultSortOrder: "DESCEND" as const,
    sortOrder:
      sorting.dataIndex === "created" && sorting.order
        ? sorting.order
        : undefined,
    render: (text) => formatDate(text)
  },
  {
    header: "",
    dataIndex: "id",
    width: 100,
    render: () => <LinkButton label="Zaakdetails" />
  }
]

export default getColumns
