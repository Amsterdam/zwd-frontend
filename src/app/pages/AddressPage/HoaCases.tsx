import { Heading } from "@amsterdam/design-system-react"
import { useNavigate } from "react-router-dom"
import {
  ColumnType,
  createDateSorter,
  createnumberSorter,
  createStringSorter,
  LinkButton,
  Table
} from "app/components"
import { useHomeownerAssociationCases } from "app/state/rest"
import { formatDate } from "app/utils/dates"
import Section from "./Section"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
}

const columns: ColumnType<Components.Schemas.Case>[] = [
  {
    header: "ID",
    dataIndex: "prefixed_dossier_id",
    sorter: createnumberSorter<Components.Schemas.Case>("id"),
    defaultSortOrder: "DESCEND"
  },
  {
    header: "Status",
    dataIndex: "status",
    sorter: createStringSorter<Components.Schemas.Case>("status")
  },
  {
    header: "Startdatum zaak",
    dataIndex: "created",
    sorter: createDateSorter<Components.Schemas.Case>("created"),
    render: (text) => formatDate(text)
  },
  {
    header: "Laatst gewijzigd",
    dataIndex: "updated",
    sorter: createDateSorter<Components.Schemas.Case>("updated"),
    render: (text) => formatDate(text)
  },
  {
    header: "Einddatum zaak",
    dataIndex: "end_date",
    sorter: createDateSorter<Components.Schemas.Case>("end_date"),
    render: (text) => formatDate(text)
  },
  {
    header: "",
    dataIndex: "id",
    width: 100,
    render: (id) => (
      <LinkButton label="Zaakdetails" to={`/zaken/${id}`} onClick={() => {}} />
    )
  }
]

export const HoaCases: React.FC<Props> = ({ hoaId }) => {
  const [cases, { isBusy }] = useHomeownerAssociationCases(hoaId)
  const navigate = useNavigate()

  const openCases = cases?.filter(
    (caseItem) => caseItem.status !== "Afgesloten"
  )
  const numberOfOpenCases = openCases?.length || 0
  const openColumns = columns.filter(
    (column) => column.dataIndex !== "end_date"
  )
  const closedColumns = columns.filter(
    (column) => column.dataIndex !== "updated"
  )
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
            columns={closedColumns}
            onClickRow={(obj) => void navigate(`/zaken/${obj.id}`)}
          />
        </Section>
      )}
    </>
  )
}

export default HoaCases
