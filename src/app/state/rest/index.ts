export type ApiGroup =
  | "address"
  | "advisors"
  | "bagPdok"
  | "bpmn"
  | "cases"
  | "caseStatuses"
  | "dataPunt"
  | "districts"
  | "hoa"
  | "tasks"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export * from "./address"
export * from "./advisors"
export * from "./bagPdok"
export * from "./bpmn"
export * from "./cases"
export * from "./casesStatuses"
export * from "./dataPunt"
export * from "./districts"
export * from "./hoa"
export * from "./tasks"
