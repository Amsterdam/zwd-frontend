import { useBpmnFile } from "app/state/rest"
import { PageSpinner } from "app/components"
import BpmnDiagramViewer from "./BpmnDiagramViewer/BpmnDiagramViewer"

type Props = {
  model: string
  version: string
  currentTaskSpecs?: string[]
}

export const BpmnDiagram: React.FC<Props> = ({
  model,
  version,
  currentTaskSpecs
}) => {
  const [xml, { isBusy }] = useBpmnFile(model, version)

  if (isBusy) {
    return <PageSpinner />
  } else if (xml) {
    return <BpmnDiagramViewer xml={xml} currentTaskSpecs={currentTaskSpecs} />
  }
  return <></>
}

export default BpmnDiagram
