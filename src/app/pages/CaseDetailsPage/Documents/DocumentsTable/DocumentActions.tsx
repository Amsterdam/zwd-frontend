import { DownloadIcon, EyeOpenIcon } from "@amsterdam/design-system-react-icons"
import { viewFile, downloadFile, canViewInline } from "app/utils/files"
import UpdateDocument from "../UpdateDocument/UpdateDocument"
import DeleteDocument from "../DeleteDocument/DeleteDocument"
import DocumentActionButton from "./DocumentActionButton"

type Props = {
  record: Components.Schemas.CaseDocument
}

const DocumentsActions: React.FC<Props> = ({ record }) => (
  <div style={{ display: "flex", gap: "0.8rem" }}>
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
  </div>
)

export default DocumentsActions
