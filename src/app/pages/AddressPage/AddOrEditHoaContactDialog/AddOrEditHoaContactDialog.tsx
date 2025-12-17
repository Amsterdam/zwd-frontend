import { Dialog } from "@amsterdam/design-system-react"
import { useDialog } from "app/hooks"
import {
  Form,
  FormActionButtons,
  SelectField,
  CheckboxField,
  TextInputField,
  DateInputField
} from "app/components"
import { useHomeownerAssociationContactsCreateOrUpdate } from "app/state/rest"
import {
  CUSTOM_ROLE,
  OPTIONS_ROLE_FUNCTIONS
} from "app/pages/CaseCreatePage/formOptions"
import {
  validationRequired,
  validationEmail,
  validationPhone
} from "app/utils/validation"

export enum FormMode {
  ADD = "add",
  EDIT = "edit"
}

type Contact = Components.Schemas.Contact

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
  dialogId: string
  mode: FormMode
  contact?: Contact
}

type FormValues = {
  fullname: string
  email: string
  phone: string
  role: string
  role_custom?: string
  is_primary?: boolean
  course_date?: string
}

const resolveDefaultValues = (
  mode: FormMode,
  contact?: Contact
): FormValues => {
  if (mode === FormMode.EDIT && contact) {
    const defaultRole =
      OPTIONS_ROLE_FUNCTIONS.find((o) => o.label === contact.role)?.value ??
      CUSTOM_ROLE
    const defaultRoleCustom = defaultRole === CUSTOM_ROLE ? contact.role : ""
    return {
      fullname: contact.fullname,
      email: contact.email,
      phone: contact.phone,
      role: defaultRole,
      role_custom: defaultRoleCustom,
      is_primary: contact.is_primary,
      course_date: contact.course_date || "",
    }
  }
  return {
    fullname: "",
    email: "",
    phone: "",
    role: "",
    role_custom: "",
    is_primary: false,
    course_date: "",
  }
}

const resolveSubmittedRole = (values: FormValues, fallbackRole?: string) =>
  values.role === CUSTOM_ROLE
    ? (values.role_custom ?? fallbackRole ?? "")
    : values.role

export const AddOrEditHoaContactDialog: React.FC<Props> = ({
  hoaId,
  dialogId,
  mode,
  contact
}) => {
  const { closeDialog } = useDialog(dialogId)
  const [, { execPost }] = useHomeownerAssociationContactsCreateOrUpdate(hoaId)

  const defaultValues = resolveDefaultValues(mode, contact)

  const onSubmit = (values: FormValues) => {
    const roleValue = resolveSubmittedRole(values, contact?.role)

    void execPost({
      contacts: [
        {
          ...(mode === FormMode.EDIT && contact ? { id: contact.id } : {}),
          fullname: values.fullname,
          email: values.email,
          phone: values.phone,
          role: roleValue as string,
          is_primary: values.is_primary ?? false,
          course_date: values.course_date || null,
        }
      ]
    }).then(() => {
      closeDialog()
    })
  }

  const heading =
    mode === FormMode.ADD ? "Contactpersoon toevoegen" : "Bewerk contactpersoon"

  const okText = mode === FormMode.ADD ? "Toevoegen" : "Opslaan"

  return (
    <Dialog id={dialogId} heading={heading}>
      <Form<FormValues> defaultValues={defaultValues} onSubmit={onSubmit}>
        <TextInputField
          name="fullname"
          id={`${dialogId}_fullname`}
          label="Naam"
          validation={validationRequired}
        />
        <TextInputField
          name="email"
          id={`${dialogId}_email`}
          label="E-mail"
          type="email"
          validation={validationEmail}
        />
        <TextInputField
          name="phone"
          id={`${dialogId}_phone`}
          label="Telefoon"
          type="tel"
          validation={validationPhone}
        />
        <SelectField
          name="role"
          id={`${dialogId}_role`}
          label="Functie in vve"
          options={OPTIONS_ROLE_FUNCTIONS}
          hasDefaultOption={true}
          validation={validationRequired}
        />
        <TextInputField
          name="role_custom"
          id={`${dialogId}_role_custom`}
          label="Specificeer functie"
          validation={validationRequired}
          shouldShow={(values) => values.role === CUSTOM_ROLE}
        />
        <CheckboxField
          name="is_primary"
          id={`${dialogId}_is_primary`}
          label="Is primair vve-contact"
          validation={{ required: false }}
        />
        <DateInputField
          name="course_date"
          label="Cursusdatum"
          type="date"
          validation={{ required: false }}
        />
        <FormActionButtons
          name="actions"
          okText={okText}
          cancelText="Annuleer"
          onCancel={closeDialog}
        />
      </Form>
    </Dialog>
  )
}

export default AddOrEditHoaContactDialog
