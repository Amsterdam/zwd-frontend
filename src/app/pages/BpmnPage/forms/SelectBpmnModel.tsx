import { Spinner } from "app/components"
import { useBpmnModels } from "app/state/rest"
import { Field, Label, Select } from "@amsterdam/design-system-react"


type Props = {
  onSelect: (value: Components.Schemas.BpmnModel) => void
  bpmnModelName?: string
}

export const SelectBpmnModel: React.FC<Props> = ({ onSelect, bpmnModelName }) => {
  const [data, { isBusy }] = useBpmnModels(bpmnModelName)
  const versions: Components.Schemas.BpmnModel[] = data ?? [] 

  const selectModelVersion = (version: string) => {
    const bpmnModel = data?.find((item) => item.version === version)
    if (bpmnModel) {
      onSelect(bpmnModel)
    }
  }

  return (
    <Field style={{ width: 300 }}>
      <Label htmlFor="bpmn-version">Versie</Label>
      { isBusy ? <Spinner/> : (
        <Select onChange={ (e) => selectModelVersion(e.target.value) }>
          <Select.Option key={ "default" } value="">Selecteer versie</Select.Option>
          { versions?.map((item, i) => (
            <Select.Option key={ i } value={ item?.version }>
              { item?.version }
            </Select.Option>
          ))}
        </Select>
      )}
    </Field>  
  )
}

export default SelectBpmnModel
    