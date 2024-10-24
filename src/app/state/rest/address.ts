import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"


export const useHomeownerAssociationByBagId = (bagId?: string ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.HomeownerAssociation>({
    ...options,
    url: `${ makeApiUrl("address", bagId, "homeowner-association") }`,
    lazy: bagId === undefined,
    groupName: "address",
    handleError,
    isProtected: true
  })
}

export const useHomeownerAssociation = (id?: Components.Schemas.HomeownerAssociation["id"] ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.HomeownerAssociation>({
    ...options,
    url: `${ makeApiUrl("homeowner-association", id) }`,
    lazy: id === undefined,
    groupName: "address",
    handleError,
    isProtected: true
  })
}
