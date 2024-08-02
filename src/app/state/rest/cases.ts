import type { Options } from "./"
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"

type CaseApiResponse = Components.Schemas.Case[] | Components.Schemas.Case;

export const useCases = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<CaseApiResponse>({
    ...options,
    url: `${ makeApiUrl("cases") }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
