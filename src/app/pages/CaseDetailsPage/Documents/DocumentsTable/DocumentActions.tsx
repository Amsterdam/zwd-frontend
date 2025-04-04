import { IconButton, Row } from "@amsterdam/design-system-react"
import { DownloadIcon, TrashBinIcon } from "@amsterdam/design-system-react-icons"
import { useCaseDocumentDelete } from "app/state/rest"
import { useFetchFile, viewFile, downloadFile } from "app/utils/files"
import { makeApiUrl } from "app/state/rest/hooks/utils"
import { ConfirmationDialog, ViewSvg } from "app/components"
import { useDialog } from "app/hooks"


type Props = {
  record: Components.Schemas.CaseDocument
}

const DoucumentsActions: React.FC<Props> = ({ record }) => {
  const [, { execDelete }] = useCaseDocumentDelete(record.case, record.id)
  const fileUrl = `${ makeApiUrl("cases", record.case, "documents", "download", record.id) }`
  const fetchFile = useFetchFile(fileUrl)
  const dialogId = `confirmation-dialog-${ record.id }`
  const { openDialog } = useDialog(dialogId)

  const handleAction = (isDownload = false) => {
    fetchFile()
      .then((resp) => {
        if (isDownload) {
          downloadFile(resp, record.name)
        } else {
          viewFile(resp)
        }
      })
      .catch((error) => {
        console.error(error)  
      })
  }

  const deleteDocument = () => {
    void execDelete()
  }

  return (
    <Row align="between">
      <IconButton
        label="Bekijk document"
        title="Bekijk document"
        svg={ ViewSvg }
        onClick={() => void handleAction() }
      />
      <IconButton
        label="Download document"
        title="Download document"
        svg={ DownloadIcon }
        onClick={() => handleAction(true) }
      />
      <IconButton
        label="Verwijder document"
        title="Verwijder document"
        svg={ TrashBinIcon }
        onClick={ openDialog }
      />
      <ConfirmationDialog 
        id={ dialogId } 
        title="Document verwijderen" 
        content={ <span>Weet u zeker dat u het document <strong>&quot;{ record.name }&quot;</strong> wilt verwijderen?</span> }
        onOk={ deleteDocument } 
        onOkText="Verwijderen"
      />
    </Row>
  )
}

export default DoucumentsActions
