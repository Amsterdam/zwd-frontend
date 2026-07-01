import { useSearchParams } from "react-router-dom"
import { Row } from "@amsterdam/design-system-react"
import { PageGrid, PageHeading } from "app/components"
import SelectBpmnModelName from "./forms/SelectBpmnModelName"
import SelectBpmnModel from "./forms/SelectBpmnModel"
import BpmnDiagram from "./BpmnDiagram"

export const BpmnPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const bpmnModelName = searchParams.get("model") ?? undefined
  const bpmnVersion = searchParams.get("version") ?? undefined
  const taskSpecsParam = searchParams.get("tasks")
  const currentTaskSpecs = taskSpecsParam ? taskSpecsParam.split(",") : []

  const handleSelectModelName = (name: string) => {
    setSearchParams({ model: name })
  }

  const handleSelectModel = (model: Components.Schemas.BpmnModel) => {
    setSearchParams({ model: model.model, version: model.version })
  }

  return (
    <PageGrid>
      <PageHeading label="BPMN" />
      <Row wrap style={{ marginBottom: "0.5rem" }}>
        <SelectBpmnModelName
          value={bpmnModelName}
          onSelect={handleSelectModelName}
        />
        {bpmnModelName && (
          <SelectBpmnModel
            bpmnModelName={bpmnModelName}
            value={bpmnVersion}
            onSelect={handleSelectModel}
          />
        )}
      </Row>
      {bpmnModelName && bpmnVersion && (
        <BpmnDiagram
          model={bpmnModelName}
          version={bpmnVersion}
          currentTaskSpecs={currentTaskSpecs}
        />
      )}
    </PageGrid>
  )
}

export default BpmnPage
