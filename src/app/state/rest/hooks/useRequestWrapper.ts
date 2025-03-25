import useRequest from "./useRequest"
import useProtectedRequest from "./useProtectedRequest"
export type { RequestError, Method } from "./useRequest"

export default (isProtected?: boolean) => {
  const request = useRequest()
  const protectedRequest = useProtectedRequest()

  return isProtected ? protectedRequest : request
}
