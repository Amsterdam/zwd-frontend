import { Dialog } from "@amsterdam/design-system-react"
import {
  Form,
  FormActionButtons,
  TextAreaField,
  DateInputField,
  TextInputField
} from "app/components"
import { validationRequired } from "app/utils/validation"
import { FormValues } from "./types"

type Props = {
  dialogId: string
  defaultValues: FormValues
  heading: string
  onSubmit: (values: FormValues) => void
  okText: string
}

export const CommunicationNoteDialog: React.FC<Props> = ({
  dialogId,
  defaultValues,
  heading,
  onSubmit,
  okText
}) => (
  <Dialog id={dialogId} heading={heading}>
    <Form<FormValues>
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      formGrid={{ narrow: 4, medium: 8, wide: 12 }}
    >
      <DateInputField
        name="date"
        label="Datum"
        type="datetime-local"
        validation={validationRequired}
      />
      <TextInputField
        name="author_name"
        label="Naam"
        validation={validationRequired}
      />
      <TextAreaField
        name="note"
        label="Notitie"
        validation={validationRequired}
      />
      <FormActionButtons
        name="actions"
        okText={okText}
        cancelText="Annuleer"
        onCancel={Dialog.close}
      />
    </Form>
  </Dialog>
)

export default CommunicationNoteDialog
