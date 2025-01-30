import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form"
import { Field, Label, Select } from "@amsterdam/design-system-react"

type Props = {
  name: string
  label?: string
  options?: { value: string; label: string }[]
  hasDefaultOption?: boolean
  validation: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
}

export const SelectField: React.FC<Props> = ({
  name,
  label,
  options,
  hasDefaultOption = false,
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
      <Select
        id={name}
        invalid={hasError}
        {...(register ? register(name, validation) : {})}
        {...rest}
      >
        {hasDefaultOption && (
          <Select.Option key="default_option" value="">
            Maak een keuze
          </Select.Option>
        )}
        {options?.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}
