import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useDistricts = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<components["schemas"]["District"][]>({
    ...options,
    url: `${makeApiUrl("districts")}`,
    groupName: "districts",
    handleError,
    isProtected: true
  })
}

export const useNeighborhoods = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<components["schemas"]["Neighborhood"][]>({
    ...options,
    url: `${makeApiUrl("neighborhoods")}`,
    groupName: "districts",
    handleError,
    isProtected: true
  })
}
