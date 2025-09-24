import { IconButton } from "@amsterdam/design-system-react"
import { TrashBinIcon } from "@amsterdam/design-system-react-icons"
import { useParams } from "react-router-dom"
import { useDialog } from "app/hooks"
import { useCommunicationNote } from "app/state/rest"
import { ConfirmationDialog } from "app/components"

type Props = {
  communicationNote: Components.Schemas.CaseCommunicationNote
}

export const UpdateCommunicationNote: React.FC<Props> = ({
  communicationNote
}) => {
  const { caseId } = useParams()
  const [, { execDelete }] = useCommunicationNote(
    Number(caseId),
    communicationNote.id
  )
  const dialogId = `delete-communication-note-${communicationNote.id}`
  const { openDialog } = useDialog(dialogId)

  const onConfirm = () => {
    void execDelete()
  }

  return (
    <>
      <IconButton
        label="Verwijder contactmelding"
        title="Verwijder contactmelding"
        svg={TrashBinIcon}
        onClick={openDialog}
        size="large"
      />
      <ConfirmationDialog
        id={dialogId}
        title="Contactmelding verwijderen"
        content={
          <span>
            Weet u zeker dat u de contactmelding van{" "}
            <strong>&quot;{communicationNote.author_name}&quot;</strong> wilt
            verwijderen?
          </span>
        }
        onOk={onConfirm}
        onOkText="Verwijderen"
      />
    </>
  )
}

export default UpdateCommunicationNote
