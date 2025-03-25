import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"
import stringifyQueryParams from "app/routing/utils/stringifyQueryParams"
import getOrderingQueryParam from "./utils/getOrderingQueryParam"

const SORTING_INDEX_MAPPING: Record<string, string> = {
  created: "created",
  id: "id"
}

export const useTasks = (
  pagination: TABLE.Pagination,
  sorting?: TABLE.Sorting,
  options?: Options
) => {
  const handleError = useErrorHandler()

  const urlParams: Record<string, string | number> = {
    page: pagination?.page ?? 1,
    page_size: pagination?.pageSize ?? 25
  }
  if (sorting) {
    urlParams.ordering = getOrderingQueryParam(sorting, SORTING_INDEX_MAPPING)
  }
  const queryString = stringifyQueryParams(urlParams)

  return useApiRequest<Components.Schemas.PaginatedCaseUserTaskListList>({
    ...options,
    url: `${makeApiUrl("tasks")}${queryString}`,
    groupName: "tasks",
    handleError,
    isProtected: true
  })
}

export const useTask = (id: CustomCaseUserTask["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<CustomCaseUserTask>({
    ...options,
    url: `${makeApiUrl("tasks", id)}`,
    groupName: "tasks",
    handleError,
    isProtected: true
  })
}
