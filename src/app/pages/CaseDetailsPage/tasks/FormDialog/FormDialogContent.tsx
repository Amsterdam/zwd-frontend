import {
  CompletedTaskForm,
  ComletedTaskFormData
} from "./forms/CompletedTaskForm"
import { GenericTaskForm } from "./forms/GenericTaskForm"
import { FileTaskForm } from "./forms/FileTaskForm"
import type { GenericTaskFormData } from "./helpers/types"
import hasFormType from "./helpers/hasFormType"
import { AdvisorForm } from "./forms/AdvisorForm"

export const FormDialogContent: React.FC<{
  form?: FormItem[]
  closeDialog: () => void
  loading: boolean
  submitForm: (variables: ComletedTaskFormData | GenericTaskFormData) => void
  submitFormFile: (variables: { upload: FileList }) => void
}> = ({ form, closeDialog, loading, submitForm, submitFormFile }) => {
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
  return (
    <GenericTaskForm
      closeModal={closeDialog}
      loading={loading}
      submitForm={submitForm}
      form={form}
    />
  )
}
