import { Heading } from "@amsterdam/design-system-react"
import { useNavigate } from "react-router-dom"
import { ColumnType, LinkButton, Table } from "app/components"
import { useHomeownerAssociationCases } from "app/state/rest"
import { formatDate } from "app/utils/dates"
import Section from "./Section"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
}

const columns: ColumnType<Components.Schemas.Case>[] = [
  {
    header: "ID",
    dataIndex: "id",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>
      a?.id - b?.id,
    defaultSortOrder: "DESCEND"
  },
  {
    header: "Status",
    dataIndex: "status",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>
      a.status.localeCompare(b.status)
  },
  {
    header: "Startdatum zaak",
    dataIndex: "created",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>
      a.created.localeCompare(b.created),
    render: (text) => formatDate(text)
  },
  {
    header: "Einddatum zaak",
    dataIndex: "end_date",
    sorter: (a: Components.Schemas.Case, b: Components.Schemas.Case) =>
      a.end_date.localeCompare(b.end_date),
    render: (text) => formatDate(text)
  },
  {
    header: "",
    dataIndex: "id",
    width: 100,
    render: () => <LinkButton label="Zaakdetails" />
  }
]

export const HoaCases: React.FC<Props> = ({ hoaId }) => {
  const [cases, { isBusy }] = useHomeownerAssociationCases(hoaId)
  const navigate = useNavigate()

  const openCases = cases?.filter(
    (caseItem) => caseItem.status !== "Afgesloten"
  )
  const numberOfOpenCases = openCases?.length || 0
  const openColumns = columns.filter((column) => column.dataIndex !== "end_date")
  const closedCases = cases?.filter(
    (caseItem) => caseItem.status === "Afgesloten"
  )
  const numberOfClosedCases = closedCases?.length || 0
  return (
    <>
      <Heading level={2}>
        Open zaken {numberOfOpenCases > 0 && `(${numberOfOpenCases})`}
      </Heading>
      <Table
        data={openCases}
        columns={openColumns}
        emptyPlaceholder="Geen open zaken gevonden"
        loading={isBusy}
        onClickRow={(obj) => void navigate(`/zaken/${obj.id}`)}
      />
      {numberOfClosedCases > 0 && (
        <Section>
          <Heading level={2}>
            Gesloten zaken {`(${numberOfClosedCases})`}
          </Heading>
          <Table
            data={closedCases}
            columns={columns}
            onClickRow={(obj) => void navigate(`/zaken/${obj.id}`)}
          />
        </Section>
      )}
    </>
  )
}

export default HoaCases
