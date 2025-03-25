import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useBpmnModelNames = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<string[]>({
    ...options,
    url: `${makeApiUrl("bpmn-models")}`,
    groupName: "bpmn",
    handleError,
    isProtected: true
  })
}

export const useBpmnModels = (bpmnModelName?: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.BpmnModel[]>({
    ...options,
    url: `${makeApiUrl("bpmn-models", bpmnModelName)}`,
    groupName: "bpmn",
    handleError,
    isProtected: true
  })
}

export const useBpmnFile = (
  modelName: string,
  version: string,
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<string>({
    ...options,
    url: `${makeApiUrl("bpmn-models", modelName, "file", version)}`,
    groupName: "bpmn",
    handleError,
    isProtected: true
  })
}
