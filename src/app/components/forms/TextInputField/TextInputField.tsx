import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form"
import {
  Field,
  Label,
  TextInput,
  TextInputProps
} from "@amsterdam/design-system-react"

type Props = {
  name: string
  label?: string
  type?: TextInputProps["type"]
  validation: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
}

export const TextInputField: React.FC<Props> = ({
  name,
  label,
  type,
  validation = {},
  formMethods = {},
  ...rest
}) => {
  const { formState, register } = formMethods as UseFormReturn<FieldValues>
  const error = formState?.errors?.[name]
  const hasError = !!error

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        id={name}
        invalid={hasError}
        type={type}
        {...(register ? register(name, validation) : {})}
        {...rest}
      />
    </Field>
  )
}
