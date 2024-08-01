import { Heading } from "@amsterdam/design-system-react"
import { useCases } from "app/state/rest"
import { ColumnType, Table } from "app/components"

const columns: ColumnType<Components.Schemas.Case>[] = [
  {
    header: "ID",
    dataIndex: "id",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>  a?.id - b?.id
  }, {
    header: "Description",
    dataIndex: "description",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) => a.description.localeCompare(b.description),    
    defaultSortOrder: "DESCEND"
  }
]

export const CasesPage: React.FC = () => {
  const [data, { isBusy }] = useCases()

  return (
    <>
      <Heading level={ 3 } >
        Zakenoverzicht
      </Heading>
      <Table 
        columns={ columns } 
        data={ data } 
        loading={ isBusy }
      />
    </>
  )
}

export default CasesPage
    