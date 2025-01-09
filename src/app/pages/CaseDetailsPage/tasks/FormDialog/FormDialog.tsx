import { useState } from "react"
import { Dialog } from "@amsterdam/design-system-react"
import { useTaskComplete, useTaskCompleteFileUpload } from "app/state/rest"
import {
  CompletedTaskForm,
  ComletedTaskFormData
} from "./forms/CompletedTaskForm"
import { GenericTaskForm } from "./forms/GenericTaskForm"
import { FileTaskForm } from "./forms/FileTaskForm"
import hasFormTypeFile from "./helpers/hasFormTypeFile"
import type { FormItem, GenericTaskFormData } from "./forms/types"

export type Props = {
  dialogId: string
  task: Omit<Components.Schemas.CaseUserTask, "form"> & {
    form?: FormItem[] // Form is generated as any
  }
  caseId: Components.Schemas.Case["id"]
  closeDialog: () => void
}

export const FormDialog: React.FC<Props> = ({
  dialogId,
  task,
  caseId,
  closeDialog
}) => {
  const [loading, setLoading] = useState(false)
  const [, { execPost }] = useTaskComplete({ lazy: true })
  const [, { execPost: execPostFile }] = useTaskCompleteFileUpload()

  const submitForm = (
    variables: ComletedTaskFormData | GenericTaskFormData
  ) => {
    setLoading(true)
    const values = {
      case_user_task_id: task?.id.toString(),
      case: caseId,
      variables: variables
    }

    execPost(values)
      .then((resp) => {
        console.log("Succes:", resp)
      })
      .catch((err) => {
        console.log("Error creating task:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const submitFormFile = (variables: GenericTaskFormData) => {
    if (
      !(
        Array.isArray(variables.uploadValue) &&
        variables.uploadValue[0] instanceof File
      )
    ) {
      console.error("'upload' is not a valid File array.")
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append("case", caseId.toString())
    formData.append("name", variables.name as string)
    formData.append("document", variables.uploadValue[0])
    formData.append("case_user_task_id", task?.id.toString())

    void execPostFile(formData as unknown as Partial<GenericTaskFormData>)
      .then((resp) => {
        console.log("Succes:", resp)
      })
      .catch((err) => {
        console.log("Error creating task:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const { form, name } = task
  const hasForm = form && form.length > 0
  const hasFileTypeInForm = hasFormTypeFile(form)
  const title = hasForm
    ? `Rond de taak "${ name }" af`
    : `Is de taak "${ name }" afgerond?`

  return (
    <Dialog id={dialogId} heading={title}>
      {hasForm ? (
        hasFileTypeInForm ? (
          <FileTaskForm
            closeModal={closeDialog}
            loading={loading}
            submitForm={submitFormFile}
            form={form}
          />
        ) : (
          <GenericTaskForm
            closeModal={closeDialog}
            loading={loading}
            submitForm={submitForm}
            form={form}
          />
        )
      ) : (
        <CompletedTaskForm
          closeModal={closeDialog}
          loading={loading}
          submitForm={submitForm}
        />
      )}
    </Dialog>
  )
}

export default FormDialog
