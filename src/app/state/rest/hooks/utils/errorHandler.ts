import { useCallback } from "react"
import { AxiosError } from "axios"

// import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

/**
 * Default error handler:
 */
export const useErrorHandler = () =>
  useCallback((error: AxiosError) => console.error(error), [])

/**
 * Suppress error handler:
 */
export const useSuppressErrorHandler = () =>
  useCallback((error: AxiosError) => console.error(error), [])
