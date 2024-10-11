export type ApiGroup =
  | "address" 
  | "bagPdok"
  | "bpmn"
  | "cases"
  | "dataPunt"
  | "tasks"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export * from "./address"
export * from "./bagPdok"
export * from "./bpmn"
export * from "./cases"
export * from "./dataPunt"
export * from "./tasks"
