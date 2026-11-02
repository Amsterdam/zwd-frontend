export type FilterType = "array" | "select" | "date" | "search" | "boolean"

export type FilterLabelHelpers = {
  advisors?: components["schemas"]["CaseAdvisor"][]
  caseCloseReasons?: components["schemas"]["CaseCloseReason"][]
}

export type FilterConfig = {
  key: string
  type: FilterType
  contexts: ("cases" | "tasks" | "hoas")[]
  getLabel: (value: string, helpers?: FilterLabelHelpers) => string
}

export type FilterConfigs = Record<string, FilterConfig>

export type FilterChip = {
  key: string
  label: string
  value: string
}

export type FilterValue = string | string[] | undefined
