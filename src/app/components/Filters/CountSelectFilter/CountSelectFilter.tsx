import React from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"

type Props = {
  onChangeFilter: (value: number) => void
  label: string
  value: number
}

export const CountSelectFilter: React.FC<Props> = ({
  label,
  value,
  onChangeFilter
}) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(Number(e.currentTarget.value))
  }

  return (
    <Field>
      <Label htmlFor="count">{label}</Label>
      <Select id="count" onChange={onChange} value={value}>
        <Select.Option key="Nul" value={0}>
          Alle aantallen 
        </Select.Option>
        <Select.Option key="Eén of meer" value={1}>
          Eén of meer
        </Select.Option>
        <Select.Option key="Twee of meer" value={2}>
          Twee of meer
        </Select.Option>
      </Select>
    </Field>
  )
}

export default CountSelectFilter
