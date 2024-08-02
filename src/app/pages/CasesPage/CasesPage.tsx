import { useCases } from "app/state/rest"
import { ColumnType, Table, PageHeading } from "app/components"

const columns: ColumnType<Components.Schemas.Case>[] = [
  {
    header: "ID",
    dataIndex: "id",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>  a?.id - b?.id
  }, {
    header: "Description",
    dataIndex: "description",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) => (
      a?.description && b?.description ? a.description.localeCompare(b.description) : -1
    ),    
    defaultSortOrder: "DESCEND"
  }
]

export const CasesPage: React.FC = () => {
  const [data, { isBusy }] = useCases()

  return (
    <>
      <PageHeading label="Zakenoverzicht" />
      <Table 
        columns={ columns } 
        data={ data as Components.Schemas.Case[] } 
        loading={ isBusy }
      />
    </>
  )
}

export default CasesPage
    