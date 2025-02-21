import { Icon } from "@amsterdam/design-system-react"
import { ColumnType, TaskOutlined, TaskReviewGuard } from "app/components"
import TaskButton from "../tasks/TaskButton/TaskButton"
import { formatDate } from "app/utils/dates"

const getColumns = (
  caseId: Components.Schemas.Case["id"]
): ColumnType<CustomCaseUserTask>[] => [
  {
    header: "",
    dataIndex: "id",
    width: 60,
    render: (_, task) => (
      <TaskReviewGuard task={task} displayMode="icon">
        <Icon svg={TaskOutlined} />
      </TaskReviewGuard>
    )
  },
  {
    header: "Open taken",
    dataIndex: "name"
  },
  {
    header: "Slotdatum",
    dataIndex: "due_date",
    width: 200,
    render: (text) => formatDate(text)
  },
  {
    header: "Verwerking taak",
    dataIndex: "id",
    width: 150,
    render: (_, task) => (
      <TaskReviewGuard task={task}>
        <TaskButton task={task} caseId={caseId} />
      </TaskReviewGuard>
    )
  }
]

export default getColumns
