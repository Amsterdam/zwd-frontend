import type { GenericTaskFormData } from "./helpers/types"
import hasFormType from "./helpers/hasFormType"
import {
  CompletedTaskForm,
  ComletedTaskFormData
} from "./forms/CompletedTaskForm"
import { GenericTaskForm } from "./forms/GenericTaskForm"
import { FileTaskForm } from "./forms/FileTaskForm"
import { AdvisorForm } from "./forms/AdvisorForm"
import { CloseCaseForm } from "./forms/CloseCaseForm"

type Props = {
  form?: FormItem[]
  closeDialog: () => void
  loading: boolean
  submitForm: (variables: ComletedTaskFormData | GenericTaskFormData) => void
  submitFormFile: (variables: { upload: FileList }) => void
  submitFormCaseClose: (
    variables: Pick<Components.Schemas.CaseClose, "reason" | "description">
  ) => void
}

export const FormDialogContent: React.FC<Props> = ({
  form,
  closeDialog,
  loading,
  submitForm,
  submitFormFile,
  submitFormCaseClose
}) => {
  if (!form || form.length === 0) {
    return (
      <CompletedTaskForm
        closeModal={closeDialog}
        loading={loading}
        submitForm={submitForm}
      />
    )
  }
  if (hasFormType(form, "file")) {
    return (
      <FileTaskForm
        closeModal={closeDialog}
        loading={loading}
        submitForm={submitForm}
        submitFormFile={submitFormFile}
        form={form}
      />
    )
  }
  if (hasFormType(form, "advisor")) {
    return (
      <AdvisorForm
        closeModal={closeDialog}
        loading={loading}
        submitForm={submitForm}
        form={form}
      />
    )
  }
  if (hasFormType(form, "close_case")) {
    return (
      <CloseCaseForm
        closeModal={closeDialog}
        loading={loading}
        submitFormCaseClose={submitFormCaseClose}
        form={form}
      />
    )
  }
  return (
    <GenericTaskForm
      closeModal={closeDialog}
      loading={loading}
      submitForm={submitForm}
      form={form}
    />
  )
}
