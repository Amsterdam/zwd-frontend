import { Heading } from "@amsterdam/design-system-react"
import {
  ColumnType,
  createnumberSorter,
  createStringSorter,
  Table
} from "app/components"

type HomeownerAssociationOwner = {
  homeowner_association: number
  id: number
  name: string
  number_of_apartments: number
  type: string
}

type Props = {
  hoa: Components.Schemas.HomeownerAssociation
}

const getPercentage = (value: number, total: number) =>
  total === 0 ? 0 : Math.round((value / total) * 100)

const getColumns = (total: number) =>
  [
    {
      header: "Type",
      dataIndex: "type",
      sorter: createStringSorter<HomeownerAssociationOwner>("type"),
      defaultSortOrder: "DESCEND"
    },
    {
      header: "Naam",
      dataIndex: "name",
      sorter: createStringSorter<HomeownerAssociationOwner>("name")
    },
    {
      header: "Aantal woningen",
      dataIndex: "number_of_apartments",
      sorter: createnumberSorter<HomeownerAssociationOwner>(
        "number_of_apartments"
      )
    },
    {
      header: "Percentage woningen",
      dataIndex: "number_of_apartments",
      sorter: createnumberSorter<HomeownerAssociationOwner>(
        "number_of_apartments"
      ),
      render: (_, obj) => `${getPercentage(obj.number_of_apartments, total)}%`
    }
  ] as ColumnType<HomeownerAssociationOwner>[]

export const HoaOwners: React.FC<Props> = ({ hoa }) => {
  const owners = (hoa.owners as unknown as HomeownerAssociationOwner[]) ?? []
  const columns = getColumns(hoa.number_of_apartments)
  return (
    <>
      <Heading level={2}>Eigenaren</Heading>
      <Table
        data={owners}
        columns={columns}
        emptyPlaceholder="Geen eigenaren gevonden"
      />
    </>
  )
}

export default HoaOwners
