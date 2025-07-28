import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"

type Props = {
  onChangeFilter: (value: string) => void
}

export const ApplicationTypeFilter: React.FC<Props> = ({ onChangeFilter }) => {
  const { applicationType } = useContext(ContextValues)["cases"]

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="applicationType">Aanvraagtype</Label>
      <Select id="applicationType" onChange={onChange} value={applicationType}>
        <Select.Option key="" value="">
          Alle aanvraagtypes
        </Select.Option>
        <Select.Option key="Activatieteam" value="Activatieteam">
          Activatieteam
        </Select.Option>
        <Select.Option key="Advies" value="Advies">
          Advies
        </Select.Option>
      </Select>
    </Field>
  )
}

export default ApplicationTypeFilter
