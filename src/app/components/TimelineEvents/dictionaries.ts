// Event types
export const EVENT_TYPES: Record<CaseEvent["type"], string> = {
  "CASE": "Aanleiding",
  "GENERIC_TASK": "GENERIC_TASK"
}


export const getEventTitle = (event: CaseEvent): string => {
  const { type, event_values } = event
  if (type === EVENT_TYPES.GENERIC_TASK) {
    return event_values.description
  }
  if (EVENT_TYPES[type]) {
    return EVENT_TYPES[type]
  }
  return type
}

export const EVENT_VALUES: Record<string, string> = {
  "date_added": "Datum",
  "author": "Uitvoerder",
  "description": "Toelichting"
}

export const getEventValueName = (value: string): string => (
  EVENT_VALUES[value] ?? value
)
