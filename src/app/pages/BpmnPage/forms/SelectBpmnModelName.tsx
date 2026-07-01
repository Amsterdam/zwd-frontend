// SelectBpmnModelName.tsx
import { Spinner } from "app/components"
import { useBpmnModelNames } from "app/state/rest"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { formatWorkflowType } from "app/utils"

type Props = {
  value?: string
  onSelect: (value: string) => void
}

export const SelectBpmnModelName: React.FC<Props> = ({ value, onSelect }) => {
  const [modelNames, { isBusy }] = useBpmnModelNames()
  const names = modelNames ?? []

  return (
    <Field>
      <Label htmlFor="bpmn-model">Naam</Label>
      {isBusy ? (
        <Spinner />
      ) : (
        <Select
          id="bpmn-model"
          value={value ?? ""}
          onChange={(e) => onSelect(e.target.value)}
        >
          <Select.Option key="placeholder" value="">
            Selecteer naam
          </Select.Option>
          {names.map((name) => (
            <Select.Option key={name} value={name}>
              {formatWorkflowType(name)}
            </Select.Option>
          ))}
        </Select>
      )}
    </Field>
  )
}

export default SelectBpmnModelName
