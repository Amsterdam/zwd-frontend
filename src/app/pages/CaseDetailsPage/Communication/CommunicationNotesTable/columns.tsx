import {
  ColumnType,
  createDateSorter,
  createStringSorter
} from "app/components"
import { DateTime } from "app/components"
import DeleteCommunicationNote from "../actions/DeleteCommunicationNote"
import UpdateCommunicationNote from "../actions/UpdateCommunicationNote"

type CommunicationNote = Components.Schemas.CaseCommunicationNote

export const columns: ColumnType<CommunicationNote>[] = [
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
    sorter: createStringSorter<CommunicationNote>("note")
  },
  {
    header: "",
    dataIndex: "id",
    width: 80,
    render: (_, record) => (
      <div style={{ display: "flex", gap: "0.8rem" }}>
        <UpdateCommunicationNote communicationNote={record} />
        <DeleteCommunicationNote communicationNote={record} />
      </div>
    )
  }
]
