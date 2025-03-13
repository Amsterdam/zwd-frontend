import type { StateType } from "./types"

const noop = () => { }

export const initialState: StateType = {
  cases: {
    count: 0,
    pagination: {
      page: 1,
      pageSize: 25
    },
    results: [],
    updateContextCases: noop
  },
  tasks: {
    count: 0,
    pagination: {
      page: 1,
      pageSize: 25
    },
    results: [],
    updateContextTasks: noop
  }
}

export default initialState
