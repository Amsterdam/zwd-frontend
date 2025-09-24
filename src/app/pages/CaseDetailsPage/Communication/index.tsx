import { Row } from "@amsterdam/design-system-react"
import { CreateCommunicationNote } from "./actions/CreateCommunicationNote"
import { CommunicationNotesTable } from "./CommunicationNotesTable/CommunicationNotesTable"

const Communication: React.FC = () => (
  <>
    <Row align="end">
      <CreateCommunicationNote />
    </Row>
    <CommunicationNotesTable />
  </>
)

export default Communication
