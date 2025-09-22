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
import styles from "../styles/form.module.css"

type Props = {
  name: string
  label?: string
  type?: TextInputProps["type"]
  validation: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
  shouldShow?: (formValues: FieldValues) => boolean
}

export const TextInputField: React.FC<Props> = ({
  name,
  label,
  type,
  validation = {},
  formMethods = {},
  shouldShow,
  ...rest
}) => {
  const {
    formState,
    register,
    setError,
    clearErrors,
    trigger,
    setValue,
    watch
  } = formMethods as UseFormReturn<FieldValues>
  const error = getValueByPath(formState?.errors, name) as FieldError
  const hasError = !!error

  const formValues = watch()
  const isVisible = shouldShow ? shouldShow(formValues) : true

  if (!isVisible) {
    return null
  }

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(name, value)
    const pattern = validation?.pattern as ValidationValueMessage<RegExp>
    const regex = pattern?.value
    const message = pattern?.message || "Ongeldige invoer"
    if (value && regex) {
      if (regex.test(value)) {
        clearErrors(name)
      } else {
        setError(name, { type: "custom", message })
      }
    }
    void trigger(name)
  }

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      {hasError && error?.message && (
        <ErrorMessage>{error?.message}</ErrorMessage>
      )}
      <TextInput
        id={name}
        invalid={hasError}
        type={type}
        size={type === "tel" ? 14 : undefined}
        className={type === "tel" ? styles.inputTel : undefined}
        {...(register ? register(name, validation) : {})}
        {...rest}
        onChange={handleValidation}
      />
    </Field>
  )
}
