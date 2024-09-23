export type ApiGroup =
  | "cases"
  | "tasks"
  | "bpmn"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export * from "./cases"
export * from "./tasks"
export * from "./bpmn"
