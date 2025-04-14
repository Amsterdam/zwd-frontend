import { createContext, ReactNode } from "react"

import { ApiCache, useApiCache } from "../hooks/useApiCache"
import { RequestQueue, useRequestQueue } from "../hooks/useRequestQueue"
import { noopContext } from "./noopContext"

import { ApiGroup } from "../index"

type GroupedContext = Record<ApiGroup, ApiCache & RequestQueue>

export const ApiContext = createContext<GroupedContext>({
  address: noopContext,
  advisors: noopContext,
  bagPdok: noopContext,
  bpmn: noopContext,
  cases: noopContext,
  caseStatuses: noopContext,
  dataPunt: noopContext,
  districts: noopContext,
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
    advisors: {
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
    caseStatuses: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    dataPunt: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    districts: {
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

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiProvider
