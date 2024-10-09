import { createContext, ReactNode } from "react"

import { ApiCache, useApiCache } from "../hooks/useApiCache"
import { RequestQueue, useRequestQueue } from "../hooks/useRequestQueue"
import { noopContext } from "./noopContext"

import { ApiGroup } from "../index"

type GroupedContext = Record<ApiGroup, ApiCache & RequestQueue>

export const ApiContext = createContext<GroupedContext>({
  bpmn: noopContext,
  cases: noopContext,
  tasks: noopContext,
  bagPdok: noopContext
})

type Props = {
  children: ReactNode
}

const ApiProvider: React.FC<Props> = ({ children }) => {
  const value: GroupedContext = {
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
