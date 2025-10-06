import { IconButton } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import dayjs from "dayjs"
import { useParams } from "react-router-dom"
import { useDialog } from "app/hooks"
import { CommunicationNoteDialog } from "./CommunicationNoteDialog"
import { useCommunicationNote } from "app/state/rest"
import { FormValues } from "./types"
import { ISO_DATE_FORMAT_TIME } from "app/utils/dates"

type Props = {
  communicationNote: Components.Schemas.CaseCommunicationNote
}

export const UpdateCommunicationNote: React.FC<Props> = ({
  communicationNote
}) => {
  const dialogId = `update-communication-note-${communicationNote.id}`
  const { caseId } = useParams()
  const { openDialog, closeDialog } = useDialog(dialogId)
  const [, { execPatch }] = useCommunicationNote(
    Number(caseId),
    communicationNote.id
  )

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
