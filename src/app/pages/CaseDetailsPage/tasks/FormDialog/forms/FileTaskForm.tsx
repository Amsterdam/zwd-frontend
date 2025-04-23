import React from "react"
import { useParams } from "react-router-dom"
import { Paragraph } from "@amsterdam/design-system-react"
import {
  Form,
  FormActionButtons,
  FileInputField,
  TextInputField
} from "app/components"
import { useCase } from "app/state/rest"
import type { ComletedTaskFormData } from "./CompletedTaskForm"

type FileVariables = {
  name: string
  upload: FileList
}

type Props = {
  loading?: boolean
  closeModal: () => void
  submitForm: (variables: ComletedTaskFormData) => void
  submitFormFile: (variables: FileVariables) => void
  form: FormItem[]
}

export const FileTaskForm: React.FC<Props> = ({
  closeModal,
  submitForm,
  submitFormFile,
  loading = false,
  form
}) => {
  const { caseId } = useParams()
  /*
   * The 'caseData' is required for legacy_id.
   * If the case has been migrated, the file is no longer required.
   * The task can be completed with the generic task complete endpoint.
   */
  const [caseData] = useCase(Number(caseId))
  const formItem = form[0]
  const required = caseData?.legacy_id ? false : formItem.required

  const onSubmitData = (data: FileVariables) => {
    if (data.upload?.length > 0 && data.name) {
      submitFormFile(data)
    } else {
      submitForm({ completed: true })
    }
  }

  return (
    <Form onSubmit={onSubmitData}>
      {caseData?.legacy_id && (
        <Paragraph>
          <strong>
            Let op: Dit betreft een gemigreerde zaak, waardoor het uploaden van
            een bestand niet verplicht is. Klik direct op &quot;Taak
            afronden&quot; als het bestand al aan de zaak is toegevoegd.
          </strong>
        </Paragraph>
      )}
      <TextInputField
        key="key-name"
        name="name"
        label="Naam van het document"
        validation={{ required }}
      />
      <FileInputField
        key="key-upload"
        name="upload"
        label={formItem.label}
        validation={{ required }}
      />
      <FormActionButtons
        okText="Taak uitvoeren"
        onCancel={closeModal}
        loading={loading}
        name="ACTION_BUTTONS"
      />
    </Form>
  )
}
