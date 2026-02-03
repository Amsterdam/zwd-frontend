import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"

type CommunicationNote = Components.Schemas.HomeownerAssociationCommunicationNote

export const useCommunicationNotes = (
  id: Components.Schemas.HomeownerAssociation["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<CommunicationNote[] | CommunicationNote>({
    ...options,
    url: `${makeApiUrl("homeowner-association", id, "communication-notes")}`,
    groupName: "hoas",
    handleError,
    isProtected: true
  })
}

export const useCommunicationNote = (
  hoaId: Components.Schemas.HomeownerAssociation["id"],
  noteId: CommunicationNote["id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<CommunicationNote>({
    ...options,
    url: `${makeApiUrl("homeowner-association", hoaId, "communication-notes", noteId)}`,
    lazy: true,
    groupName: "hoas",
    handleError,
    isProtected: true
  })
}
