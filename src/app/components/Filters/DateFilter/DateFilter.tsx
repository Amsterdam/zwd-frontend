import React from "react"
import { DateInput, Field, Label } from "@amsterdam/design-system-react"

type Props = {
  label: string
  onChangeFilter: (value: string) => void
  value?: string
}

export const DateFilter: React.FC<Props> = ({
  onChangeFilter,
  label,
  value
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor={label}>{label}</Label>
      <DateInput id={label} onChange={onChange} value={value} />
    </Field>
  )
}

export default DateFilter
