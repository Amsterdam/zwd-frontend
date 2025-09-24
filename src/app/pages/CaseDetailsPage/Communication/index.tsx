import { Row } from "@amsterdam/design-system-react"
import { Annotation } from "./Annotation/Annotation"
import { CreateCommunicationNote } from "./actions/CreateCommunicationNote"
import { CommunicationNotesTable } from "./CommunicationNotesTable/CommunicationNotesTable"

const Communication: React.FC = () => (
  <>
    <Annotation />
    <Row align="end">
      <CreateCommunicationNote />
    </Row>
    <CommunicationNotesTable />
  </>
)

export default Communication
