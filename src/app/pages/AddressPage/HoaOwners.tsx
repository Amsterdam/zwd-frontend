import { Heading } from "@amsterdam/design-system-react"
import { ColumnType, Table } from "app/components"


type HomeownerAssociationOwner = {
  homeowner_association: number
  id: number
  name: string
  number_of_appartments: number
  type: string
}

type Props = {
  hoa: Components.Schemas.HomeownerAssociation
}

const getPercentage = (value: number, total: number) => total === 0 ? 0 : Math.round((value / total) * 100)

const getColumns = (total: number) => (
  [{
    header: "Type",
    dataIndex: "type",
    sorter: (a: HomeownerAssociationOwner, b: HomeownerAssociationOwner) => a.type.localeCompare(b.type),
    defaultSortOrder: "DESCEND"
  }, {
    header: "Naam",
    dataIndex: "name",
    sorter: (a: HomeownerAssociationOwner, b: HomeownerAssociationOwner) => {
      const nameA = (a?.name as string | undefined) ?? ""
      const nameB = (b?.name as string | undefined) ?? ""
      return nameA.localeCompare(nameB)
    }
  }, {
    header: "Aantal woningen",
    dataIndex: "number_of_appartments",
    sorter: (a: HomeownerAssociationOwner, b: HomeownerAssociationOwner) => (
      a.number_of_appartments - b.number_of_appartments
    )
  }, {
    header: "Percentage woningen",
    dataIndex: "number_of_appartments",
    sorter: (a: HomeownerAssociationOwner, b: HomeownerAssociationOwner) => (
      a.number_of_appartments - b.number_of_appartments
    ),
    render: (_, obj) => (
      `${ getPercentage(obj.number_of_appartments, total) }%`
    )
  }]) as ColumnType<HomeownerAssociationOwner>[]

export const HoaOwners: React.FC<Props> = ({ hoa }) => {
  const owners = (hoa.owners as unknown as HomeownerAssociationOwner[]) ?? []
  const columns = getColumns(hoa.number_of_appartments)
  return (
    <>
      <Heading level={2}>Eigenaren</Heading>
      <Table
        data={ owners }
        columns={ columns }
        emptyPlaceholder="Geen eigenaren gevonden"
      />    
    </>
  )
}

export default HoaOwners
