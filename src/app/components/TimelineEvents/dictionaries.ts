// Event types
export const EVENT_TYPES: Record<CaseEvent["type"], string> = {
  CASE: "Aanleiding",
  GENERIC_TASK: "GENERIC_TASK"
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
  application_type: "Aanvraag",
  advice_type: "Advies",
  author: "Uitvoerder",
  date_added: "Datum",
  description: "Toelichting",
  activation_team_meeting_date: "Datum bijeenkomst",
  activation_team_subject: "Onderwerp",
  activation_team_type: "Soort bijeenkomst"
}

export const getEventValueName = (value: string): string =>
  EVENT_VALUES[value] ?? value
