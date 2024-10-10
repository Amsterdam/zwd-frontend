import { useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export const useURLState = (key: string, defaultValue: string): [string, (value: string) => void] => {
  const navigate = useNavigate()
  const location = useLocation()

  const getQueryParam = (key: string): string | null => {
    const params = new URLSearchParams(location.search)
    return params.get(key)
  }

  const setQueryParam = (key: string, value: string): void => {
    const params = new URLSearchParams(location.search)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    navigate({ search: params.toString() }, { replace: true })
  }

  const [state, setState] = useState<string>(() => getQueryParam(key) || defaultValue)

  useEffect(() => {
    setQueryParam(key, state)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, state])

  const setURLState = useCallback((value: string) => {
    setState(value)
  }, [])

  return [state, setURLState]
}

export default useURLState