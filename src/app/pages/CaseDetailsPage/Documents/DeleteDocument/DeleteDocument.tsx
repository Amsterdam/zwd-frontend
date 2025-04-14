import { IconButton } from "@amsterdam/design-system-react"
import { TrashBinIcon } from "@amsterdam/design-system-react-icons"
import { useCaseDocumentDelete } from "app/state/rest"
import { ConfirmationDialog } from "app/components"
import { useDialog } from "app/hooks"

type Props = {
  record: Components.Schemas.CaseDocument
}

export const DeleteDocument: React.FC<Props> = ({ record }) => {
  const [, { execDelete }] = useCaseDocumentDelete(record.case, record.id)
  const dialogId = `confirmation-dialog-${record.id}`
  const { openDialog } = useDialog(dialogId)

  const deleteDocument = () => {
    void execDelete()
  }

  return (
    <>
      <IconButton
        label="Verwijder document"
        title="Verwijder document"
        svg={TrashBinIcon}
        onClick={openDialog}
      />
      <ConfirmationDialog
        id={dialogId}
        title="Document verwijderen"
        content={
          <span>
            Weet u zeker dat u het document{" "}
            <strong>&quot;{record.name}&quot;</strong> wilt verwijderen?
          </span>
        }
        onOk={deleteDocument}
        onOkText="Verwijderen"
      />
    </>
  )
}

export default DeleteDocument
