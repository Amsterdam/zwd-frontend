import React, { useContext } from "react"
import { Field, Label } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useNeighborhoods } from "app/state/rest"
import { MultiSelectField } from "app/components/MultiSelectField/MultiSelectField"

type Props = {
  onChangeFilter: (values: string[]) => void
  contextName: "cases" | "tasks" | "hoas"
}

export const NeighborhoodFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { neighborhood } = useContext(ContextValues)[contextName]
  const [neighborhoods] = useNeighborhoods()

  const options: Option[] =
    neighborhoods?.map((name) => ({
      value: String(name),
      label: String(name)
    })) || []

  return (
    <Field>
      <Label htmlFor="buurten">Buurten</Label>
      <MultiSelectField
        onChange={onChangeFilter}
        value={neighborhood}
        options={options}
        placeholder="Selecteer buurten"
      />
    </Field>
  )
}

export default NeighborhoodFilter
