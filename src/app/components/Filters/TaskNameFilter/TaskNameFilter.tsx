import React, { useContext, useEffect } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useTaskNames } from "app/state/rest"

type Props = {
  onChangeFilter: (value: string) => void
}

export const TaskNameFilter: React.FC<Props> = ({ onChangeFilter }) => {
  const { taskName } = useContext(ContextValues)["tasks"]
  const [taskNames] = useTaskNames()

  // If the currently selected taskName is no longer available in options after updating a task
  // and invalidating the cache, reset it to "Alle taken" to avoid a stale, non-existent filter value.
  useEffect(() => {
    if (taskName && Array.isArray(taskNames) && !taskNames.includes(taskName)) {
      onChangeFilter("")
    }
  }, [taskName, taskNames, onChangeFilter])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field style={{ maxWidth: "30ch" }}>
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
