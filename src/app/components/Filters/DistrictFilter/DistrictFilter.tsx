import React, { useContext } from "react"
import { Field, Label } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useDistricts } from "app/state/rest"
import { MultiSelectField } from "app/components/MultiSelectField/MultiSelectField"

type Props = {
  onChangeFilter: (value: string[]) => void
  contextName: "cases" | "tasks" | "hoas"
}

export const DistrictFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { district } = useContext(ContextValues)[contextName]
  const [districts] = useDistricts()

  const options: Option[] =
    districts?.map((name) => ({ value: String(name), label: String(name) })) ||
    []

  return (
    <Field>
      <Label htmlFor="stadsdeel">Stadsdeel</Label>
      <MultiSelectField
        onChange={onChangeFilter}
        value={district}
        options={options}
        placeholder="Selecteer stadsdelen"
      />
    </Field>
  )
}

export default DistrictFilter
