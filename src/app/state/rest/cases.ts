import type { Options } from "./"
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"


type CaseApiResponse = Components.Schemas.Case[] | Components.Schemas.CaseCreate

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

export const useCase = (id: Components.Schemas.Case["id"] ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case>({
    ...options,
    url: `${ makeApiUrl("cases", id) }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useWorkflows = (id: Components.Schemas.Case["id"] ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseWorkflow[]>({
    ...options,
    url: `${ makeApiUrl("cases", id, "workflows") }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTaskComplete = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.GenericCompletedTaskCreate>({
    ...options,
    url: makeApiUrl("generic-tasks", "complete"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseEvents = (id: Components.Schemas.Case["id"] ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<CaseEvent[]>({
    ...options,
    url: `${ makeApiUrl("cases", id, "events") }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}