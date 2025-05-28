import type { ColumnType } from "app/components"
import { LinkButton } from "app/components"
import { formatDate } from "app/utils/dates"

type DataType = Components.Schemas.CaseList

const getColumns = (sorting: TABLE.Sorting): ColumnType<DataType>[] => [
  {
    header: "ID",
    dataIndex: "prefixed_dossier_id",
    sorter: (a: DataType, b: DataType) => a?.id - b?.id,
    sortOrder:
      sorting.dataIndex === "id" && sorting.order ? sorting.order : undefined
  },
  {
    header: "Excel ID",
    dataIndex: "legacy_id",
    sorter: (a: DataType, b: DataType) => {
      const nameA = a?.legacy_id as string | null
      const nameB = b?.legacy_id as string | null
      // Check for null values
      if (nameA === null && nameB === null) return 0
      if (nameA === null) return 1
      if (nameB === null) return -1
      return nameA.localeCompare(nameB)
    }
  },
  {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association.name",
    sorter: (a: DataType, b: DataType) => {
      const nameA = (a?.homeowner_association.name as string | undefined) ?? ""
      const nameB = (b?.homeowner_association.name as string | undefined) ?? ""
      return nameA.localeCompare(nameB)
    }
  },
  {
    header: "Status",
    dataIndex: "status",
    sorter: (a: DataType, b: DataType) => {
      const nameA = (a?.status as string | undefined) ?? ""
      const nameB = (b?.status as string | undefined) ?? ""
      return nameA.localeCompare(nameB)
    }
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
