import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"

type Props = {
  onChangeFilter: (value: string) => void
}

export const AdviceTypeFilter: React.FC<Props> = ({ onChangeFilter }) => {
  const { adviceType } = useContext(ContextValues)["cases"]

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="adviceType">Adviestype</Label>
      <Select id="adviceType" onChange={onChange} value={adviceType}>
        <Select.Option key="" value="">
          Alle adviestypes
        </Select.Option>
        <Select.Option key="Cursus" value="Cursus">
          Cursus
        </Select.Option>
        <Select.Option key="Energieadvies" value="Energieadvies">
          Energieadvies
        </Select.Option>
        <Select.Option
          key="Haalbaarheidsonderzoek"
          value="Haalbaarheidsonderzoek"
        >
          Haalbaarheidsonderzoek
        </Select.Option>
      </Select>
    </Field>
  )
}

export default AdviceTypeFilter
