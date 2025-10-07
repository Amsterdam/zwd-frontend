import React, { useContext } from "react"
import { Field, Label } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useCaseStatuses } from "app/state/rest"
import { MultiSelectField } from "app/components/MultiSelectField/MultiSelectField"

type Props = {
  onChangeFilter: (value: string[]) => void
  contextName: "cases" | "tasks"
}

export const StatusFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { status } = useContext(ContextValues)[contextName]
  const [caseStatuses] = useCaseStatuses()

  const options: Option[] =
    caseStatuses?.map((name) => ({
      value: String(name),
      label: String(name)
    })) || []

  return (
    <Field>
      <Label htmlFor="status">Status</Label>
      <MultiSelectField
        onChange={onChangeFilter}
        value={status}
        options={options}
        placeholder="Selecteer statussen"
      />
    </Field>
  )
}

export default StatusFilter
