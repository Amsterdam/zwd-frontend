import React from "react"
import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form"
import { Field, Label, TextArea } from "@amsterdam/design-system-react"

type Props = {
  name: string
  label?: string
  validation: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
}

export const TextAreaField: React.FC<Props> = ({
  name,
  label,
  formMethods = {},
  validation = {},
  ...rest
}) => {
  const { formState, register } = formMethods as UseFormReturn<FieldValues>
  const hasError = !!formState?.errors?.[name]

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <TextArea
        aria-describedby="bodyDescription"
        id="body"
        rows={4}
        invalid={hasError}
        {...(register ? register(name, validation) : {})}
        {...rest}
      />
    </Field>
  )
}
