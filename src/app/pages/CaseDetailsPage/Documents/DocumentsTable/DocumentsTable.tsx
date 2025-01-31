import { useParams } from "react-router-dom"
import { ColumnType, Table } from "app/components"
import { useCaseDocuments } from "app/state/rest"
import { formatDate } from "app/utils/dates"
import DoucumentsActions from "./DocumentActions"


const columns: ColumnType<Components.Schemas.CaseDocument>[] = [
  {
    header: "Naam",
    dataIndex: "name",
    sorter: (a: Components.Schemas.CaseDocument, b: Components.Schemas.CaseDocument): number => {
      const nameA = (a?.name as string | undefined) ?? ""
      const nameB = (b?.name as string | undefined) ?? ""
      return nameA.localeCompare(nameB)
    }
  }, {
    header: "Aangemaakt op",
    dataIndex: "created",
    sorter: (a: Components.Schemas.CaseDocument, b: Components.Schemas.CaseDocument): number => {
      const createdA = (a?.created as string | undefined) ?? ""
      const createdB = (b?.created as string | undefined) ?? ""
      return createdA.localeCompare(createdB)
    },
    render: (text) => formatDate(text, true),
    defaultSortOrder: "DESCEND"
  }, {
    header: "",
    dataIndex: "id",
    width: 80,
    render: (_, record) => (
      <DoucumentsActions record={ record } />
    )
  }
]

const DocumentsTable: React.FC = () => {
  const { caseId } = useParams()
  const [documents, { isBusy }] = useCaseDocuments(Number(caseId))

  return (
    <Table
      data={ documents ?? [] }
      columns={ columns }
      emptyPlaceholder="Geen documenten gevonden"
      loading={ isBusy }
    />
  )
}

export default DocumentsTable
