import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"

type Props = {
  onChangeFilter: (value: number) => void
  contextName: "hoa"
}

export const ParticipantCountFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { participantCount } = useContext(ContextValues)[contextName]

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(Number(e.currentTarget.value))
  }

  return (
    <Field>
      <Label htmlFor="participantCount">Aantal Cursisten</Label>
      <Select id="participantCount" onChange={onChange} value={participantCount}>
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

export default ParticipantCountFilter
