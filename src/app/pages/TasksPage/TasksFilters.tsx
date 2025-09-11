import { useContext } from "react"
import { Row } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  Search,
  PageSizeFilter,
  StatusFilter,
  TaskNameFilter,
  DistrictFilter,
  NeighborhoodFilter,
  ResetFiltersButton
} from "app/components"

const TASKS = "tasks"

export const TasksFilters = () => {
  const { pagination, updateContextTasks } = useContext(ContextValues)[TASKS]

  const onChangeFilter = (key: string, item: string) => {
    const tasksContextItem = {
      [key]: item,
      pagination: {
        ...pagination,
        page: 1
      }
    }
    updateContextTasks(tasksContextItem)
  }

  const onChangePageSize = (pageSize: string) => {
    updateContextTasks({
      pagination: {
        ...pagination,
        pageSize: parseInt(pageSize),
        page: 1
      }
    })
  }

  return (
    <Row wrap>
      <Search
        contextName={TASKS}
        onSearch={(value: string) => onChangeFilter("searchString", value)}
        placeholder="Zoek op zaak ID of statutaire naam"
      />
      <PageSizeFilter contextName={TASKS} onChangePageSize={onChangePageSize} />
      <StatusFilter
        contextName={TASKS}
        onChangeFilter={(value: string) => onChangeFilter("status", value)}
      />
      <TaskNameFilter
        onChangeFilter={(value: string) => onChangeFilter("taskName", value)}
      />
      <DistrictFilter
        contextName={TASKS}
        onChangeFilter={(value: string) => onChangeFilter("district", value)}
      />
      <NeighborhoodFilter
        contextName={TASKS}
        onChangeFilter={(value: string) =>
          onChangeFilter("neighborhood", value)
        }
      />
      <ResetFiltersButton contextName={TASKS} />
    </Row>
  )
}

export default TasksFilters
