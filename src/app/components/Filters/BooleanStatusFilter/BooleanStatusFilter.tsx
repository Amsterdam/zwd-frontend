import React from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"

type Props = {
  label: string
  allLabel: string
  trueLabel: string
  falseLabel: string
  onChangeFilter: (value: string) => void
  value: string
}

export const BooleanStatusFilter: React.FC<Props> = ({
  label,
  allLabel,
  trueLabel,
  falseLabel,
  onChangeFilter,
  value
}) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor={label}>{label}</Label>
      <Select id={label} onChange={onChange} value={value}>
        <Select.Option value="">{allLabel}</Select.Option>
        <Select.Option value="true">{trueLabel}</Select.Option>
        <Select.Option value="false">{falseLabel}</Select.Option>
      </Select>
    </Field>
  )
}
