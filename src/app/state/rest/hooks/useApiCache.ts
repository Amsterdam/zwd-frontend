import { useCallback, useReducer } from "react"
import { produce } from "immer"

export type ApiCacheItem = {
  valid: boolean
  value: unknown
  errors: unknown[]
}

export type ApiCache = {
  getCacheItem: (key: string) => ApiCacheItem
  setCacheItem: (key: string, value: unknown) => void
  updateCacheItem: (key: string, updater: (item: unknown) => void) => void
  addErrorToCacheItem: (key: string, error: unknown) => void
  clearCache: () => void
}

type State = Record<string, ApiCacheItem>
type Action =
  | { type: "UPDATE_ITEM", key: string, updater: (item: unknown) => void }
  | { type: "SET_ITEM", key: string, value: unknown }
  | { type: "ADD_ERROR", key: string, error: unknown }
  | { type: "CLEAR" }

const reducer = (state: State, action: Action) => {
  switch(action.type) {
  case "UPDATE_ITEM": {
    const item = state[action.key]
    const value = produce(item.value, action.updater)
    return {
      ...state,
      [action.key]: { ...item, valid: true, value }
    }
  }
  case "SET_ITEM": {
    return {
      ...state,
      [action.key]: { valid: true, value: action.value, errors: [] }
    }
  }
  case "ADD_ERROR": {
    const item = state[action.key] ?? { valid: true, value: undefined, errors: [] }
    const errors = [...item.errors, action.error]
    return {
      ...state,
      [action.key]: { ...item, errors }
    }
  }
  case "CLEAR": {
    return Object
      .entries(state)
      .reduce((acc, [key, val]) => ({
        ...acc,
        [key]: { valid: false, value: val.value, errors: [] }
      }), {})
  }
  }
}

export const useApiCache = () => {
  const [ cache, dispatch ] = useReducer(reducer, {})

  const getCacheItem = useCallback((key: string) => cache[key], [ cache ])
  const setCacheItem = useCallback((key: string, value: unknown) => dispatch({ type: "SET_ITEM", key, value }), [ dispatch ])
  const updateCacheItem = useCallback((key: string, updater: (cache: unknown) => void) => dispatch({ type: "UPDATE_ITEM", key, updater }), [ dispatch ])
  const addErrorToCacheItem = useCallback((key: string, error: unknown) => dispatch({ type: "ADD_ERROR", key, error }), [ dispatch ])
  const clearCache = useCallback(() => dispatch({ type: "CLEAR" }), [ dispatch ])

  return { getCacheItem, setCacheItem, updateCacheItem, addErrorToCacheItem, clearCache }
}
