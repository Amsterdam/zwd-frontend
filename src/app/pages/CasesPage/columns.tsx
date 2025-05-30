import type { ColumnType } from "app/components"
import { LinkButton, createStringSorter, createDateSorter, createnumberSorter } from "app/components"
import { formatDate } from "app/utils/dates"

type DataType = Components.Schemas.CaseList

const getColumns = (sorting: TABLE.Sorting): ColumnType<DataType>[] => [
  {
    header: "ID",
    dataIndex: "prefixed_dossier_id",
    sorter: createnumberSorter<DataType>("id")
  },
  {
    header: "Excel ID",
    dataIndex: "legacy_id",
    sorter: createStringSorter<DataType>("legacy_id")
  },
  {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association.name",
    sorter: createStringSorter<DataType>("homeowner_association.name")
  },
  {
    header: "Status",
    dataIndex: "status",
    sorter: createStringSorter<DataType>("status")
  },
  {
    header: "Startdatum zaak",
    dataIndex: "created",
    sorter: createDateSorter<DataType>("created"),
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
