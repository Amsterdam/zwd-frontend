import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useDistricts } from "app/state/rest"

type Props = {
  onChangeFilter: (value: string) => void
}

export const DistrictFilter: React.FC<Props> = ({ onChangeFilter }) => {
  const { district } = useContext(ContextValues)["cases"]
  const [districts] = useDistricts()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="stadsdeel">Stadsdeel</Label>
      <Select onChange={onChange} value={district}>
        <Select.Option key="" value="">
          Alle stadsdelen
        </Select.Option>
        {districts?.map((name) => (
          <Select.Option key={`${name}`} value={`${name}`}>
            {`${name}`}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}

export default DistrictFilter
