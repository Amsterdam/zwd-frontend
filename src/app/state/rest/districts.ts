import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useDistricts = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.District[]>({
    ...options,
    url: `${makeApiUrl("districts")}`,
    groupName: "districts",
    handleError,
    isProtected: true
  })
}

export const useNeighborhoods = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Neighborhood[]>({
    ...options,
    url: `${makeApiUrl("neighborhoods")}`,
    groupName: "districts",
    handleError,
    isProtected: true
  })
}
