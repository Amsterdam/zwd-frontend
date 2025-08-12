import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useAdvisors = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseAdvisor[]>({
    ...options,
    url: `${makeApiUrl("cases", id, "advisors")}`,
    groupName: "advisors",
    handleError,
    isProtected: true
  })
}

export const useAdvisor = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PatchedUpdateCaseAdvisor>({
    ...options,
    url: `${makeApiUrl("cases", id, "advisor")}`,
    lazy: true,
    groupName: "advisors",
    handleError,
    isProtected: true
  })
}

export const useAdvisorsList = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseAdvisor[]>({
    ...options,
    url: `${makeApiUrl("advisors")}`,
    groupName: "advisors",
    handleError,
    isProtected: true
  })
}
