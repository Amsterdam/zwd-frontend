import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useNeighborhoods } from "app/state/rest"

type Props = {
  onChangeFilter: (value: string) => void
  contextName: "cases" | "tasks"
}

export const NeighborhoodFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { neighborhood } = useContext(ContextValues)[contextName]
  const [neighborhoods] = useNeighborhoods()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="buurten">Buurten</Label>
      <Select onChange={onChange} value={neighborhood}>
        <Select.Option key="" value="">
          Alle buurten
        </Select.Option>
        {neighborhoods?.map((name) => (
          <Select.Option key={`${name}`} value={`${name}`}>
            {`${name}`}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}

export default NeighborhoodFilter
