import React from "react"
import { Column, Row } from "@amsterdam/design-system-react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import { SelectField, TextInputField } from "app/components"
import {
  OPTIONS_ROLE_FUNCTIONS,
  CUSTOM_ROLE,
  ADVICE_TYPES
} from "./formOptions"

type Props = {
  formMethods?: UseFormReturn<FieldValues>
  name: string // This prop is required for passing the formMethods to the children
}

const validationRequired = { required: true }

const validationEmail = {
  ...validationRequired,
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Dit is geen geldig e-mailadres"
  }
}

const validationPhone = {
  ...validationRequired,
  pattern: {
    value: /^(0031|0)[1-9][0-9]{8,9}$/,
    message: "Dit is geen geldig telefoonnummer"
  }
}

export const ContactsFormFields: React.FC<Props> = ({ formMethods }) => {
  const { watch } = formMethods as UseFormReturn<FieldValues>

  const contacts = [
    { id: 0, label: "eerste contactpersoon vve" },
    { id: 1, label: "tweede contactpersoon vve" }
  ]

  const roleName0 = watch("role[0]") as string
  const roleName1 = watch("role[1]") as string
  const hasCustomRole0 = roleName0 === CUSTOM_ROLE
  const hasCustomRole1 = roleName1 === CUSTOM_ROLE

  const adviseType = watch("advice_type")
  const showContacts =
    adviseType === ADVICE_TYPES.ENERGIEADVIES ||
    adviseType === ADVICE_TYPES.HAALBAARHEIDSONDERZOEK

  if (!showContacts) {
    return null // Return null if contacts should not be shown
  }
  return (
    <Column>
      {contacts.map((contact) => (
        <React.Fragment key={contact.id}>
          <TextInputField
            name={`fullname[${contact.id}]`}
            label={`Naam ${contact.label}`}
            validation={validationRequired}
            formMethods={formMethods}
          />
          <TextInputField
            name={`phone[${contact.id}]`}
            label="Telefoon"
            type="tel"
            validation={validationPhone}
            formMethods={formMethods}
          />
          <TextInputField
            name={`email[${contact.id}]`}
            label="E-mail"
            type="email"
            validation={validationEmail}
            formMethods={formMethods}
          />
          <Row wrap alignVertical="end">
            <SelectField
              name={`role[${contact.id}]`}
              label="Functie in vve"
              options={OPTIONS_ROLE_FUNCTIONS}
              validation={{ required: true }}
              formMethods={formMethods}
              hasDefaultOption
            />
            {((hasCustomRole0 && contact.id === 0) ||
              (hasCustomRole1 && contact.id === 1)) && (
              <TextInputField
                label="Specificeer functie"
                name={`custom_role[${contact.id}]`}
                validation={{ required: true }}
                formMethods={formMethods}
              />
            )}
          </Row>
        </React.Fragment>
      ))}
    </Column>
  )
}

export default ContactsFormFields
