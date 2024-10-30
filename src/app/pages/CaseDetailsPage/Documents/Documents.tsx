import { Button, Dialog, Heading, Row } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"
import UploadDialog, { UPLOAD_DIALOG_ID } from "./UploadDialog/UploadDialog"


const Documents: React.FC = () => (
  <>
    <Row align="between">
      <Heading level={3}>Documenten</Heading>
      <Button 
        key="id-document-upload" 
        variant="primary" 
        icon={ DownloadIcon } 
        iconBefore 
        onClick={() => Dialog.open(`#${ UPLOAD_DIALOG_ID }`)} 
      >
          Document toevoegen 
      </Button>
    </Row>
    <UploadDialog />
  </>
)

export default Documents
