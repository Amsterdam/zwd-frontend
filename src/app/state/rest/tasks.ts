import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"
import stringifyQueryParams from "app/utils/stringifyQueryParams"

export const useTasks = (pagination: Pagination, options?: Options) => {
  const handleError = useErrorHandler()
  const urlParams = {
    page: pagination?.page ?? 1,
    page_size: pagination?.pageSize
  }
  const queryString = stringifyQueryParams(urlParams)
  
  return useApiRequest<Components.Schemas.PaginatedCaseUserTaskListList>({
    ...options,
    url: `${ makeApiUrl("tasks") }${queryString}`,
    groupName: "tasks",
    handleError,
    isProtected: true
  })
}

export const useTask = (id: CustomCaseUserTask["id"] ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<CustomCaseUserTask>({
    ...options,
    url: `${ makeApiUrl("tasks", id) }`,
    groupName: "tasks",
    handleError,
    isProtected: true
  })
}
