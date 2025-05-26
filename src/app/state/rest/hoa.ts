import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"
import { env } from "app/config/env"

export const useHomeownerAssociation = (
  id?: Components.Schemas.HomeownerAssociation["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.HomeownerAssociation>({
    ...options,
    url: `${makeApiUrl("homeowner-association", id)}`,
    lazy: id === undefined,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}

export const useHomeownerAssociationCases = (
  id?: Components.Schemas.HomeownerAssociation["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case[]>({
    ...options,
    url: `${makeApiUrl("homeowner-association", id, "cases")}`,
    lazy: id === undefined,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useHomeownerAssociationSearch = (
  searchString?: string,
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<HomeownerAssociationSearch[]>({
    ...options,
    url: `${env.VITE_API_URL}homeowner-association/search?hoa_name=${searchString}`,
    lazy: !searchString,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}

export const useHoaContacts = (
  id?: Components.Schemas.HomeownerAssociation["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Contact[]>({
    ...options,
    url: `${makeApiUrl("homeowner-association", id, "contacts")}`,
    lazy: id === undefined,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}
