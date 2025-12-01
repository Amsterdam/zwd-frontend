import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form"
import { Field, Checkbox } from "@amsterdam/design-system-react"

type Props = {
  name: string
  id?: string
  label?: string
  validation: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
}

export const CheckboxField: React.FC<Props> = ({
  name,
  label,
  validation = {},
  formMethods = {},
  ...rest
}) => {
  const { formState, register } = formMethods as UseFormReturn<FieldValues>
  const error = formState?.errors?.[name]
  const hasError = !!error

  return (
    <Field>
      <Checkbox
        id={name}
        invalid={hasError}
        {...(register ? register(name, validation) : {})}
        {...rest}
      >
        {label}
      </Checkbox>
    </Field>
  )
}
