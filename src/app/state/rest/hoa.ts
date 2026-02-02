import { SORTING_INDEX_MAPPING, type Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"
import stringifyQueryParams from "app/routing/utils/stringifyQueryParams"
import { useMemo } from "react"
import { cleanParamObject, getOrderingQueryParam } from "./utils"

export const useHomeownerAssociations = (
  pagination: TABLE.Pagination,
  sorting?: TABLE.Sorting,
  searchString?: string,
  district?: string[],
  isSmallHoa?: string,
  participantCount?: number,
  letterCount?: number,
  neighborhood?: string[],
  options?: Options
) => {
  const handleError = useErrorHandler()

  const queryString = useMemo(() => {
    const params: Record<string, Value> = {
      page: pagination?.page ?? 1,
      page_size: pagination?.pageSize ?? 25,
      ordering: sorting
        ? getOrderingQueryParam(sorting, SORTING_INDEX_MAPPING)
        : undefined,
      search: searchString,
      district,
      is_small_hoa: isSmallHoa,
      course_participant_count: participantCount,
      letter_count: letterCount,
      neighborhood,
    }
    return stringifyQueryParams(cleanParamObject(params))
  }, [
    pagination.page,
    pagination.pageSize,
    sorting,
    searchString,
    district,
    isSmallHoa,
    participantCount,
    letterCount,
    neighborhood
  ])
  return useApiRequest<Components.Schemas.PaginatedCaseListList>({
    ...options,
    url: `${makeApiUrl("homeowner-association")}${queryString}`,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}


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
  const params = stringifyQueryParams({ hoa_name: searchString })
  return useApiRequest<HomeownerAssociationSearch[]>({
    ...options,
    url: `${makeApiUrl("homeowner-association", "search")}${params}`,
    lazy: !searchString,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}

export const useHomeownerAssociationContacts = (
  id?: Components.Schemas.HomeownerAssociation["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Contact[]>({
    ...options,
    url: `${makeApiUrl("homeowner-association", id, "contacts")}`,
    lazy: id === undefined,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export type CreateOrUpdateHoaContactsPayload = {
  contacts: Array<
    Pick<Components.Schemas.Contact, "fullname" | "email" | "phone" | "role"> &
      Partial<Pick<Components.Schemas.Contact, "id" | "is_primary" | "course_date">>
  >
}

export const useHomeownerAssociationContactsCreateOrUpdate = (
  hoaId: Components.Schemas.HomeownerAssociation["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<CreateOrUpdateHoaContactsPayload>({
    ...options,
    url: `${makeApiUrl("homeowner-association", hoaId, "contacts")}`,
    lazy: true,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useHomeownerAssociationContactDelete = (
  hoaId: Components.Schemas.HomeownerAssociation["id"],
  contactId: Components.Schemas.Contact["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Contact>({
    ...options,
    url: `${makeApiUrl("homeowner-association", hoaId, "delete-contact", contactId)}`,
    lazy: true,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useHomeownerAssociationApartments = (
  id?: Components.Schemas.HomeownerAssociation["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Apartment[]>({
    ...options,
    url: `${makeApiUrl("homeowner-association", id, "apartments")}`,
    lazy: id === undefined,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}

export const useLetterImport = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.ImportResult>({
    ...options,
    url: `${makeApiUrl("homeowner-association", "import-letters")}`,
    lazy: true,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}

export const useCourseParticipantImport = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.ImportResult>({
    ...options,
    url: `${makeApiUrl("homeowner-association", "import-course-participants")}`,
    lazy: true,
    groupName: "hoa",
    handleError,
    isProtected: true
  })
}
