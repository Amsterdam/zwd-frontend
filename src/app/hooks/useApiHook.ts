import { useState, useEffect } from "react"
import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { env } from "app/config/env" 

export const useApiHook = <T>(endpoint: string, params?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const url = `${ env.VITE_API_URL }${ endpoint }`

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response: AxiosResponse<T> = await axios.get(url, params)
        setData(response.data)
        setLoading(false)
      } catch (error) {
        setError("Error getting the data")
        setLoading(false)
      }
    }

    void fetchData()
    
  }, [params, url])

  return [ data, loading, error ]
}

export default useApiHook