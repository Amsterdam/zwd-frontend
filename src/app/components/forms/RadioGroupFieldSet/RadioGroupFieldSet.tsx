import React from "react"
import { FieldSet, Radio } from "@amsterdam/design-system-react"
import type { FormState, FieldValues, UseFormRegister, RegisterOptions } from "react-hook-form"


type Option = {
  value: string;
  label: string;
}

type Props = {
  name: string
  label?: string
  options: Option[]
  register?: UseFormRegister<FieldValues>
  formState?: FormState<FieldValues>
  validation?: RegisterOptions
}

export const RadioGroupFieldSet: React.FC<Props> = ({ name, label, options, register, formState, validation, ...rest }) => {
  const hasError = !!formState?.errors?.[name]
  
  return (
    <FieldSet legend={ label ?? name } >
      {options.map(({ value, label }) => (
        <Radio 
          key={ value } 
          value={ value }
          invalid={ hasError }
          { ...(register ? register(name, validation) : {}) } 
          { ...rest }
        >
          { label }
        </Radio>
      ))}
    </FieldSet>
  )
}
