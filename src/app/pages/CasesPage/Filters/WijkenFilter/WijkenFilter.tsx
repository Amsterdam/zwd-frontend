import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useWijken } from "app/state/rest"

type Props = {
  onChangeFilter: (value: string) => void
}

export const WijkenFilter: React.FC<Props> = ({ onChangeFilter }) => {
  const { wijk } = useContext(ContextValues)["cases"]
  const [wijken] = useWijken()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="wijken">Wijken</Label>
      <Select onChange={onChange} value={wijk}>
        <Select.Option key="" value="">
          Alle wijken
        </Select.Option>
        {wijken?.map((name) => (
          <Select.Option key={`${name}`} value={`${name}`}>
            {`${name}`}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}

export default WijkenFilter
