import { Button, Dialog, Row } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"
import UploadDialog, { UPLOAD_DIALOG_ID } from "./UploadDialog/UploadDialog"
import DocumentsTable from "./DocumentsTable/DocumentsTable"


const Documents: React.FC = () => (
  <>
    <Row align="end">
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
    <DocumentsTable />
  </>
)

export default Documents
