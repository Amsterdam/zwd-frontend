export type Payload = {
  [key: string]: Value
}

export type ActionType = {
  type: string
  payload: Payload
}

export type StateType = {
  cases: {
    count: number
    district: string
    neighborhood: string
    pagination: TABLE.Pagination
    results: Components.Schemas.CaseList[]
    searchString: string
    sorting: TABLE.Sorting
    status: string
    wijk: string
    updateContextCases: (payload: Payload) => void
  }
  tasks: {
    count: number
    district: string
    neighborhood: string
    pagination: TABLE.Pagination
    results: CustomCaseUserTask[]
    searchString: string
    sorting: TABLE.Sorting
    status: string
    wijk: string
    updateContextTasks: (payload: Payload) => void
  }
}
