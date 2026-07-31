type EventType = "CASE" | "GENERIC_TASK" | "CASE_CLOSE"

type Value = Record<string, Value> | string

type CaseEvent = {
  id: number
  event_values: Record<string, string>
  event_variables: Record<string, Value>
  date_created: string // date-time
  type: EventType
  emitter_id: number
  case: number
}

type CaseCreateInput = Omit<CaseCreate, "id" | "contacts"> & {
  contacts: Omit<Contact, "id">[]
}
