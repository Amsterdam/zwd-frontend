import { Row } from "@amsterdam/design-system-react"
import { CreateCommunicationNote } from "./actions/CreateCommunicationNote"
import { CommunicationNotesTable } from "./CommunicationNotesTable/CommunicationNotesTable"

type CommunicationProps = {
  hoaId: number
}

const Communication: React.FC<CommunicationProps> = ({ hoaId }) => (
  <>
    <Row align="end" style={{ marginBottom: "1rem" }}>
      <CreateCommunicationNote hoaId={hoaId} />
    </Row>
    <CommunicationNotesTable hoaId={hoaId} />
  </>
)

export default Communication
