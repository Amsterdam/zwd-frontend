import { Dialog } from "@amsterdam/design-system-react"
import { useDialog } from "app/hooks"
import { Form, FormActionButtons, SelectField, TextInputField } from "app/components"
import { useHoaContactsUpdate } from "app/state/rest"
import { CUSTOM_ROLE, OPTIONS_ROLE_FUNCTIONS } from "app/pages/CaseCreatePage/formOptions"
import { validationRequired, validationEmail, validationPhone } from "app/utils/validation"

type Contact = Components.Schemas.Contact

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"];
  id: string;
  contact: Contact;
}

type FormValues = {
  fullname: string
  email: string
  phone: string
  role: string
  role_custom?: string
}

export const EditHoaContactDialog: React.FC<Props> = ({ hoaId, id, contact }) => {
  const { closeDialog } = useDialog(id)
  const [, { execPut }] = useHoaContactsUpdate(hoaId)


  const defaultRole = OPTIONS_ROLE_FUNCTIONS.find((o) => o.label === contact.role)?.value ?? CUSTOM_ROLE
  const defaultRoleCustom = defaultRole === CUSTOM_ROLE ? contact.role : ''

  const defaultValues: FormValues = {
    fullname: contact.fullname,
    email: contact.email,
    phone: contact.phone,
    role: defaultRole,
    role_custom: defaultRoleCustom,
  }

  const onSubmit = (values: FormValues) => {
    const roleValue = values.role === CUSTOM_ROLE
      ? values.role_custom ?? contact.role
      : values.role

    void execPut({
      contacts: [
        {
          id: contact.id,
          fullname: values.fullname,
          email: values.email,
          phone: values.phone,
          role: roleValue as string,
        }
      ]
    }).then(() => {
      closeDialog()
    })
  }

  return (
    <Dialog id={id} heading={`Bewerk contactpersoon`}>
      <Form<FormValues> defaultValues={defaultValues} onSubmit={onSubmit}>
        <TextInputField
          name="fullname"
          label="Naam"
          validation={validationRequired}
        />
        <TextInputField
          name="email"
          label="E-mail"
          type="email"
          validation={validationEmail}
        />
        <TextInputField
          name="phone"
          label="Telefoon"
          type="tel"
          validation={validationPhone}
        />
        <SelectField
          name="role"
          label="Functie in vve"
          options={OPTIONS_ROLE_FUNCTIONS}
          hasDefaultOption={true}
          validation={validationRequired}
        />
        <TextInputField
          name="role_custom"
          label="Specificeer functie"
          validation={validationRequired}
          shouldShow={(values) => values.role === CUSTOM_ROLE}
        />
        <FormActionButtons
          name="actions"
          okText="Opslaan"
          cancelText="Annuleer"
          onCancel={closeDialog}
        />
      </Form>
    </Dialog>
  )
}

export default EditHoaContactDialog


