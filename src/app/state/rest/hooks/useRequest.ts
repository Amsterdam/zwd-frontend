import { useCallback } from "react"
import axios, { Method, AxiosError } from "axios"

export type { Method } from "axios"
export type RequestError = AxiosError

export const useRequest = () =>
  useCallback(
    async <Schema>(method: Method, url: string, data?: unknown, headers = {}) =>
      await axios.request<Schema>({
        method,
        url,
        headers,
        data
      }),
    []
  )

export default useRequest
