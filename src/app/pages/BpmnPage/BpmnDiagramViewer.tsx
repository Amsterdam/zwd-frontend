import { useEffect, useRef } from "react"
import BpmnViewer from "bpmn-js/lib/NavigatedViewer"

type Props = {
  xml: string // The BPMN XML content to display
}

type CustomCanvas = {
  zoom: (zoomLevel: string) => void
}

const BpmnDiagramViewer: React.FC<Props> = ({ xml }) => {
  const bpmnViewerRef = useRef<HTMLDivElement>(null) // Reference to the container div
  const viewerInstanceRef = useRef<BpmnViewer | null>(null) // To hold the instance of BpmnViewer

  // Initialize the BPMN viewer
  useEffect(() => {
    if (bpmnViewerRef.current) {
      // Initialize the BpmnViewer
      viewerInstanceRef.current = new BpmnViewer({
        container: bpmnViewerRef.current
      })
    }

    return () => {
      // Cleanup: Destroy the viewer instance when the component unmounts
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current.destroy()
        viewerInstanceRef.current = null
      }
    }
  }, [])

  // Load the BPMN XML content
  useEffect(() => {
    if (viewerInstanceRef.current && xml) {
      viewerInstanceRef.current
        .importXML(xml)
        .then(() => {
          const canvas = viewerInstanceRef.current?.get(
            "canvas"
          ) as CustomCanvas
          if (canvas) {
            canvas.zoom("fit-viewport")
          }
        })
        .catch((err) => {
          console.warn("Failed to import BPMN diagram", err)
        })
    }
  }, [xml])

  return <div ref={bpmnViewerRef} style={{ width: "100%", height: 500 }} />
}

export default BpmnDiagramViewer
