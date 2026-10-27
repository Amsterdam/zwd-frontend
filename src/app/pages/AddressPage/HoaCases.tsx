import { useMemo } from "react"
import { Button, Heading, Row } from "@amsterdam/design-system-react"
import { PlusIcon } from "@amsterdam/design-system-react-icons"
import { useNavigate } from "react-router-dom"
import {
  ColumnType,
  createDateSorter,
  createNumberSorter,
  createStringSorter,
  LinkButton,
  Table
} from "app/components"
import { useHomeownerAssociationCases } from "app/state/rest"
import { useNavigateWithModifier } from "app/hooks"
import { formatDate } from "app/utils"

type Case = components["schemas"]["Case"]

type Props = {
  hoaId: components["schemas"]["HomeownerAssociation"]["id"]
}

const CLOSED_STATUSES = new Set<string>(["Afgesloten", "Gearchiveerd"])

const isClosed = (caseItem: Case) => CLOSED_STATUSES.has(caseItem.status)

const columns: ColumnType<Case>[] = [
  {
    header: "ID",
    dataIndex: "prefixed_dossier_id",
    sorter: createNumberSorter<Case>("id"),
    defaultSortOrder: "DESCEND"
  },
  {
    header: "Status",
    dataIndex: "status",
    sorter: createStringSorter<Case>("status")
  },
  {
    header: "Aanvraagdatum",
    dataIndex: "request_date",
    sorter: createDateSorter<Case>("request_date"),
    render: (text) => formatDate(text)
  },
  {
    header: "Laatst gewijzigd",
    dataIndex: "updated",
    sorter: createDateSorter<Case>("updated"),
    render: (text) => formatDate(text)
  },
  {
    header: "Einddatum zaak",
    dataIndex: "end_date",
    sorter: createDateSorter<Case>("end_date"),
    render: (text) => formatDate(text)
  },
  {
    header: "",
    dataIndex: "id",
    width: 110,
    render: (id) => (
      <LinkButton label="Zaakdetails" to={`/zaken/${id}`} onClick={() => {}} />
    )
  }
]

const openColumns = columns.filter((column) => column.dataIndex !== "end_date")
const closedColumns = columns.filter((column) => column.dataIndex !== "updated")

export const HoaCases: React.FC<Props> = ({ hoaId }) => {
  const [cases, { isBusy }] = useHomeownerAssociationCases(hoaId)
  const navigate = useNavigate()
  const navigateWithModifier = useNavigateWithModifier()

  const { openCases, closedCases } = useMemo(() => {
    const open: Case[] = []
    const closed: Case[] = []
    cases?.forEach((caseItem) =>
      (isClosed(caseItem) ? closed : open).push(caseItem)
    )
    return { openCases: open, closedCases: closed }
  }, [cases])

  const handleRowClick = (obj: Case, _index: number, e: React.MouseEvent) =>
    navigateWithModifier(e, `/zaken/${obj.id}`)

  return (
    <>
      <Row align="end">
        <Button
          onClick={() => void navigate(`/vve/${hoaId}/zaken/nieuw`)}
          variant="primary"
          icon={PlusIcon}
          iconBefore
        >
          Nieuwe zaak aanmaken
        </Button>
      </Row>

      <section>
        <Heading level={3} style={{ marginBottom: "1rem" }}>
          Open zaken {openCases.length > 0 && `(${openCases.length})`}
        </Heading>
        <Table
          data={openCases}
          columns={openColumns}
          emptyPlaceholder="Geen open zaken gevonden"
          loading={isBusy}
          onClickRow={handleRowClick}
        />
      </section>

      {closedCases.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <Heading level={3} style={{ marginBottom: "1rem" }}>
            Gesloten zaken ({closedCases.length})
          </Heading>
          <Table
            data={closedCases}
            columns={closedColumns}
            onClickRow={handleRowClick}
          />
        </section>
      )}
    </>
  )
}

export default HoaCases
