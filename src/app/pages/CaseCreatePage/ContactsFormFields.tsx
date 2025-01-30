import React from "react"
import { Column, Row } from "@amsterdam/design-system-react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import { SelectField, TextInputField } from "app/components"
import { OPTIONS_ROLE_FUNCTIONS, CUSTOM_ROLE } from "./formOptions"

type Props = {
  formMethods?: UseFormReturn<FieldValues>
}

const emailValidation = {
  required: true,
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Dit is geen geldig e-mailadres"
  }
}

const phoneValidation = {
  required: true,
  pattern: {
    value: /^(0031|0)[1-9][0-9]{8,9}$/,
    message: "Dit is geen geldig telefoonnummer"
  }
}

const requiredValidation = { required: true }

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

  return (
    <Column>
      {contacts.map((contact) => (
        <React.Fragment key={contact.id}>
          <TextInputField
            name={`fullname[${ contact.id }]`}
            label={`Naam ${ contact.label }`}
            validation={requiredValidation}
            formMethods={formMethods}
          />
          <TextInputField
            name={`email[${ contact.id }]`}
            label="E-mail"
            type="email"
            validation={emailValidation}
            formMethods={formMethods}
          />
          <TextInputField
            name={`phone[${ contact.id }]`}
            label="Telefoon"
            type="tel"
            validation={phoneValidation}
            formMethods={formMethods}
          />
          <Row wrap alignVertical="end">
            <SelectField
              name={`role[${ contact.id }]`}
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
                name={`custom_role[${ contact.id }]`}
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
