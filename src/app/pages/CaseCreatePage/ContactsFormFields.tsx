import { Column, Row } from "@amsterdam/design-system-react"
import { FieldValues, FormState, UseFormRegister } from "react-hook-form"
import { TextInputField } from "app/components"
import React from "react"

type Props = {
  register?: UseFormRegister<FieldValues>;
  formState?: FormState<FieldValues>;
};

const emailValidation = {
  required: "E-mail is verplicht",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Dit is geen geldig e-mailadres"
  }
}

const requiredValidation = { required: true }

export const ContactsFormFields: React.FC<Props> = ({ register, formState }) => {
  const contacts = [
    { id: 0, label: "eerste contactpersoon" },
    { id: 1, label: "tweede contactpersoon" }
  ]

  return (
    <Column>
      {contacts.map((contact) => (
        <React.Fragment key={contact.id}>
          <TextInputField
            name={`fullname[${ contact.id }]`}
            label={`Naam ${ contact.label }`}
            validation={ requiredValidation }
            register={ register }
            formState={ formState }
          />
          <TextInputField
            name={`email[${ contact.id }]`}
            label="E-mail"
            type="email"
            validation={ emailValidation }
            register={ register }
            formState={ formState }
          />
          <Row wrap>
            <TextInputField
              name={`phone[${ contact.id }]`}
              label="Telefoon"
              type="tel"
              validation={ requiredValidation }
              register={ register }
              formState={ formState }
            />
            <TextInputField
              name={`role[${ contact.id }]`}
              label="Functie in vve"
              validation={ requiredValidation }
              register={ register }
              formState={ formState }
            />
          </Row>
        </React.Fragment>
      ))}
    </Column>
  )
}

export default ContactsFormFields
