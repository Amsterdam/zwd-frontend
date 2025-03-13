import { ColumnType, LinkButton } from "app/components"
import { formatDate } from "app/utils/dates"

export const columns: ColumnType<CustomCaseUserTask>[] = [
  {
    header: "Taak ID",
    dataIndex: "id",
    sorter: (a: CustomCaseUserTask, b: CustomCaseUserTask) =>  a?.id - b?.id,    
    defaultSortOrder: "DESCEND",
    width: 100
  }, {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association",
    sorter: (a: CustomCaseUserTask, b: CustomCaseUserTask) => (
      a?.homeowner_association && b?.homeowner_association ? a.homeowner_association.localeCompare(b.homeowner_association) : -1
    )
  }, {
    header: "Open taak",
    dataIndex: "name",
    sorter: (a: CustomCaseUserTask, b: CustomCaseUserTask) => (
      a.name.localeCompare(b.name)
    )
  }, {
    header: "Aangemaakt",
    dataIndex: "created",
    width: 130,
    sorter: (a: CustomCaseUserTask, b: CustomCaseUserTask) => (
      a.created.localeCompare(b.created)
    ),
    render: (text) => formatDate(text, true)
  }, {
    header: "",
    dataIndex: "case",
    width: 100,
    render: () => <LinkButton label="Zaakdetails" />
  }
]

export default columns
