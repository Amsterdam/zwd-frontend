import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"


export const useHomeownerAssociation = (id?: Components.Schemas.HomeownerAssociation["id"] ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.HomeownerAssociation>({
    ...options,
    url: `${ makeApiUrl("homeowner-association", id) }`,
    lazy: id === undefined,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}

export const useHomeownerAssociationCases = (id?: Components.Schemas.HomeownerAssociation["id"] ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case[]>({
    ...options,
    url: `${ makeApiUrl("homeowner-association", id, "cases") }`,
    lazy: id === undefined,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}
