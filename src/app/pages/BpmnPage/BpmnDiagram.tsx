import { useBpmnFile } from "app/state/rest"
import { PageSpinner } from "app/components"
import BpmnDiagramViewer from "./BpmnDiagramViewer"

type Props = { 
  bpmnModel: Components.Schemas.BpmnModel
}

export const BpmnDiagram: React.FC<Props> = ({ bpmnModel }) => {
  const { model, version } = bpmnModel
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [xml, { isBusy }] = useBpmnFile(model, version)
  
  if (isBusy) {
    return <PageSpinner/>
  } else if (xml) {
    return <BpmnDiagramViewer xml={ xml } />
  }
  return <></>
}

export default BpmnDiagram
    