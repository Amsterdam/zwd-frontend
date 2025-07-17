import type { StateType } from "./types"

const noop = () => {}

export const initialState: StateType = {
  cases: {
    count: 0,
    createdRangeAfter: "",
    createdRangeBefore: "",
    district: "",
    endDateRangeAfter: "",
    endDateRangeBefore: "",
    neighborhood: "",
    pagination: {
      page: 1,
      pageSize: 25
    },
    results: [],
    searchString: "",
    sorting: {
      dataIndex: "created",
      order: "DESCEND"
    },
    status: "",
    wijk: "",
    updateContextCases: noop
  },
  tasks: {
    count: 0,
    district: "",
    neighborhood: "",
    pagination: {
      page: 1,
      pageSize: 25
    },
    results: [],
    searchString: "",
    sorting: {
      dataIndex: "created",
      order: "DESCEND"
    },
    status: "",
    wijk: "",
    updateContextTasks: noop
  }
}

export default initialState
