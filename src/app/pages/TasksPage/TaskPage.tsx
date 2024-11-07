import { useNavigate } from "react-router-dom"
import { ColumnType, LinkButton, PageHeading, Table } from "app/components"
import { useTasks } from "app/state/rest"
import { formatDate } from "app/utils/dates"


const columns: ColumnType<Components.Schemas.CaseUserTask>[] = [
  {
    header: "Taak ID",
    dataIndex: "id",
    sorter: (a: Components.Schemas.CaseUserTask, b: Components.Schemas.CaseUserTask) =>  a?.id - b?.id,    
    defaultSortOrder: "DESCEND",
    width: 100
  }, {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association",
    sorter: (a: Components.Schemas.CaseUserTask, b: Components.Schemas.CaseUserTask) => (
      a?.homeowner_association && b?.homeowner_association ? a.homeowner_association.localeCompare(b.homeowner_association) : -1
    )
  }, {
    header: "Open taak",
    dataIndex: "name",
    sorter: (a: Components.Schemas.CaseUserTask, b: Components.Schemas.CaseUserTask) => (
      a.name.localeCompare(b.name)
    )
  }, {
    header: "Aangemaakt",
    dataIndex: "created",
    width: 130,
    sorter: (a: Components.Schemas.CaseUserTask, b: Components.Schemas.CaseUserTask) => (
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

export const TasksPage: React.FC = () => {
  const [data, { isBusy }] = useTasks()
  const navigate = useNavigate()
  
  return (
    <>
      <PageHeading label="Takenoverzicht" />
      <Table 
        columns={ columns } 
        data={ data as Components.Schemas.CaseUserTask[] } 
        loading={ isBusy }
        onClickRow={(obj) => navigate(`/zaken/${ obj.case }`)}
      />
    </>
  )
}

export default TasksPage
    