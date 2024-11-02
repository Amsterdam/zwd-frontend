import { Dialog } from "@amsterdam/design-system-react"
import { useParams } from "react-router-dom"
import { Form, FormActionButtons, TextInputField, FileInputField } from "app/components/forms"
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
    formData.append("name", data.name)
    formData.append("document", data.upload[0])
    void execPost(formData as unknown as Partial<Components.Schemas.CaseDocument>)
  }

  return (
    <Dialog heading="Document uploaden" id={ id } >
      <Form onSubmit={ onSubmit } formGrid={{ narrow: 4, medium: 6, wide: 10 }}>
        <TextInputField name="name" label="Titel van het document" validation={{ required: true, maxLength: 100 }} />
        <FileInputField name="upload" validation={{ required: true }} />
        <FormActionButtons okText="Upload" onCancel={ Dialog.close } />
      </Form>
    </Dialog>
  )
}

export default UploadDialog
