import { Button, Row } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"
import UploadDialog from "./UploadDialog/UploadDialog"
import DocumentsTable from "./DocumentsTable/DocumentsTable"
import { useConfirmDialog } from "app/hooks"


const Documents: React.FC = () => {
  const dialogId = "ams-dialog-form-document-upload"
  const { openDialog } = useConfirmDialog(dialogId)
  return (
    <>
      <Row align="end">
        <Button 
          key="id-document-upload" 
          variant="primary" 
          icon={ DownloadIcon } 
          iconBefore 
          onClick={ openDialog } 
        >
          Document toevoegen 
        </Button>
      </Row>
      <UploadDialog id={ dialogId }/>
      <DocumentsTable />
    </>
  )
}

export default Documents
