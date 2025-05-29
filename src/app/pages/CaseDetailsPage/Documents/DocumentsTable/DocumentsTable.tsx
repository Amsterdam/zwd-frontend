import { useParams } from "react-router-dom"
import {
  ColumnType,
  createDateSorter,
  createStringSorter,
  Table
} from "app/components"
import { useCaseDocuments } from "app/state/rest"
import { formatDate } from "app/utils/dates"
import DoucumentsActions from "./DocumentActions"

const columns: ColumnType<Components.Schemas.CaseDocument>[] = [
  {
    header: "Naam",
    dataIndex: "name",
    sorter: createStringSorter<Components.Schemas.CaseDocument>("name")
  },
  {
    header: "Aangemaakt op",
    dataIndex: "created",
    sorter: createDateSorter<Components.Schemas.CaseDocument>("created"),
    render: (text) => formatDate(text, true),
    defaultSortOrder: "DESCEND"
  },
  {
    header: "",
    dataIndex: "id",
    width: 80,
    render: (_, record) => <DoucumentsActions record={record} />
  }
]

const DocumentsTable: React.FC = () => {
  const { caseId } = useParams()
  const [documents, { isBusy }] = useCaseDocuments(Number(caseId))

  return (
    <Table
      data={documents ?? []}
      columns={columns}
      emptyPlaceholder="Geen documenten gevonden"
      loading={isBusy}
    />
  )
}

export default DocumentsTable
