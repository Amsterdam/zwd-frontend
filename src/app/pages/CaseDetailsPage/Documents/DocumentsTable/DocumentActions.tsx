import { Row } from "@amsterdam/design-system-react"
import { DownloadIcon, EyeOpenIcon } from "@amsterdam/design-system-react-icons"
import { viewFile, downloadFile, canViewInline } from "app/utils/files"
import UpdateDocument from "../UpdateDocument/UpdateDocument"
import DeleteDocument from "../DeleteDocument/DeleteDocument"
import DocumentActionButton from "./DocumentActionButton"

type Props = {
  record: Components.Schemas.CaseDocument
}

const DocumentsActions: React.FC<Props> = ({ record }) => (
  <Row align="end" alignVertical="center">
    {canViewInline(record.document) && (
      <DocumentActionButton
        record={record}
        icon={EyeOpenIcon}
        label="Bekijk document"
        onFile={viewFile}
      />
    )}
    <UpdateDocument record={record} />
    <DocumentActionButton
      record={record}
      icon={DownloadIcon}
      label="Download document"
      onFile={(file) => downloadFile(file, record.name)}
    />
    <DeleteDocument record={record} />
  </Row>
)

export default DocumentsActions
