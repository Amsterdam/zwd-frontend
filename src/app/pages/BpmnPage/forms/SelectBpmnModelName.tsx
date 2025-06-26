import { Spinner } from "app/components"
import { useBpmnModelNames } from "app/state/rest"
import { Field, Label, Select } from "@amsterdam/design-system-react"

type Props = {
  onSelect: (value: string) => void
}

export const SelectBpmnModelName: React.FC<Props> = ({ onSelect }) => {
  const [modelNames, { isBusy }] = useBpmnModelNames()
  const names = modelNames ?? []

  return (
    <Field style={{ width: 300 }}>
      <Label htmlFor="bpmn-model">Naam</Label>
      {isBusy ? (
        <Spinner />
      ) : (
        <Select
          id="bpmn-model"
          onChange={(e) => onSelect(e.target.value)}
          defaultValue=""
        >
          <Select.Option key="placeholder" value="">
            Selecteer naam
          </Select.Option>
          {names.map((name) => (
            <Select.Option key={name} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Field>
  )
}

export default SelectBpmnModelName
