import type { Options } from "./"
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"
import stringifyQueryParams from "app/routing/utils/stringifyQueryParams"

export const useCases = (pagination: Pagination, options?: Options) => {
  const handleError = useErrorHandler()
  const urlParams = {
    page: pagination?.page ?? 1,
    page_size: pagination?.pageSize
  }
  const queryString = stringifyQueryParams(urlParams)

  return useApiRequest<Components.Schemas.PaginatedCaseListList>({
    ...options,
    url: `${makeApiUrl("cases")}${queryString}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCase = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case>({
    ...options,
    url: `${makeApiUrl("cases", id)}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseCreate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseCreate>({
    lazy: true,
    ...options,
    url: `${makeApiUrl("cases")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useWorkflows = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseWorkflow[]>({
    ...options,
    url: `${makeApiUrl("cases", id, "workflows")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTaskComplete = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.GenericCompletedTaskCreate>({
    ...options,
    url: makeApiUrl("generic-tasks", "complete"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTaskCompleteFileUpload = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.GenericCompletedTaskCreate>({
    ...options,
    url: makeApiUrl("generic-tasks", "complete-file-task"),
    lazy: true,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseProcesses = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.WorkflowOption[]>({
    ...options,
    url: `${makeApiUrl("cases", "processes")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseProcessesStart = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.StartWorkflow>({
    ...options,
    url: `${makeApiUrl("cases", id, "processes", "start")}`,
    lazy: true,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseEvents = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<CaseEvent[]>({
    ...options,
    url: `${makeApiUrl("cases", id, "events")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseDocuments = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseDocument[]>({
    ...options,
    url: `${makeApiUrl("cases", id, "documents")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseDocumentUpload = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseDocument>({
    ...options,
    url: `${makeApiUrl("cases", "documents")}`,
    lazy: true,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseDocumentDelete = (
  id: Components.Schemas.Case["id"],
  docId: Components.Schemas.CaseDocument["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseDocument>({
    ...options,
    url: `${makeApiUrl("cases", id, "documents", docId)}`,
    lazy: true,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
