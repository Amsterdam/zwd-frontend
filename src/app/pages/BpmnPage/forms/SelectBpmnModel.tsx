// SelectBpmnModel.tsx
import { Spinner } from "app/components"
import { useBpmnModels } from "app/state/rest"
import { Field, Label, Select } from "@amsterdam/design-system-react"

type Props = {
  onSelect: (value: Components.Schemas.BpmnModel) => void
  bpmnModelName?: string
  value?: string
}

export const SelectBpmnModel: React.FC<Props> = ({
  onSelect,
  bpmnModelName,
  value
}) => {
  const [models, { isBusy }] = useBpmnModels(bpmnModelName)

  const handleSelect = (version: string) => {
    const selectedModel = models?.find((item) => item.version === version)
    if (selectedModel) {
      onSelect(selectedModel)
    }
  }

  return (
    <Field>
      <Label htmlFor="bpmn-version">Versie</Label>
      {isBusy ? (
        <Spinner />
      ) : (
        <Select
          id="bpmn-version"
          value={value ?? ""}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <Select.Option key="default" value="">
            Selecteer versie
          </Select.Option>
          {models?.map((model) => (
            <Select.Option key={model.version} value={model.version}>
              {model.version}
            </Select.Option>
          ))}
        </Select>
      )}
    </Field>
  )
}

export default SelectBpmnModel
