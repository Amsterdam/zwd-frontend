import dayjs from "dayjs"
import { ColumnType, LinkButton, PageHeading, Table } from "app/components"
import { useTasks } from "app/state/rest"


const columns: ColumnType<Components.Schemas.CaseUserTask>[] = [
  {
    header: "Taak ID",
    dataIndex: "id",
    sorter: (a: Components.Schemas.CaseUserTask, b: Components.Schemas.CaseUserTask) =>  a?.id - b?.id,    
    defaultSortOrder: "DESCEND"
  }, {
    header: "Open taak",
    dataIndex: "name",
    sorter: (a: Components.Schemas.CaseUserTask, b: Components.Schemas.CaseUserTask) => (
      a.name.localeCompare(b.name)
    )
  }, {
    header: "Gemaakt op",
    dataIndex: "created",
    sorter: (a: Components.Schemas.CaseUserTask, b: Components.Schemas.CaseUserTask) => (
      a.created.localeCompare(b.created)
    ),
    render: (text) => dayjs(text).format("DD-MM-YYYY HH:mm")
  }, {
    header: "",
    dataIndex: "case",
    minWidth: 170,
    render: (caseId) => <LinkButton label="Zaakdetails" path={ `/zaken/${ caseId }`} />
  }
]

export const TasksPage: React.FC = () => {
  const [data, { isBusy }] = useTasks()
  
  return (
    <>
      <PageHeading label="Takenoverzicht" />
      <Table 
        columns={ columns } 
        data={ data as Components.Schemas.CaseUserTask[] } 
        loading={ isBusy }
      />
    </>
  )
}

export default TasksPage
    