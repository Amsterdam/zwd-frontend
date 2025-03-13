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
    pagination: Pagination
    results: Components.Schemas.CaseList[]
    updateContextCases: (payload: Payload) => void
  }
  tasks: {
    count: number
    pagination: Pagination
    results: CustomCaseUserTask[]
    updateContextTasks: (payload: Payload) => void
  }
}
