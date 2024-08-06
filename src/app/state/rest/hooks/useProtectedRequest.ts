import { useCallback } from "react"
import { useAuth } from "react-oidc-context"
import useRequest, { Method } from "./useRequest"


const useProtectedRequest = () => {
  const request = useRequest()
  const auth = useAuth()
  const token = auth.user?.access_token

  return useCallback(
    async <Schema>(method: Method, url: string, data?: unknown, additionalHeaders = {}) => {
      try {
        // TODO: What if token expires?
        const headers = {
          Authorization: `Bearer ${ token }`,
          ...additionalHeaders
        }
        const response = await request<Schema>(
          method,
          url,
          data,
          headers
        )
        return response
      } catch (error) {
        console.log("Error protected request:", error)
        // switch ((error as RequestError)?.response?.status) {
        //   case 401: keycloak.logout(); break
        //   case 403: navigateTo("/auth"); break
        // }
        if (error !== undefined) throw new Error("error")
      }
    },
    [token, request]
  )
}

export default useProtectedRequest
