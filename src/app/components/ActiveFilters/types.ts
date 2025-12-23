export type FilterType = "array" | "select" | "date" | "search" | "boolean"

export type FilterConfig = {
  key: string
  type: FilterType
  contexts: ("cases" | "tasks")[]
  getLabel: (value: string, helpers?: Components.Schemas.CaseAdvisor[] | undefined) => string
}

export type FilterConfigs = Record<string, FilterConfig>

export type FilterChip = {
  key: string
  label: string
  value: string
}

export type FilterValue = string | string[] | undefined
