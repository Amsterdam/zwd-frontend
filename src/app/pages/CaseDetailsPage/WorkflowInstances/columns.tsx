import { Icon } from "@amsterdam/design-system-react"
import { CheckMarkIcon, ClockIcon } from "@amsterdam/design-system-react-icons"
import { ColumnType, Tag } from "app/components"

const formatWorkflowType = (workflowType: string): string =>
  workflowType.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase())

const columns: ColumnType<Components.Schemas.CaseWorkflowInstance>[] = [
  {
    header: "ID",
    dataIndex: "id"
  },
  {
    header: "Proces",
    dataIndex: "workflow_type",
    render: (text) => formatWorkflowType(text)
  },
  {
    header: "Versie",
    dataIndex: "workflow_version"
  },
  {
    header: "Status",
    dataIndex: "completed",
    render: (completed) => (
      <Tag color={completed ? "green" : "blue"}>
        <Icon
          svg={completed ? CheckMarkIcon : ClockIcon}
          size="small"
          style={{ marginRight: 4 }}
        />
        {completed ? "Afgerond" : "Actief"}
      </Tag>
    )
  }
]

export default columns
