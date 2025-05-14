import { Button, Row } from "@amsterdam/design-system-react"
import { EnlargeIcon } from "@amsterdam/design-system-react-icons"
import UploadDialog from "./UploadDialog/UploadDialog"
import DocumentsTable from "./DocumentsTable/DocumentsTable"
import { useDialog } from "app/hooks"

const Documents: React.FC = () => {
  const dialogId = "ams-dialog-form-document-upload"
  const { openDialog } = useDialog(dialogId)
  return (
    <>
      <Row align="end">
        <Button
          key="id-document-upload"
          variant="primary"
          icon={EnlargeIcon}
          iconBefore
          onClick={openDialog}
        >
          Document toevoegen
        </Button>
      </Row>
      <UploadDialog id={dialogId} />
      <DocumentsTable />
    </>
  )
}

export default Documents
