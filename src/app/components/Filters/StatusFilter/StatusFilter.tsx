import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useCaseStatuses } from "app/state/rest"

type Props = {
  onChangeFilter: (value: string) => void
  contextName: "cases" | "tasks"
}

export const StatusFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { status } = useContext(ContextValues)[contextName]
  const [caseStatuses] = useCaseStatuses()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="status">Status</Label>
      <Select id="status" onChange={onChange} value={status}>
        <Select.Option key="" value="">
          Alle statussen
        </Select.Option>
        {caseStatuses?.map((status) => (
          <Select.Option key={`${status}`} value={`${status}`}>
            {`${status}`}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}

export default StatusFilter
