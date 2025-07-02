import { useContext } from "react"
import { Row } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  Search,
  PageSizeFilter,
  StatusFilter,
  DistrictFilter,
  NeighborhoodFilter
} from "app/components"

export const TasksFilters = () => {
  const { pagination, updateContextTasks } = useContext(ContextValues)["tasks"]

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
        onSearch={(value: string) => onChangeFilter("searchString", value)}
        placeholder="Zoek op vve statutaire naam"
      />
      <PageSizeFilter contextName="tasks" onChangePageSize={onChangePageSize} />
      <StatusFilter
        contextName="tasks"
        onChangeFilter={(value: string) => onChangeFilter("status", value)}
      />
      <DistrictFilter
        contextName="tasks"
        onChangeFilter={(value: string) => onChangeFilter("district", value)}
      />
      <NeighborhoodFilter
        contextName="tasks"
        onChangeFilter={(value: string) =>
          onChangeFilter("neighborhood", value)
        }
      />
    </Row>
  )
}

export default TasksFilters
