import { Dialog } from "@amsterdam/design-system-react"
import { useFormSubmissionHandlers } from "./helpers/useFormSubmissionHandlers"
import { FormDialogContent } from "./FormDialogContent"

type Props = {
  dialogId: string
  task: CustomCaseUserTask
  caseId: Components.Schemas.Case["id"]
  closeDialog: () => void
}

export const FormDialog: React.FC<Props> = ({
  dialogId,
  task,
  caseId,
  closeDialog
}) => {
  const { loading, submitForm, submitFormFile } = useFormSubmissionHandlers(
    task.id.toString(),
    caseId
  )

  const { form, name } = task
  const hasForm = form && form.length > 0
  const title = hasForm
    ? `Rond de taak "${name}" af`
    : `Is de taak "${name}" afgerond?`

  return (
    <Dialog id={dialogId} heading={title}>
      <FormDialogContent
        form={form}
        closeDialog={closeDialog}
        loading={loading}
        submitForm={(variables) => {
          void submitForm(variables)
        }}
        submitFormFile={(variables) => {
          void submitFormFile(variables)
        }}
      />
    </Dialog>
  )
}

export default FormDialog
