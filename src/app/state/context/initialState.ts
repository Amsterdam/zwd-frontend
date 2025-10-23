import type { StateType } from "./types"
import { DEFAULT_COLUMNS as CASES_DEFAULT_COLUMNS } from "app/pages/CasesPage/columns"
import { DEFAULT_COLUMNS as TASKS_DEFAULT_COLUMNS } from "app/pages/TasksPage/columns"

const noop = () => {}

export const initialState: StateType = {
  cases: {
    adviceType: "",
    applicationType: "",
    columnsVisible: CASES_DEFAULT_COLUMNS,
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
    columnsVisible: TASKS_DEFAULT_COLUMNS,
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
