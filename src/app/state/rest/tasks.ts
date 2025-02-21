import type { Options } from "."
import { makeApiUrl, useErrorHandler } from "./hooks/utils"
import useApiRequest from "./hooks/useApiRequest"


export const useTasks = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<CustomCaseUserTask[]>({
    ...options,
    url: `${ makeApiUrl("tasks") }`,
    groupName: "tasks",
    handleError,
    isProtected: true
  })
}

export const useTask = (id: CustomCaseUserTask["id"] ,options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<CustomCaseUserTask>({
    ...options,
    url: `${ makeApiUrl("tasks", id) }`,
    groupName: "tasks",
    handleError,
    isProtected: true
  })
}
