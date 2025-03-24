import { Heading } from "@amsterdam/design-system-react"
import { ColumnType, LinkButton, Table } from "app/components"
import { useHomeownerAssociationCases } from "app/state/rest"
import { formatDate } from "app/utils/dates"
import { useNavigate } from "react-router-dom"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
}

const columns: ColumnType<Components.Schemas.Case>[] = [
  {
    header: "ID",
    dataIndex: "id",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>  a?.id - b?.id,    
    defaultSortOrder: "DESCEND"
  }, {
    header: "Status",
    dataIndex: "status"
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

export const HoaCases: React.FC<Props> = ({ hoaId }) => {
  const [cases, { isBusy }] = useHomeownerAssociationCases(hoaId)
  const navigate = useNavigate()
  const numCases = cases?.length || 0

  return (
    <>
      <Heading level={2}>Zaken{ numCases > 0 && ` (${ numCases })` }</Heading>
      <Table
        data={ cases } 
        columns={ columns }
        emptyPlaceholder="Geen open zaken gevonden"
        loading={ isBusy }
        onClickRow={(obj) => void navigate(`/zaken/${ obj.id }`)}
      />    
    </>
  )
}

export default HoaCases
