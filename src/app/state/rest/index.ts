export type ApiGroup =
  | "cases"
  | "tasks"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export * from "./cases"
// export * from "./tasks"
