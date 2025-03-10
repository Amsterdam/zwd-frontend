import React from "react"
import {
  Form,
  FormActionButtons,
  FileInputField,
  TextInputField
} from "app/components"

type Props = {
  loading?: boolean
  closeModal: () => void
  submitForm: (variables: { name: string; upload: FileList }) => void
  form: FormItem[]
}

export const FileTaskForm: React.FC<Props> = ({
  closeModal,
  submitForm,
  loading = false,
  form
}) => {
  const formItem = form[0]

  return (
    <Form onSubmit={submitForm}>
      <TextInputField
        key="key-name"
        name="name"
        label="Titel van het document"
        validation={{ required: formItem.required }}
      />
      <FileInputField
        key="key-upload"
        name="upload"
        label={formItem.label}
        validation={{ required: formItem.required }}
      />
      <FormActionButtons
        okText="Taak afronden"
        onCancel={closeModal}
        loading={loading}
      />
    </Form>
  )
}
