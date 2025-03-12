import React from "react"
import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form"
import { Field, Label, DateInput } from "@amsterdam/design-system-react"

type Props = {
  name: string
  label?: string
  validation: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
}

export const DateInputField: React.FC<Props> = ({
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
      <Label htmlFor={name} optional={!validation?.required}>
        {label}
      </Label>
      <DateInput
        aria-describedby="date"
        invalid={hasError}
        {...(register ? register(name, validation) : {})}
        {...rest}
      />
    </Field>
  )
}
