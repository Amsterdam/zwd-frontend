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
    updateContextCases: (payload: Payload) => void
    wijk: string
  }
  tasks: {
    count: number
    pagination: TABLE.Pagination
    results: CustomCaseUserTask[]
    sorting: TABLE.Sorting
    updateContextTasks: (payload: Payload) => void
  }
}
