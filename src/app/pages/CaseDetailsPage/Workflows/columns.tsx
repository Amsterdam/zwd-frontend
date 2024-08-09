import { Icon } from "@amsterdam/design-system-react"
import { ColumnType, TaskOutlined } from "app/components"
import TaskButton from "../tasks/TaskButton/TaskButton"
import { formatDate } from "app/utils/dates"

const getColumns = (caseId: Components.Schemas.Case["id"]): ColumnType<Components.Schemas.CaseUserTask>[] => ([
  {
    header: "",
    dataIndex: "id",
    render: () => <Icon svg={ TaskOutlined } />
  }, {
    header: "Open taken",
    dataIndex: "name"
  }, {
    header: "Slotdatum",
    dataIndex: "due_date",
    render: (text) => formatDate(text)
  }, {
    header: "Verwerking taak",
    dataIndex: "id",
    minWidth: 170,
    render: (_, task) => <TaskButton task={ task } caseId={ caseId } />
  }
])

export default getColumns
