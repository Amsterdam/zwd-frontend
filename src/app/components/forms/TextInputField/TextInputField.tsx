import type { FieldValues, UseFormRegister, FormState, RegisterOptions } from "react-hook-form"
import { Field, Label, TextInput, TextInputProps } from "@amsterdam/design-system-react"


type Props = {
  name: string
  label?: string
  type?: TextInputProps["type"]
  register?: UseFormRegister<FieldValues>
  formState?: FormState<FieldValues>
  validation: RegisterOptions
}

export const TextInputField: React.FC<Props> = ({ name, label, type, register, formState, validation = {}, ...rest }) => {
  const error = formState?.errors?.[name]
  const hasError = !!error

  return (
    <Field>
      <Label htmlFor={ name } >{ label }</Label>
      <TextInput
        id={ name }
        invalid={ hasError }
        type={ type }
        { ...(register ? register(name, validation) : {}) } 
        { ...rest }
      />
    </Field>
  )
}
