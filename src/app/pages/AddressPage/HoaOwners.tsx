import {
  ColumnType,
  createNumberSorter,
  createStringSorter,
  Table
} from "app/components"
import { Button, Row } from "@amsterdam/design-system-react"
import { useNavigate } from "react-router-dom"

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
      defaultSortOrder: "ASCEND"
    },
    {
      header: "Naam",
      dataIndex: "name",
      sorter: createStringSorter<HomeownerAssociationOwner>("name")
    },
    {
      header: "Aantal woningen",
      dataIndex: "number_of_apartments",
      sorter: createNumberSorter<HomeownerAssociationOwner>(
        "number_of_apartments"
      )
    },
    {
      header: "Percentage woningen",
      dataIndex: "number_of_apartments",
      sorter: createNumberSorter<HomeownerAssociationOwner>(
        "number_of_apartments"
      ),
      render: (_, obj) => `${getPercentage(obj.number_of_apartments, total)}%`
    }
  ] as ColumnType<HomeownerAssociationOwner>[]

export const HoaOwners: React.FC<Props> = ({ hoa }) => {
  const owners = (hoa.owners as unknown as HomeownerAssociationOwner[]) ?? []
  const columns = getColumns(hoa.number_of_apartments)
  const navigate = useNavigate()

  return (
    <>
      <Table
        data={owners}
        columns={columns}
        emptyPlaceholder="Geen eigenaren gevonden"
      />
      <Row style={{ marginTop: "1.5rem" }}>
        <Button
          onClick={() => {
            window.scrollTo(0, 0)
            void navigate(`/vve/${hoa?.id}/woningen`)
          }}
          variant="secondary"
        >
          Bekijk eigenaren per woning
        </Button>
      </Row>
    </>
  )
}

export default HoaOwners
