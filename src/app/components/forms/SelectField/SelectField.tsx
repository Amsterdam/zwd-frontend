import type { FieldValues, UseFormRegister, FormState, RegisterOptions } from "react-hook-form"
import { Field, Label, Select } from "@amsterdam/design-system-react"


type Props = {
  name: string
  label?: string
  options?: { value: string, label: string }[]
  register?: UseFormRegister<FieldValues>
  formState?: FormState<FieldValues>
  validation: RegisterOptions
}

export const SelectField: React.FC<Props> = ({ name, label, options, register, formState, validation = {}, ...rest }) => {
  const error = formState?.errors?.[name]
  const hasError = !!error

  return (
    <Field>
      <Label htmlFor={ name } >{ label }</Label>
      <Select
        id={ name }
        invalid={ hasError }
        { ...(register ? register(name, validation) : {}) } 
        { ...rest }
      >
        { options?.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}
