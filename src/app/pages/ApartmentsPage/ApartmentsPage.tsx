import { useMemo } from "react"
import { useParams } from "react-router-dom"
import {
  PageGrid,
  PageHeading,
  Table,
  ColumnType,
  createStringSorter,
  createNumberSorter
} from "app/components"
import {
  useHomeownerAssociation,
  useHomeownerAssociationApartments
} from "app/state/rest"
import { HouseIcon } from "@amsterdam/design-system-react-icons"

export const ApartmentsPage: React.FC = () => {
  const { hoaId } = useParams()

  const [hoa] = useHomeownerAssociation(Number(hoaId))
  const [apartments, { isBusy }] = useHomeownerAssociationApartments(
    Number(hoaId)
  )

  const huisnummerRender = (
    _text: string,
    row: components["schemas"]["Apartment"]
  ) => {
    const huisnummer = row.huisnummer ?? ""
    const huisletter = row.huisletter ?? ""
    const toevoeging = row.huisnummertoevoeging
      ? `-${row.huisnummertoevoeging}`
      : ""
    return `${huisnummer}${huisletter}${toevoeging}`
  }

  const columns = useMemo(
    () =>
      [
        {
          header: "Straat",
          dataIndex: "straatnaam",
          sorter:
            createStringSorter<components["schemas"]["Apartment"]>("straatnaam")
        },
        {
          header: "Huisnummer",
          dataIndex: "huisnummer",
          render: huisnummerRender,
          sorter:
            createNumberSorter<components["schemas"]["Apartment"]>("huisnummer")
        },
        {
          header: "Postcode",
          dataIndex: "postcode",
          sorter:
            createStringSorter<components["schemas"]["Apartment"]>("postcode")
        },
        {
          header: "Eigenaar type",
          dataIndex: "eigenaar_type",
          render: (text: string) => text || "-",
          sorter:
            createStringSorter<components["schemas"]["Apartment"]>(
              "eigenaar_type"
            )
        },
        {
          header: "Eigenaar naam",
          dataIndex: "eigenaar_naam",
          render: (text: string) => text || "-",
          sorter:
            createStringSorter<components["schemas"]["Apartment"]>(
              "eigenaar_naam"
            )
        }
      ] satisfies ColumnType<components["schemas"]["Apartment"]>[],
    []
  )

  return (
    <PageGrid>
      <PageHeading
        label={`Woningen ${hoa?.number_of_apartments ? `(${hoa?.number_of_apartments})` : ""} — ${hoa?.name}`}
        icon={HouseIcon}
        backLinkUrl={`/vve/${hoaId}`}
        backLinkLabel="Terug naar VvE"
      />
      <Table<components["schemas"]["Apartment"]>
        columns={columns}
        data={apartments ?? []}
        loading={isBusy}
        pagination={{ pageSize: 100 }}
      />
    </PageGrid>
  )
}

export default ApartmentsPage
