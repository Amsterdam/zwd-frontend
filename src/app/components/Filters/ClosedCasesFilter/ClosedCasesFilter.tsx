import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"

type Props = {
  onChangeFilter: (value: string) => void
  contextName: "cases" | "tasks"
}

export const ClosedCasesFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { isClosedFilter } = useContext(ContextValues)[contextName]

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="closed_cases_filter">Toon zaken</Label>
      <Select
        id="closed_cases_filter"
        onChange={onChange}
        value={isClosedFilter}
      >
        <Select.Option key="" value="">
          Alle zaken
        </Select.Option>
        <Select.Option key="false" value="true">
          Gesloten zaken
        </Select.Option>
        <Select.Option key="false" value="false">
          Open zaken
        </Select.Option>
      </Select>
    </Field>
  )
}

export default ClosedCasesFilter
