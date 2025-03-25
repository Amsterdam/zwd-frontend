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
    pagination: TABLE.Pagination
    results: Components.Schemas.CaseList[]
    sorting: TABLE.Sorting
    updateContextCases: (payload: Payload) => void
  }
  tasks: {
    count: number
    pagination: TABLE.Pagination
    results: CustomCaseUserTask[]
    sorting: TABLE.Sorting
    updateContextTasks: (payload: Payload) => void
  }
}
