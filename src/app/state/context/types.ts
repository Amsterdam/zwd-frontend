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
    advisor: string[]
    applicationType: string
    columnsVisible: string[]
    count: number
    requestDateRangeAfter?: string
    requestDateRangeBefore?: string
    district: string[]
    endDateRangeAfter?: string
    endDateRangeBefore?: string
    isClosedFilter: string
    isSmallHoa: string
    neighborhood: string[]
    pagination: TABLE.Pagination
    results: Components.Schemas.CaseList[]
    searchString: string
    showAllFilters: boolean
    sorting: TABLE.Sorting
    status: string[]
    wijk: string
    updateContextCases: (payload: Payload) => void
  }
  tasks: {
    adviceType: string
    advisor: string[]
    applicationType: string
    columnsVisible: string[]
    count: number
    requestDateRangeAfter?: string
    requestDateRangeBefore?: string
    district: string[]
    isClosedFilter: string
    isSmallHoa: string
    neighborhood: string[]
    taskName: string
    pagination: TABLE.Pagination
    results: Components.Schemas.CaseUserTaskList[]
    searchString: string
    showAllFilters: boolean
    sorting: TABLE.Sorting
    status: string[]
    wijk: string
    updateContextTasks: (payload: Payload) => void
  },
  hoa: {
    name: string,
    columnsVisible: string[]
    count: number
    pagination: TABLE.Pagination
    results: Components.Schemas.CaseList[]
    sorting: TABLE.Sorting,
    searchString: string
    updateContextHoa: (payload: Payload) => void
  }
}

