import { useParams } from "react-router-dom"
import { Table } from "app/components"
import { useCommunicationNotes } from "app/state/rest"
import { columns } from "./columns"

export const CommunicationNotesTable: React.FC = () => {
  const { caseId } = useParams()
  const [communicationNotes, { isBusy }] = useCommunicationNotes(Number(caseId))

  return (
    <Table
      data={
        (communicationNotes ?? []) as Components.Schemas.CaseCommunicationNote[]
      }
      columns={columns}
      emptyPlaceholder="Geen contactmeldingen gevonden"
      loading={isBusy}
    />
  )
}

export default CommunicationNotesTable
