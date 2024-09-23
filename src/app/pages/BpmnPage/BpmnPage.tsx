import { useState } from "react"
import styled from "styled-components"
import { Row } from "@amsterdam/design-system-react"
import { PageHeading } from "app/components"
import SelectBpmnModelName from "./forms/SelectBpmnModelName"
import SelectBpmnModel from "./forms/SelectBpmnModel"
import BpmnDiagram from "./BpmnDiagram"

const StyledRow = styled(Row)`
  margin-bottom: 2rem;
`

export const BpmnPage: React.FC = () => {
  const [bpmnModelName, setBpmnModelName] = useState<undefined | string>()
  const [bpmnModel, setBpmnModel] = useState<Components.Schemas.BpmnModel>()
  
  return (
    <>
      <PageHeading label="BPMN" />
      <StyledRow wrap>
        <SelectBpmnModelName onSelect={ setBpmnModelName } />
        { bpmnModelName ? <SelectBpmnModel bpmnModelName={ bpmnModelName } onSelect={ setBpmnModel }/> : <></> }
      </StyledRow>
      { bpmnModel ? <BpmnDiagram bpmnModel={ bpmnModel } /> : <></> } 
      
    </>
  )
}

export default BpmnPage
    