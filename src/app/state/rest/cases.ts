import type { Options } from "./"
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"


export const useCases = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case[]>({
    ...options,
    url: `${ makeApiUrl("cases") }`,
    groupName: "cases",
    handleError
  })
}
