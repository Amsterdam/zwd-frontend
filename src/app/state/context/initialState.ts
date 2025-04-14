import type { StateType } from "./types"

const noop = () => {}

export const initialState: StateType = {
  cases: {
    count: 0,
    district: "",
    neighborhood: "",
    pagination: {
      page: 1,
      pageSize: 100
    },
    results: [],
    searchString: "",
    sorting: {
      dataIndex: "created",
      order: "DESCEND"
    },
    status: "",
    updateContextCases: noop,
    wijk: ""
  },
  tasks: {
    count: 0,
    pagination: {
      page: 1,
      pageSize: 100
    },
    results: [],
    sorting: {
      dataIndex: "created",
      order: "DESCEND"
    },
    updateContextTasks: noop
  }
}

export default initialState
