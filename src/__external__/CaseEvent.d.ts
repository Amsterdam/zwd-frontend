type EventType = "CASE" | "GENERIC_TASK"

type CaseEvent = {
  id: number
  event_values: Record<string, string>
  event_variables: Record<string, string>
  date_created: string // date-time
  type: EventType
  emitter_id: number
  case: number
}