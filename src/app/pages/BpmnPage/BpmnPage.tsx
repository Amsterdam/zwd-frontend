import { useState } from "react"
import { Row } from "@amsterdam/design-system-react"
import { PageGrid, PageHeading } from "app/components"
import SelectBpmnModelName from "./forms/SelectBpmnModelName"
import SelectBpmnModel from "./forms/SelectBpmnModel"
import BpmnDiagram from "./BpmnDiagram"

export const BpmnPage: React.FC = () => {
  const [bpmnModelName, setBpmnModelName] = useState<string | undefined>()
  const [bpmnModel, setBpmnModel] = useState<
    Components.Schemas.BpmnModel | undefined
  >()

  return (
    <PageGrid>
      <PageHeading label="BPMN" />
      <Row wrap style={{ marginBottom: "0.5rem" }}>
        <SelectBpmnModelName onSelect={setBpmnModelName} />
        {bpmnModelName && (
          <SelectBpmnModel
            bpmnModelName={bpmnModelName}
            onSelect={setBpmnModel}
          />
        )}
      </Row>
      {bpmnModel && <BpmnDiagram bpmnModel={bpmnModel} />}
    </PageGrid>
  )
}

export default BpmnPage
