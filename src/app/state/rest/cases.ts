import { useMemo } from "react"
import type { Options } from "./"
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"
import stringifyQueryParams from "app/routing/utils/stringifyQueryParams"
import { getOrderingQueryParam, cleanParamObject } from "./utils"

// You can add multiple sorting options here like `created: "created, id"`
const SORTING_INDEX_MAPPING: Record<string, string> = {
  created: "created",
  id: "id",
  updated: "updated",
  prefixed_dossier_id: "id",
  status: "status",
  "homeowner_association.name": "homeowner_association__name",
  legacy_id: "legacy_id"
}

export const useCases = (
  pagination: TABLE.Pagination,
  createdRangeAfter?: string,
  createdRangeBefore?: string,
  district?: string,
  endDateRangeAfter?: string,
  endDateRangeBefore?: string,
  neighborhood?: string,
  searchString?: string,
  sorting?: TABLE.Sorting,
  status?: string,
  wijk?: string,
  options?: Options
) => {
  const handleError = useErrorHandler()

  const queryString = useMemo(() => {
    const params: Record<string, Value> = {
      page: pagination?.page ?? 1,
      page_size: pagination?.pageSize ?? 25,
      created_range_after: createdRangeAfter,
      created_range_before: createdRangeBefore,
      end_date_range_after: endDateRangeAfter,
      end_date_range_before: endDateRangeBefore,
      closed: "false",
      district,
      neighborhood,
      search: searchString,
      status,
      wijk,
      ordering: sorting
        ? getOrderingQueryParam(sorting, SORTING_INDEX_MAPPING)
        : undefined
    }
    return stringifyQueryParams(cleanParamObject(params))
  }, [
    pagination.page,
    pagination.pageSize,
    createdRangeAfter,
    createdRangeBefore,
    district,
    endDateRangeAfter,
    endDateRangeBefore,
    neighborhood,
    searchString,
    status,
    wijk,
    sorting
  ])

  return useApiRequest<Components.Schemas.PaginatedCaseListList>({
    ...options,
    url: `${makeApiUrl("cases")}${queryString}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCase = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
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
  return useApiRequest<CaseCreateInput>({
    lazy: true,
    ...options,
    url: `${makeApiUrl("cases")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useWorkflows = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
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

export const useCaseProcesses = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.WorkflowOption[]>({
    ...options,
    url: `${makeApiUrl("cases", id, "processes")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseProcessesStart = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
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

export const useCaseEvents = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<CaseEvent[]>({
    ...options,
    url: `${makeApiUrl("cases", id, "events")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseDocuments = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
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

export const useCaseDocumentUpdate = (
  id: Components.Schemas.Case["id"],
  docId: Components.Schemas.CaseDocument["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseDocument>({
    ...options,
    url: `${makeApiUrl("cases", id, "documents", docId, "update-name")}`,
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

export const useCaseCloseReasons = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseCloseReason[]>({
    ...options,
    url: makeApiUrl("case-close", "reasons"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseClose = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseClose>({
    ...options,
    url: makeApiUrl("case-close"),
    lazy: true,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
