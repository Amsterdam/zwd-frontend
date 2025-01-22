import { useCases } from "app/state/rest"
import { ColumnType, Table, PageHeading, LinkButton } from "app/components"
import { useNavigate } from "react-router-dom"
import { formatDate } from "app/utils/dates"

const columns: ColumnType<Components.Schemas.Case>[] = [
  {
    header: "ID",
    dataIndex: "id",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>  a?.id - b?.id,    
    defaultSortOrder: "DESCEND"
  }, {
    header: "Vve statutaire naam",
    dataIndex: "homeowner_association.name",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) => {
      const nameA = (a?.homeowner_association?.name as string | undefined) ?? ""
      const nameB = (b?.homeowner_association?.name as string | undefined) ?? ""
      return (
        nameA.localeCompare(nameB)
      )
    }
  }, {
    header: "Startdatum zaak",
    dataIndex: "created",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) => (
      a.created.localeCompare(b.created)
    ),
    render: (text) => formatDate(text)
  }, {
    header: "",
    dataIndex: "id",
    width: 100,
    render: () => <LinkButton label="Zaakdetails" />
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
    