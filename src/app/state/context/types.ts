export type Payload = {
  [key: string]: Value
}

export type ActionType = {
  type: string
  payload: Payload
}

export type StateType = {
  cases: {
    adviceType: string
    applicationType: string
    count: number
    createdRangeAfter?: string
    createdRangeBefore?: string
    district: string
    endDateRangeAfter?: string
    endDateRangeBefore?: string
    isClosedFilter: string
    isSmallHoa: string
    neighborhood: string
    pagination: TABLE.Pagination
    results: Components.Schemas.CaseList[]
    searchString: string
    showAllFilters: boolean
    sorting: TABLE.Sorting
    status: string
    wijk: string
    updateContextCases: (payload: Payload) => void
  }
  tasks: {
    count: number
    district: string
    isClosedFilter: string
    neighborhood: string
    pagination: TABLE.Pagination
    results: CustomCaseUserTask[]
    searchString: string
    showAllFilters: boolean
    sorting: TABLE.Sorting
    status: string
    wijk: string
    updateContextTasks: (payload: Payload) => void
  }
}
