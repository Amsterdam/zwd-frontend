import type { StateType } from "./types"

const noop = () => {}

export const initialState: StateType = {
  cases: {
    adviceType: "",
    applicationType: "",
    count: 0,
    createdRangeAfter: "",
    createdRangeBefore: "",
    district: "",
    endDateRangeAfter: "",
    endDateRangeBefore: "",
    isClosedFilter: "false",
    isSmallHoa: "",
    neighborhood: "",
    advisor: "",
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
    status: "",
    wijk: "",
    updateContextCases: noop
  },
  tasks: {
    count: 0,
    district: "",
    isClosedFilter: "false",
    neighborhood: "",
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
    status: "",
    wijk: "",
    updateContextTasks: noop
  }
}

export default initialState
