import { Spinner } from "app/components"
import { useBpmnModelNames } from "app/state/rest"
import { Field, Label, Select } from "@amsterdam/design-system-react"

type Props = {
  onSelect: (value: string) => void
}

export const SelectBpmnModelName: React.FC<Props> = ({ onSelect }) => {
  const [bpmnModels, { isBusy }] = useBpmnModelNames()
  const models = bpmnModels ?? []

  return (
    <Field style={{ width: 300 }}>
      <Label htmlFor="bpmn-model">Naam</Label>
      {isBusy ? (
        <Spinner />
      ) : (
        <Select onChange={(e) => onSelect(e.target.value)}>
          <Select.Option key={"default"} value="">
            Selecteer naam
          </Select.Option>
          {models?.map((model) => (
            <Select.Option key={model} value={model}>
              {model}
            </Select.Option>
          ))}
        </Select>
      )}
    </Field>
  )
}

export default SelectBpmnModelName
