import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"

type CommunicationNote = Components.Schemas.CaseCommunicationNote

export const useCommunicationNotes = (
  id: Components.Schemas.Case["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<CommunicationNote[] | CommunicationNote>({
    ...options,
    url: `${makeApiUrl("cases", id, "communication-notes")}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCommunicationNote = (
  caseId: Components.Schemas.Case["id"],
  noteId: CommunicationNote["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<CommunicationNote>({
    ...options,
    url: `${makeApiUrl("cases", caseId, "communication-notes", noteId)}`,
    lazy: true,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
