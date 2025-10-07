import dayjs from "dayjs"
import { Button } from "@amsterdam/design-system-react"
import { PlusIcon } from "@amsterdam/design-system-react-icons"
import { useDialog, useUserFullName } from "app/hooks"
import { CommunicationNoteDialog } from "./CommunicationNoteDialog"
import { ISO_DATE_FORMAT_TIME } from "app/utils/dates"
import { useCommunicationNotes } from "app/state/rest"
import type { FormValues } from "./types"

type CreateCommunicationNoteProps = {
  hoaId: number
}

export const CreateCommunicationNote: React.FC<CreateCommunicationNoteProps> = ({ hoaId }) => {
  const dialogId = "create-communication-note"
  const { openDialog, closeDialog } = useDialog(dialogId)
  const userFullName = useUserFullName()
  const [, { execPost }] = useCommunicationNotes(hoaId)

  const defaultValues = {
    date: dayjs().format(ISO_DATE_FORMAT_TIME),
    author_name: userFullName || "",
    note: ""
  }

  const onSubmit = (values: FormValues) => {
    void execPost({
      date: dayjs(values.date).toISOString(),
      author_name: values.author_name,
      note: values.note
    }).then(() => {
      closeDialog()
    })
  }

  return (
    <>
      <Button variant="primary" icon={PlusIcon} iconBefore onClick={openDialog}>
        Contactmelding toevoegen
      </Button>
      <CommunicationNoteDialog
        dialogId={dialogId}
        defaultValues={defaultValues}
        heading="Nieuwe contactmelding"
        okText="Toevoegen"
        onSubmit={onSubmit}
      />
    </>
  )
}

export default CreateCommunicationNote
