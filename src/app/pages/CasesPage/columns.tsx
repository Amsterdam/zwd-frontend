import type { ColumnType } from "app/components"
import { LinkButton, StatusTag } from "app/components"
import { formatDate } from "app/utils/dates"

type DataType = Components.Schemas.CaseList

const columns: ColumnType<DataType>[] = [
  {
    header: "ID",
    dataIndex: "id",
    sorter: (a: DataType, b: DataType) => a?.id - b?.id,
    defaultSortOrder: "DESCEND"
  }, {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association.name",
    sorter: (a: DataType, b: DataType) => {
      const nameA = (a?.homeowner_association?.name as string | undefined) ?? ""
      const nameB = (b?.homeowner_association?.name as string | undefined) ?? ""
      return (
        nameA.localeCompare(nameB)
      )
    }
  }, {
    header: "Status",
    dataIndex: "case_state_type",
    render: (text) => <StatusTag status={text}/>
  }, {
    header: "Startdatum zaak",
    dataIndex: "created",
    sorter: (a: DataType, b: DataType) => (
      a.created.localeCompare(b.created)
    ),
    render: (text) => formatDate(text)
  }, {
    header: "",
    dataIndex: "id",
    width: 100,
    render: () => <LinkButton label="Zaakdetails" />
  }
]

export default columns
