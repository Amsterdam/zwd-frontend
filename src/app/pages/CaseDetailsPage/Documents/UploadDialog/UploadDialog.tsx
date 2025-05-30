import { Dialog } from "@amsterdam/design-system-react"
import { useParams } from "react-router-dom"
import { Form, FormActionButtons, FileInputField } from "app/components/forms"
import { useCaseDocumentUpload } from "app/state/rest"

type Props = {
  id: string
}

type CaseDocumentData = {
  name: string
  upload: FileList
}

export const UploadDialog: React.FC<Props> = ({ id }) => {
  const { caseId } = useParams()
  const [, { execPost }] = useCaseDocumentUpload()

  const onSubmit = (data: CaseDocumentData) => {
    const formData = new FormData()
    formData.append("case", caseId as string)
    formData.append("name", data.upload[0]?.name ?? "Onbekend")
    formData.append("document", data.upload[0])
    void execPost(
      formData as unknown as Partial<Components.Schemas.CaseDocument>
    )
  }

  return (
    <Dialog heading="Document uploaden" id={id}>
      <Form onSubmit={onSubmit}>
        <FileInputField name="upload" validation={{ required: true }} />
        <FormActionButtons
          okText="Upload"
          onCancel={Dialog.close}
          name="ACTION_BUTTONS"
        />
      </Form>
    </Dialog>
  )
}

export default UploadDialog
