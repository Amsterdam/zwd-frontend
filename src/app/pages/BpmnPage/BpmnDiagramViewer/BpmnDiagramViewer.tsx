import { useEffect, useRef } from "react"
import BpmnViewer from "bpmn-js/lib/NavigatedViewer"
import styles from "./BpmnDiagramViewer.module.css"

type Props = {
  xml: string // The BPMN XML content to display
  currentTaskSpecs?: string[]
}

type ElementRegistry = {
  get: (elementId: string) => unknown
}

type CustomCanvas = {
  zoom: (zoomLevel: string) => void
  addMarker: (elementId: string, className: string) => void
  removeMarker: (elementId: string, className: string) => void
}

const applyCurrentTaskMarkers = (
  canvas: CustomCanvas,
  elementRegistry: ElementRegistry,
  previouslyMarked: string[],
  currentTaskSpecs: string[]
): string[] => {
  previouslyMarked.forEach((taskSpec) => {
    try {
      canvas.removeMarker(taskSpec, styles.currentTask)
    } catch {
      // Element does not exist in this diagram, nothing to remove
    }
  })

  const appliedTaskSpecs: string[] = []
  currentTaskSpecs.forEach((taskSpec) => {
    const element = elementRegistry.get(taskSpec)
    if (!element) {
      console.warn(
        `Element ${taskSpec} not found in the BPMN diagram, marker skipped`
      )
      return
    }
    canvas.addMarker(taskSpec, styles.currentTask)
    appliedTaskSpecs.push(taskSpec)
  })

  return appliedTaskSpecs
}

const BpmnDiagramViewer: React.FC<Props> = ({ xml, currentTaskSpecs = [] }) => {
  const bpmnViewerRef = useRef<HTMLDivElement>(null)
  const viewerInstanceRef = useRef<BpmnViewer | null>(null)
  const markedTaskSpecsRef = useRef<string[]>([])
  const importTokenRef = useRef(0) // Guards against stale/overlapping imports
  const isDiagramReadyRef = useRef(false) // True once importXML for the current xml has resolved

  useEffect(() => {
    if (bpmnViewerRef.current) {
      viewerInstanceRef.current = new BpmnViewer({
        container: bpmnViewerRef.current
      })
    }

    return () => {
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current.destroy()
        viewerInstanceRef.current = null
      }
    }
  }, [])

  // Load the BPMN XML content, then apply markers once import is confirmed done
  useEffect(() => {
    if (!viewerInstanceRef.current || !xml) return

    isDiagramReadyRef.current = false
    importTokenRef.current += 1
    const currentImportToken = importTokenRef.current

    viewerInstanceRef.current
      .importXML(xml)
      .then(() => {
        if (currentImportToken !== importTokenRef.current) return

        const canvas = viewerInstanceRef.current?.get("canvas") as CustomCanvas
        const elementRegistry = viewerInstanceRef.current?.get(
          "elementRegistry"
        ) as ElementRegistry

        if (!canvas) return
        canvas.zoom("fit-viewport")

        markedTaskSpecsRef.current = []
        isDiagramReadyRef.current = true

        if (elementRegistry) {
          markedTaskSpecsRef.current = applyCurrentTaskMarkers(
            canvas,
            elementRegistry,
            [],
            currentTaskSpecs
          )
        }
      })
      .catch((err) => {
        if (currentImportToken !== importTokenRef.current) return
        console.warn("Failed to import BPMN diagram", err)
      })
  }, [xml])

  // Re-apply markers when currentTaskSpecs changes without a new XML import
  useEffect(() => {
    if (!viewerInstanceRef.current) return
    // Preventing a premature attempt before importXML has completed (see effect above)
    if (!isDiagramReadyRef.current) return

    const canvas = viewerInstanceRef.current.get("canvas") as CustomCanvas
    const elementRegistry = viewerInstanceRef.current.get(
      "elementRegistry"
    ) as ElementRegistry

    if (!canvas || !elementRegistry) return

    markedTaskSpecsRef.current = applyCurrentTaskMarkers(
      canvas,
      elementRegistry,
      markedTaskSpecsRef.current,
      currentTaskSpecs
    )
  }, [currentTaskSpecs])

  return <div ref={bpmnViewerRef} style={{ width: "100%", height: 500 }} />
}

export default BpmnDiagramViewer
