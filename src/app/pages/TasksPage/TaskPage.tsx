import { useContext, useEffect, useMemo } from "react"
import { useNavigateWithModifier } from "app/hooks"
import { PageGrid, PageHeading, Table } from "app/components"
import { useTasks } from "app/state/rest"
import getColumns from "./columns"
import { ContextValues } from "app/state/context/ValueProvider"
import TasksFilters from "./TasksFilters"

export const TasksPage: React.FC = () => {
  const {
    count,
    district,
    neighborhood,
    results,
    pagination,
    searchString,
    sorting,
    taskName,
    status,
    wijk,
    adviceType,
    advisor,
    applicationType,
    requestDateRangeAfter,
    requestDateRangeBefore,
    isSmallHoa,
    updateContextTasks
  } = useContext(ContextValues)["tasks"]
  const [dataSource, { isBusy }] = useTasks(
    pagination,
    district,
    neighborhood,
    searchString,
    sorting,
    taskName,
    status,
    wijk,
    adviceType,
    advisor,
    applicationType,
    requestDateRangeAfter,
    requestDateRangeBefore,
    isSmallHoa
  )
  const navigateWithModifier = useNavigateWithModifier()

  useEffect(() => {
    if (dataSource?.results) {
      updateContextTasks({
        results: dataSource?.results,
        count: dataSource.count
      })
    } else {
      updateContextTasks({
        results: [],
        count: 0
      })
    }
  }, [dataSource, updateContextTasks])

  const onChangeTable = (
    pagination: TABLE.Pagination,
    sorting: TABLE.Sorting
  ) => {
    updateContextTasks({ pagination, sorting })
  }

  const columns = useMemo(() => getColumns(sorting), [sorting])

  return (
    <PageGrid>
      <PageHeading label={`Takenoverzicht (${count})`} />
      <TasksFilters />
      <Table
        columns={columns}
        data={results}
        loading={isBusy}
        onClickRow={(obj, _index, e) => navigateWithModifier(e, `/zaken/${obj.case}`)}
        onChange={onChangeTable}
        pagination={{
          page: pagination.page,
          pageSize: pagination.pageSize,
          collectionSize: count || 1
        }}
      />
    </PageGrid>
  )
}

export default TasksPage
