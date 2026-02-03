import { formatDate } from "app/utils/dates"
import { FilterConfigs } from "./types"

export const FILTER_CONFIGS: FilterConfigs = {
  searchString: {
    key: "searchString",
    type: "search",
    contexts: ["cases", "tasks", "hoas"],
    getLabel: (value) => `Zoeken: “${value}”`
  },
  taskName: {
    key: "taskName",
    type: "select",
    contexts: ["tasks"],
    getLabel: (value) => value
  },
  isClosedFilter: {
    key: "isClosedFilter",
    type: "boolean",
    contexts: ["cases"],
    getLabel: (value) => (value === "true" ? "Gesloten zaken" : "Open zaken")
  },
  status: {
    key: "status",
    type: "array",
    contexts: ["cases", "tasks"],
    getLabel: (value) => value
  },
  district: {
    key: "district",
    type: "array",
    contexts: ["cases", "tasks", "hoas"],
    getLabel: (value) => value
  },
  neighborhood: {
    key: "neighborhood",
    type: "array",
    contexts: ["cases", "tasks"],
    getLabel: (value) => value
  },
  advisor: {
    key: "advisor",
    type: "array",
    contexts: ["cases", "tasks"],
    getLabel: (value, advisors) =>
      advisors?.find((a) => String(a.id) === value)?.name || value
  },
  applicationType: {
    key: "applicationType",
    type: "select",
    contexts: ["cases", "tasks"],
    getLabel: (value) => value
  },
  adviceType: {
    key: "adviceType",
    type: "select",
    contexts: ["cases", "tasks"],
    getLabel: (value) => value
  },
  isSmallHoa: {
    key: "isSmallHoa",
    type: "boolean",
    contexts: ["cases", "tasks", "hoas"],
    getLabel: (value) => (value === "true" ? "Kleine vve's" : "Grote vve's")
  },
  requestDateRangeAfter: {
    key: "requestDateRangeAfter",
    type: "date",
    contexts: ["cases", "tasks"],
    getLabel: (value) => `Aanvraagdatum na ${formatDate(value)}`
  },
  requestDateRangeBefore: {
    key: "requestDateRangeBefore",
    type: "date",
    contexts: ["cases", "tasks"],
    getLabel: (value) => `Aanvraagdatum voor ${formatDate(value)}`
  },
  endDateRangeAfter: {
    key: "endDateRangeAfter",
    type: "date",
    contexts: ["cases"],
    getLabel: (value) => `Einddatum na ${formatDate(value)}`
  },
  endDateRangeBefore: {
    key: "endDateRangeBefore",
    type: "date",
    contexts: ["cases"],
    getLabel: (value) => `Einddatum voor ${formatDate(value)}`
  }
}
