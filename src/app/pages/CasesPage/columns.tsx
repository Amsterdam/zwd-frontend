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

export const DEFAULT_COLUMNS = [
  "prefixed_dossier_id",
  "legacy_id",
  "homeowner_association.name",
  "status",
  "request_date",
  "updated"
]

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
    header: "Vve grootte",
    dataIndex: "homeowner_association.number_of_apartments",
    sorter: createNumberSorter<DataType>(
      "homeowner_association.number_of_apartments"
    ),
    sortOrder: getSortOrder(
      sorting,
      "homeowner_association.number_of_apartments"
    )
  },
  {
    header: "Stadsdeel",
    dataIndex: "homeowner_association.district",
    sorter: createStringSorter<DataType>("homeowner_association.district"),
    sortOrder: getSortOrder(sorting, "homeowner_association.district")
  },
  {
    header: "Buurt",
    dataIndex: "homeowner_association.neighborhood",
    sorter: createStringSorter<DataType>("homeowner_association.neighborhood"),
    sortOrder: getSortOrder(sorting, "homeowner_association.neighborhood")
  },
  {
    header: "Aanvraagtype",
    dataIndex: "application_type",
    sorter: createStringSorter<DataType>("application_type"),
    sortOrder: getSortOrder(sorting, "application_type"),
    render: (text) => text || "–"
  },
  {
    header: "Adviestype",
    dataIndex: "advice_type",
    sorter: createStringSorter<DataType>("advice_type"),
    sortOrder: getSortOrder(sorting, "advice_type"),
    render: (text) => text || "–"
  },
  {
    header: "Adviseur",
    dataIndex: "advisor",
    sorter: createStringSorter<DataType>("advisor"),
    sortOrder: getSortOrder(sorting, "advisor"),
    render: (text) => text || "–"
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
    header: "Einddatum",
    dataIndex: "end_date",
    sorter: createDateSorter<DataType>("end_date"),
    defaultSortOrder: "DESCEND" as const,
    sortOrder: getSortOrder(sorting, "end_date"),
    render: (text) => (text ? formatDate(text) : "–")
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
