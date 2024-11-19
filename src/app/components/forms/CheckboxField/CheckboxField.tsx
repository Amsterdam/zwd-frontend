import type { FieldValues, UseFormRegister, FormState, RegisterOptions } from "react-hook-form"
import { Field, Checkbox } from "@amsterdam/design-system-react"


type Props = {
  name: string
  label?: string
  register?: UseFormRegister<FieldValues>
  formState?: FormState<FieldValues>
  validation: RegisterOptions
}

export const CheckboxField: React.FC<Props> = ({ name, label, register, formState, validation = {}, ...rest }) => {
  const error = formState?.errors?.[name]
  const hasError = !!error

  return (
    <Field>
      <Checkbox
        id={ name }
        invalid={ hasError }
        { ...(register ? register(name, validation) : {}) } 
        { ...rest }
      >
        { label }
      </Checkbox>
    </Field>
  )
}
