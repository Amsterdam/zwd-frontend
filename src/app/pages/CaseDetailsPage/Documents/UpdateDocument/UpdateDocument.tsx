import { Dialog, IconButton } from "@amsterdam/design-system-react"
import { DocumentEditIcon } from "@amsterdam/design-system-react-icons"
import { Form, FormActionButtons, TextInputField } from "app/components/forms"
import { useCaseDocumentUpdate } from "app/state/rest"
import { useDialog } from "app/hooks"

type Props = {
  record: Components.Schemas.CaseDocument
}

type CaseDocumentData = {
  name: string
}

export const UpdateDocument: React.FC<Props> = ({ record }) => {
  const dialogId = `ams-dialog-form-document-update-${record.id}`
  const { openDialog } = useDialog(dialogId)
  const [, { execPatch }] = useCaseDocumentUpdate(record.case, record.id)

  const onSubmit = (data: CaseDocumentData) => {
    void execPatch(data)
  }

  return (
    <>
      <IconButton
        label="Wijzig naam document"
        title="Wijzig naam document"
        svg={DocumentEditIcon}
        onClick={openDialog}
      />
      <Dialog heading={`Wijzig documentnaam "${record.name}"`} id={dialogId}>
        <Form onSubmit={onSubmit} defaultValues={{ name: record.name }}>
          <TextInputField
            name="name"
            label="Naam van het document"
            validation={{ required: true, maxLength: 100 }}
          />
          <FormActionButtons
            okText="Opslaan"
            onCancel={Dialog.close}
            name="ACTION_BUTTONS"
          />
        </Form>
      </Dialog>
    </>
  )
}

export default UpdateDocument
