import { Table } from "app/components"
import { useCommunicationNotes } from "app/state/rest"
import { createColumns } from "./columns"

type CommunicationNotesTableProps = {
  hoaId: number
}

export const CommunicationNotesTable: React.FC<
  CommunicationNotesTableProps
> = ({ hoaId }) => {
  const [communicationNotes, { isBusy }] = useCommunicationNotes(hoaId)

  return (
    <Table
      data={
        (communicationNotes ??
          []) as Components.Schemas.HomeownerAssociationCommunicationNote[]
      }
      columns={createColumns(hoaId)}
      emptyPlaceholder="Geen contactmeldingen gevonden"
      loading={isBusy}
    />
  )
}

export default CommunicationNotesTable
