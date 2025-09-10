import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useTaskNames } from "app/state/rest"

type Props = {
  onChangeFilter: (value: string) => void
}

export const TaskNameFilter: React.FC<Props> = ({ onChangeFilter }) => {
  const { taskName } = useContext(ContextValues)["tasks"]
  const [taskNames] = useTaskNames()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="taskName">Open taak</Label>
      <Select id="taskName" onChange={onChange} value={taskName}>
        <Select.Option key="" value="">
          Alle taken
        </Select.Option>
        {taskNames?.map((name: string) => (
          <Select.Option key={name} value={`${name}`}>
            {name}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}

export default TaskNameFilter
