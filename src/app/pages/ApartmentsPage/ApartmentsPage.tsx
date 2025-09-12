import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { PageGrid, PageHeading, Table, ColumnType, createStringSorter, createNumberSorter, DetailsList, RouterLink } from "app/components"
import { useHomeownerAssociation, useHomeownerAssociationApartments } from "app/state/rest"
import { HouseIcon } from "@amsterdam/design-system-react-icons"


export const ApartmentsPage: React.FC = () => {
  const { hoaId } = useParams()

  const [hoa] = useHomeownerAssociation(Number(hoaId))
  const [apartments, { isBusy }] = useHomeownerAssociationApartments(Number(hoaId))

  const huisnummerRender = (_text: string, row: Components.Schemas.Apartment) => {
    const huisnummer = row.huisnummer ?? ""
    const huisletter = row.huisletter ?? ""
    const toevoeging = row.huisnummertoevoeging ? `-${row.huisnummertoevoeging}` : ""
    return `${huisnummer}${huisletter}${toevoeging}`
  }

  const columns = useMemo(() => ([
    { 
      header: "Straat",
      dataIndex: "straatnaam",
      width: 200,
      sorter: createStringSorter<Components.Schemas.Apartment>("straatnaam"),
    },
    { 
      header: "Huisnummer",
      dataIndex: "huisnummer",
      width: 80,
      render: huisnummerRender,
      sorter: createNumberSorter<Components.Schemas.Apartment>("huisnummer"),
    },
    { 
      header: "Postcode",
      dataIndex: "postcode",
      width: 80,
      sorter: createStringSorter<Components.Schemas.Apartment>("postcode"),
    },
    { 
      header: "Eigenaar type",
      dataIndex: "eigenaar_type",
      width: 140,
      render: (text: string) => text || "-",
      sorter: createStringSorter<Components.Schemas.Apartment>("eigenaar_type"),
    },
    {
      header: "Eigenaar naam",
      dataIndex: "eigenaar_naam",
      width: 140,
      render: (text: string) => text || "-",
      sorter: createStringSorter<Components.Schemas.Apartment>("eigenaar_naam"),
    },
  ] satisfies ColumnType<Components.Schemas.Apartment>[]), [])

  return (
    <PageGrid>
      <PageHeading label={`Woningen ${hoa?.number_of_apartments ? `(${hoa?.number_of_apartments})` : ""}`} icon={HouseIcon} />
      <DetailsList
        data={[
          { term: "Vve statutaire naam", details: <RouterLink to={`/vve/${hoa?.id}`}>{hoa?.name}</RouterLink> },
          { term: "Aantal woningen", details: hoa?.number_of_apartments },
        ]}
      />
      <Table<Components.Schemas.Apartment>
        columns={columns}
        data={apartments ?? []}
        loading={isBusy}
        pagination={{ pageSize: 100 }}
      />
    </PageGrid>
  )
}

export default ApartmentsPage
