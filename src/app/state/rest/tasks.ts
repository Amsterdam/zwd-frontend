import { useMemo } from "react"
import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"
import stringifyQueryParams from "app/routing/utils/stringifyQueryParams"
import getOrderingQueryParam from "./utils/getOrderingQueryParam"
import { cleanParamObject } from "./utils"

const SORTING_INDEX_MAPPING: Record<string, string> = {
  created: "created",
  "case.prefixed_dossier_id": "case__prefixed_dossier_id",
  "case.homeowner_association.name": "case__homeowner_association__name",
  "case.homeowner_association.district":
    "case__homeowner_association__district",
  "case.homeowner_association.neighborhood":
    "case__homeowner_association__neighborhood",
  "case.homeowner_association.number_of_apartments":
    "case__homeowner_association__number_of_apartments",
  "case.application_type": "case__application_type",
  "case.advice_type": "case__advice_type",
  "case.advisor": "case__advisor",
  "case.status": "case__status",
  name: "name"
}

export const useTasks = (
  pagination: TABLE.Pagination,
  district?: string[],
  neighborhood?: string[],
  searchString?: string,
  sorting?: TABLE.Sorting,
  taskName?: string,
  status?: string[],
  wijk?: string,
  adviceType?: string,
  advisor?: string[],
  applicationType?: string,
  requestDateRangeAfter?: string,
  requestDateRangeBefore?: string,
  isSmallHoa?: string,
  options?: Options
) => {
  const handleError = useErrorHandler()

  const queryString = useMemo(() => {
    const params: Record<string, Value> = {
      page: pagination?.page ?? 1,
      page_size: pagination?.pageSize ?? 25,
      district,
      neighborhood,
      search: searchString,
      name: taskName,
      status,
      wijk,
      advice_type: adviceType,
      advisor,
      application_type: applicationType,
      request_date_range_after: requestDateRangeAfter,
      request_date_range_before: requestDateRangeBefore,
      is_small_hoa: isSmallHoa,
      ordering: sorting
        ? getOrderingQueryParam(sorting, SORTING_INDEX_MAPPING)
        : undefined
    }
    return stringifyQueryParams(cleanParamObject(params))
  }, [
    pagination.page,
    pagination.pageSize,
    district,
    neighborhood,
    searchString,
    taskName,
    status,
    wijk,
    adviceType,
    advisor,
    applicationType,
    requestDateRangeAfter,
    requestDateRangeBefore,
    isSmallHoa,
    sorting
  ])

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

export const useTaskNames = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<string[]>({
    ...options,
    url: `${makeApiUrl("tasks", "names")}`,
    groupName: "tasks",
    handleError,
    isProtected: true
  })
}
