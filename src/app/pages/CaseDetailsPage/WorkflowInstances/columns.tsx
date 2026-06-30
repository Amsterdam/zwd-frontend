import { Icon } from "@amsterdam/design-system-react"
import { CheckMarkIcon, ClockIcon } from "@amsterdam/design-system-react-icons"
import { ColumnType, RouterLink, Tag } from "app/components"
import { formatWorkflowType } from "app/utils"

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
  },
  {
    header: "",
    dataIndex: "current_task_specs",
    width: 200,
    render: (_, record) => {
      if (!record?.workflow_type || !record?.workflow_version) {
        return null
      }

      const hasCurrentTasks = !!record.current_task_specs?.length
      const queryParams = new URLSearchParams({
        model: record.workflow_type,
        version: record.workflow_version,
        ...(hasCurrentTasks && {
          tasks: record.current_task_specs!.join(",")
        })
      })

      return (
        <RouterLink to={`/bpmn?${queryParams.toString()}`}>
          {hasCurrentTasks ? "Bekijk huidige processtap" : "Bekijk het proces"}
        </RouterLink>
      )
    }
  }
]

export default columns
