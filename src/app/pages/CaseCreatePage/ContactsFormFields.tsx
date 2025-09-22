import React from "react"
import { Column, Row } from "@amsterdam/design-system-react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import { SelectField, TextInputField } from "app/components"
import {
  validationRequired,
  validationEmail,
  validationPhone
} from "app/utils/validation"
import { OPTIONS_ROLE_FUNCTIONS, CUSTOM_ROLE } from "./formOptions"

type Props = {
  formMethods?: UseFormReturn<FieldValues>
  name: string // This prop is required for passing the formMethods to the children
  shouldShow: (formValues: FieldValues) => boolean
}

const contacts = [
  { id: 0, label: "eerste contactpersoon vve" },
  { id: 1, label: "tweede contactpersoon vve" }
]

export const ContactsFormFields: React.FC<Props> = ({
  formMethods,
  shouldShow
}) => {
  const { watch } = formMethods as UseFormReturn<FieldValues>
  const formValues = watch()
  const isVisible = shouldShow ? shouldShow(formValues) : true

  if (!isVisible) {
    return null
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
            <TextInputField
              label="Specificeer functie"
              name={`custom_role[${contact.id}]`}
              validation={{ required: true }}
              formMethods={formMethods}
              shouldShow={(formValues) =>
                formValues.role[contact.id] === CUSTOM_ROLE
              }
            />
          </Row>
        </React.Fragment>
      ))}
    </Column>
  )
}

export default ContactsFormFields
