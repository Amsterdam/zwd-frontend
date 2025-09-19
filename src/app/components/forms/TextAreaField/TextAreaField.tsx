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
  shouldShow?: (formValues: FieldValues) => boolean
}

export const TextAreaField: React.FC<Props> = ({
  name,
  label,
  validation = {},
  formMethods = {},
  shouldShow,
  ...rest
}) => {
  const { formState, register, watch } =
    formMethods as UseFormReturn<FieldValues>
  const hasError = !!formState?.errors?.[name]
  const formValues = watch()
  const isVisible = shouldShow ? shouldShow(formValues) : true

  if (!isVisible) {
    return null
  }

  return (
    <Field>
      <Label htmlFor={name} optional={!validation?.required}>
        {label}
      </Label>
      <TextArea
        id={name}
        rows={4}
        invalid={hasError}
        {...(register ? register(name, validation) : {})}
        {...rest}
      />
    </Field>
  )
}
