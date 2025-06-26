import { useEffect, useState } from "react"
import { Spinner } from "app/components"
import { useBpmnModels } from "app/state/rest"
import { Field, Label, Select } from "@amsterdam/design-system-react"

type Props = {
  onSelect: (value: Components.Schemas.BpmnModel) => void
  bpmnModelName?: string
}

export const SelectBpmnModel: React.FC<Props> = ({
  onSelect,
  bpmnModelName
}) => {
  const [models, { isBusy }] = useBpmnModels(bpmnModelName)
  const [selectedVersion, setSelectedVersion] = useState("")

  useEffect(() => {
    setSelectedVersion("")
  }, [bpmnModelName])

  const handleSelect = (version: string) => {
    setSelectedVersion(version)
    const selectedModel = models?.find((item) => item.version === version)
    if (selectedModel) {
      onSelect(selectedModel)
    }
  }

  return (
    <Field style={{ width: 300 }}>
      <Label htmlFor="bpmn-version">Versie</Label>
      {isBusy ? (
        <Spinner />
      ) : (
        <Select
          id="bpmn-version"
          value={selectedVersion}
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
