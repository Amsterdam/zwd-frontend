import { IconButton } from "@amsterdam/design-system-react"
import { TrashBinIcon } from "@amsterdam/design-system-react-icons"
import { useDialog } from "app/hooks"
import { useCommunicationNote } from "app/state/rest"
import { ConfirmationDialog } from "app/components"

type Props = {
  hoaId: number
  communicationNote: Components.Schemas.HomeownerAssociationCommunicationNote
}

export const DeleteCommunicationNote: React.FC<Props> = ({
  hoaId,
  communicationNote
}) => {
  const [, { execDelete }] = useCommunicationNote(hoaId, communicationNote.id)
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

export default DeleteCommunicationNote
