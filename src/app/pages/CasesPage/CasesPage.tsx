import { useCases } from "app/state/rest"
import { ColumnType, Table, PageHeading, RouterLink } from "app/components"
import { useNavigate } from "react-router-dom"

const columns: ColumnType<Components.Schemas.Case>[] = [
  {
    header: "ID",
    dataIndex: "id",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>  a?.id - b?.id,    
    defaultSortOrder: "DESCEND"
  }, {
    header: "Description",
    dataIndex: "description",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) => (
      a?.description && b?.description ? a.description.localeCompare(b.description) : -1
    )
  }, {
    header: "",
    dataIndex: "id",
    minWidth: 170,
    render: () => <RouterLink label="Zaakdetails" path="" />
  }
]

export const CasesPage: React.FC = () => {
  const [data, { isBusy }] = useCases()
  const navigate = useNavigate()

  return (
    <>
      <PageHeading label="Zakenoverzicht" />
      <Table 
        columns={ columns } 
        data={ data as Components.Schemas.Case[] } 
        loading={ isBusy }
        onClickRow={(obj) => navigate(`/zaken/${ obj.id }`)}
      />
    </>
  )
}

export default CasesPage
    