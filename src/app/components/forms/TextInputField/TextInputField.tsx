import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn,
  FieldError,
  ValidationValueMessage
} from "react-hook-form"
import {
  ErrorMessage,
  Field,
  Label,
  TextInput,
  TextInputProps
} from "@amsterdam/design-system-react"
import { getValueByPath } from "app/utils/getValueByPath"

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
  const { formState, register, setError, clearErrors, trigger, setValue } =
    formMethods as UseFormReturn<FieldValues>
  const error = getValueByPath(formState?.errors, name) as FieldError
  const hasError = !!error

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(name, value)
    const pattern = validation?.pattern as ValidationValueMessage<RegExp>
    const regex = pattern?.value
    const message = pattern?.message || "Ongeldige invoer"
    if (!value || !regex) return
    if (regex.test(value)) {
      clearErrors(name)
    } else {
      setError(name, { type: "custom", message })
    }
    void trigger()
  }

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      {hasError && <ErrorMessage>{error?.message}</ErrorMessage>}
      <TextInput
        id={name}
        invalid={hasError}
        type={type}
        {...(register ? register(name, validation) : {})}
        {...rest}
        onChange={handleValidation}
      />
    </Field>
  )
}
