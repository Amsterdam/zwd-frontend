import React from "react"
import type { FieldValues, UseFormRegister, FormState, RegisterOptions } from "react-hook-form"
import { Field, Label, TextArea } from "@amsterdam/design-system-react"


type Props = {
  name: string
  label?: string
  register?: UseFormRegister<FieldValues>
  formState?: FormState<FieldValues>
  validation: RegisterOptions
}

export const TextAreaField: React.FC<Props> = ({ name, label, register, formState, validation = {}, ...rest }) => {
  const hasError = !!formState?.errors?.[name]

  return (
    <Field>
      <Label htmlFor="body">{ label }</Label>
      <TextArea
        aria-describedby="bodyDescription"
        id="body"
        rows={4}
        invalid={ hasError }
        { ...(register ? register(name, validation) : {}) } 
        { ...rest }
      />
    </Field>
  )
}
