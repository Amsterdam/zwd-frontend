import { useNavigate } from "react-router-dom"
import { PageGrid, PageHeading, Table } from "app/components"
import { useTasks } from "app/state/rest"
import columns from "./columns"
import { ContextValues } from "app/state/context/ValueProvider"
import { useContext, useEffect } from "react"


export const TasksPage: React.FC = () => {
  const {
    count, pagination, results, updateContextTasks
  } = useContext(ContextValues)["tasks"]
  const [dataSource, { isBusy }] = useTasks(pagination)
  const navigate = useNavigate()

  useEffect(() => {
    if (dataSource?.results) {
      updateContextTasks({ results: dataSource?.results, count: dataSource.count })
    } else {
      updateContextTasks({
        results: [],
        count: 0
      })
    }
  }, [dataSource, updateContextTasks])

  const onChangeTable = (pagination: Pagination) => {
    updateContextTasks({ pagination })
  }

  return (
    <PageGrid>
      <PageHeading label={`Takenoverzicht (${ count })`} />
      <Table
        columns={ columns }
        data={ results } 
        loading={ isBusy }
        onClickRow={(obj) => void navigate(`/zaken/${ obj.case }`)}
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
    