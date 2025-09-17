import type { ColumnType } from "app/components"
import {
  LinkButton,
  createStringSorter,
  createDateSorter,
  createNumberSorter,
  getSortOrder
} from "app/components"
import { formatDate } from "app/utils/dates"

type DataType = Components.Schemas.CaseList

const getColumns = (sorting: TABLE.Sorting): ColumnType<DataType>[] => [
  {
    header: "ID",
    dataIndex: "prefixed_dossier_id",
    sorter: createNumberSorter<DataType>("id"),
    sortOrder: getSortOrder(sorting, "prefixed_dossier_id")
  },
  {
    header: "Excel ID",
    dataIndex: "legacy_id",
    sorter: createStringSorter<DataType>("legacy_id"),
    sortOrder: getSortOrder(sorting, "legacy_id")
  },
  {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association.name",
    sorter: createStringSorter<DataType>("homeowner_association.name"),
    sortOrder: getSortOrder(sorting, "homeowner_association.name")
  },
  {
    header: "Status",
    dataIndex: "status",
    sorter: createStringSorter<DataType>("status"),
    sortOrder: getSortOrder(sorting, "status")
  },
  {
    header: "Aanvraagdatum",
    dataIndex: "request_date",
    sorter: createDateSorter<DataType>("request_date"),
    defaultSortOrder: "DESCEND" as const,
    sortOrder: getSortOrder(sorting, "request_date"),
    render: (text) => formatDate(text)
  },
  {
    header: "Laatst gewijzigd",
    dataIndex: "updated",
    sorter: createDateSorter<DataType>("updated"),
    sortOrder: getSortOrder(sorting, "updated"),
    render: (text) => formatDate(text)
  },
  {
    header: "",
    dataIndex: "id",
    width: 100,
    render: (id) => (
      <LinkButton label="Zaakdetails" to={`/zaken/${id}`} onClick={() => {}} />
    )
  }
]

export default getColumns
