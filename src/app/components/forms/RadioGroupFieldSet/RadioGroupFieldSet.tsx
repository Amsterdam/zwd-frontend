import React from "react"
import { FieldSet, Radio } from "@amsterdam/design-system-react"
import { FieldValues, UseFormRegister } from "react-hook-form"


type Option = {
  value: string;
  label: string;
}

type Props = {
  register?: UseFormRegister<FieldValues>
  options: Option[]
  name: string
  label?: string
}

export const RadioGroupFieldSet: React.FC<Props> = ({ register, options, label, name, ...rest }) => (
  <FieldSet legend={ label ?? name } >
    {options.map(({ value, label }) => (
      <Radio 
        key={value} 
        value={value}
        {...(register ? register(name, { required: true }) : {})} 
        {...rest}
      >
        { label }
      </Radio>
    ))}
  </FieldSet>
)
