import { IconButton } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import dayjs from "dayjs"
import { useDialog } from "app/hooks"
import { CommunicationNoteDialog } from "./CommunicationNoteDialog"
import { useCommunicationNote } from "app/state/rest"
import { FormValues } from "./types"
import { ISO_DATE_FORMAT_TIME } from "app/utils/dates"

type Props = {
  hoaId: number
  communicationNote: Components.Schemas.HomeownerAssociationCommunicationNote
}

export const UpdateCommunicationNote: React.FC<Props> = ({
  hoaId,
  communicationNote
}) => {
  const dialogId = `update-communication-note-${communicationNote.id}`
  const { openDialog, closeDialog } = useDialog(dialogId)
  const [, { execPatch }] = useCommunicationNote(hoaId, communicationNote.id)

  const defaultValues = {
    date: dayjs(communicationNote.date).format(ISO_DATE_FORMAT_TIME),
    author_name: communicationNote.author_name,
    note: communicationNote.note
  }

  const onSubmit = (values: FormValues) => {
    void execPatch({
      date: dayjs(values.date).toISOString(),
      author_name: values.author_name,
      note: values.note
    }).then(() => {
      closeDialog()
    })
  }

  return (
    <>
      <IconButton
        label="Wijzig contactmelding"
        title="Wijzig contactmelding"
        svg={PencilIcon}
        onClick={openDialog}
        size="large"
      />
      <CommunicationNoteDialog
        dialogId={dialogId}
        defaultValues={defaultValues}
        heading="Wijzig contactmelding"
        okText="Opslaan"
        onSubmit={onSubmit}
      />
    </>
  )
}

export default UpdateCommunicationNote
