import { createContext, ReactNode } from "react"

import { ApiCache, useApiCache } from "../hooks/useApiCache"
import { RequestQueue, useRequestQueue } from "../hooks/useRequestQueue"
import { noopContext } from "./noopContext"

import { ApiGroup } from "../index"

type GroupedContext = Record<ApiGroup, ApiCache & RequestQueue>

export const ApiContext = createContext<GroupedContext>({
  address: noopContext,
  bagPdok: noopContext,
  bpmn: noopContext,
  cases: noopContext,
  dataPunt: noopContext,
  hoa: noopContext,
  tasks: noopContext
})

type Props = {
  children: ReactNode
}

const ApiProvider: React.FC<Props> = ({ children }) => {
  const value: GroupedContext = {
    address: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    bagPdok: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    bpmn: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    cases: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    dataPunt: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    hoa: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    tasks: {
      ...useApiCache(),
      ...useRequestQueue()
    }
  }

  return (
    <ApiContext.Provider value={ value }>
      { children }
    </ApiContext.Provider>
  )
}

export default ApiProvider
