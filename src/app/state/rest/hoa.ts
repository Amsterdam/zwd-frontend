import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"
import stringifyQueryParams from "app/routing/utils/stringifyQueryParams"

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
  const params = stringifyQueryParams({ "hoa_name": searchString })
  return useApiRequest<HomeownerAssociationSearch[]>({
    ...options,
    url: `${makeApiUrl("homeowner-association", "search")}${params}`,
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
