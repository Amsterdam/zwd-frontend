import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useCaseStatuses = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseStatus[]>({
    ...options,
    url: `${makeApiUrl("case-statuses")}`,
    groupName: "caseStatuses",
    handleError,
    isProtected: true
  })
}
