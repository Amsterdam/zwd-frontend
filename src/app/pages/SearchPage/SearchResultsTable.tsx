import { ColumnType, Table, RouterLink } from "app/components"
import { vveList } from "app/dummy_data/vveList"
import { useNavigate } from "react-router-dom"


type Vve = {
  id: number
  vve_statutaire_naam: string
}

const columns: ColumnType<Vve>[] = [
  {
    header: "ID",
    dataIndex: "id"
  }, {
    header: "Statutaire naam",
    dataIndex: "vve_statutaire_naam"
  }, {
    header: "",
    dataIndex: "id",
    minWidth: 125,
    render: (id) => <RouterLink label="Start traject" path={ `vve/${ id }/zaken/nieuw` } />
  }
]

export const SearchResultsTable: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <br/>
      <Table 
        columns={ columns } 
        data={ vveList } 
        loading={ false }
        onClickRow={(_, id) => navigate(`vve/${ id }/zaken/nieuw`)}
      />
    </>
  )
}

export default SearchResultsTable
    