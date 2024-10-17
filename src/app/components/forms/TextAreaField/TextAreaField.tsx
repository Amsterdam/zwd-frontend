import React from "react"
import { FieldValues, UseFormRegister, FieldError } from "react-hook-form"
import { Field, Label, TextArea } from "@amsterdam/design-system-react"


type Props = {
  name: string
  label?: string
  register?: UseFormRegister<FieldValues>
  errors?: { [key: string]: FieldError }
}

export const TextAreaField: React.FC<Props> = ({ label, name, register, errors = {}, ...rest }) => {
  const hasError = !!errors[name]

  return (
    <Field>
      <Label htmlFor="body">{ label }</Label>
      <TextArea
        aria-describedby="bodyDescription"
        id="body"
        rows={4}
        invalid={ hasError }
        {...(register ? register(name, { required: true, maxLength: 1000 }) : {})} 
        {...rest}
      />
    </Field>
  )
}
