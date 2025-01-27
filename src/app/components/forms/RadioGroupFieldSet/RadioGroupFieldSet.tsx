import React from "react"
import { FieldSet, Radio } from "@amsterdam/design-system-react"
import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form"

type Option = {
  value: string
  label: string
}

type Props = {
  name: string
  label?: string
  options: Option[]
  validation?: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
}

export const RadioGroupFieldSet: React.FC<Props> = ({
  name,
  label,
  options,
  validation,
  formMethods = {},
  ...rest
}) => {
  const { formState, register } = formMethods as UseFormReturn<FieldValues>
  const hasError = !!formState?.errors?.[name]

  return (
    <FieldSet legend={label ?? name}>
      {options.map(({ value, label }) => (
        <Radio
          key={value}
          value={value}
          invalid={hasError}
          {...(register ? register(name, validation) : {})}
          {...rest}
        >
          {label}
        </Radio>
      ))}
    </FieldSet>
  )
}
