import {
  ColumnType,
  createDateSorter,
  createStringSorter
} from "app/components"
import { DateTime } from "app/components"
import DeleteCommunicationNote from "../actions/DeleteCommunicationNote"
import UpdateCommunicationNote from "../actions/UpdateCommunicationNote"
import { formatTextWithLineBreaks } from "app/utils/text.tsx"


type CommunicationNote = Components.Schemas.HomeownerAssociationCommunicationNote

export const createColumns = (hoaId: number): ColumnType<CommunicationNote>[] => [
  {
    header: "Datum",
    dataIndex: "date",
    sorter: createDateSorter<CommunicationNote>("date"),
    defaultSortOrder: "DESCEND",
    render: (text) => <DateTime text={text} includeTime />
  },
  {
    header: "Naam",
    dataIndex: "author_name",
    sorter: createStringSorter<CommunicationNote>("author_name")
  },
  {
    header: "Notitie",
    dataIndex: "note",
    sorter: createStringSorter<CommunicationNote>("note"),
    render: (text) => formatTextWithLineBreaks(text),
  },
  {
    header: "",
    dataIndex: "id",
    width: 80,
    render: (_, record) => (
      <div style={{ display: "flex", gap: "0.8rem" }}>
        <UpdateCommunicationNote hoaId={hoaId} communicationNote={record} />
        <DeleteCommunicationNote hoaId={hoaId} communicationNote={record} />
      </div>
    )
  }
]
