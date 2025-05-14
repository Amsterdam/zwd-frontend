import { IconButton, Row } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"
import {
  useFetchFile,
  viewFile,
  downloadFile,
  canViewInline
} from "app/utils/files"
import { makeApiUrl } from "app/state/rest/hooks/utils"
import { ViewSvg } from "app/components"
import UpdateDocument from "../UpdateDocument/UpdateDocument"
import DeleteDocument from "../DeleteDocument/DeleteDocument"

type Props = {
  record: Components.Schemas.CaseDocument
}

const DoucumentsActions: React.FC<Props> = ({ record }) => {
  const fileUrl = `${makeApiUrl("cases", record.case, "documents", "download", record.id)}`
  const fetchFile = useFetchFile(fileUrl)

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

  return (
    <Row align="end">
      {canViewInline(record.document) && (
        <IconButton
          label="Bekijk document"
          title="Bekijk document"
          svg={ViewSvg}
          onClick={() => void handleAction()}
        />
      )}
      <UpdateDocument record={record} />
      <IconButton
        label="Download document"
        title="Download document"
        svg={DownloadIcon}
        onClick={() => handleAction(true)}
      />
      <DeleteDocument record={record} />
    </Row>
  )
}

export default DoucumentsActions
