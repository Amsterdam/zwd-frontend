import type { StateType } from "./types"

const noop = () => {}

export const initialState: StateType = {
  cases: {
    adviceType: "",
    applicationType: "",
    count: 0,
    requestDateRangeAfter: "",
    requestDateRangeBefore: "",
    district: [],
    endDateRangeAfter: "",
    endDateRangeBefore: "",
    isClosedFilter: "false",
    isSmallHoa: "",
    neighborhood: [],
    advisor: [],
    pagination: {
      page: 1,
      pageSize: 25
    },
    results: [],
    searchString: "",
    showAllFilters: false,
    sorting: {
      dataIndex: "request_date",
      order: "DESCEND"
    },
    status: [],
    wijk: "",
    updateContextCases: noop
  },
  tasks: {
    adviceType: "",
    advisor: [],
    applicationType: "",
    count: 0,
    requestDateRangeAfter: "",
    requestDateRangeBefore: "",
    district: [],
    isClosedFilter: "false",
    isSmallHoa: "",
    neighborhood: [],
    taskName: "",
    pagination: {
      page: 1,
      pageSize: 25
    },
    results: [],
    searchString: "",
    showAllFilters: false,
    sorting: {
      dataIndex: "created",
      order: "DESCEND"
    },
    status: [],
    wijk: "",
    updateContextTasks: noop
  }
}

export default initialState
