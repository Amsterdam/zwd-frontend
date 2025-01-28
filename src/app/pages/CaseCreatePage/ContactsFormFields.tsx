import { Column, Row } from "@amsterdam/design-system-react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import { TextInputField } from "app/components"
import React from "react"

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
  const contacts = [
    { id: 0, label: "eerste contactpersoon vve" },
    { id: 1, label: "tweede contactpersoon vve" }
  ]

  return (
    <Column>
      {contacts.map((contact) => (
        <React.Fragment key={contact.id}>
          <TextInputField
            name={`fullname[${ contact.id }]`}
            label={`Naam ${ contact.label }`}
            validation={ requiredValidation }
            formMethods={ formMethods }
          />
          <TextInputField
            name={`email[${ contact.id }]`}
            label="E-mail"
            type="email"
            validation={ emailValidation }
            formMethods={ formMethods }
          />
          <Row wrap alignVertical="end">
            <TextInputField
              name={`phone[${ contact.id }]`}
              label="Telefoon"
              type="tel"
              validation={ phoneValidation }
              formMethods={ formMethods }
            />
            <TextInputField
              name={`role[${ contact.id }]`}
              label="Functie in vve"
              validation={ requiredValidation }
              formMethods={ formMethods }
            />
          </Row>
        </React.Fragment>
      ))}
    </Column>
  )
}

export default ContactsFormFields
