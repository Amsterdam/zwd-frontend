export type ApiGroup =
  | "cases"
  | "tasks"
  | "bpmn"
  | "bagPdok"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export * from "./cases"
export * from "./tasks"
export * from "./bpmn"
export * from "./bagPdok"
