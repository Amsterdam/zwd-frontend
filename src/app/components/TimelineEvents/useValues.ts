import { isValidDate, formatDate } from "app/utils/dates"
import { EVENT_TYPES, getEventValueName } from "./dictionaries"


type Value = {
  key: string
  value: string | number
}

export const useValues = (event: CaseEvent) => {
  const { event_values, event_variables } = event
  const values: Value[] = []
  
  // Map event_values
  Object.entries(event_values).forEach(([key, value]) => {
    // Don't return the description of a GENERIC_TASK because this field is used as event title.
    if (event.type === EVENT_TYPES["GENERIC_TASK"] && key === "description") {
      return
    }
    // Translate the key and the value to readable dutch.
    const label = getEventValueName(key)
    const keyValue = isValidDate(value) ? formatDate(value, true) : value
    values.push({ key: label, value: keyValue })
  })
  
  // Map event_variables if a form has been submitted. 
  // There must be data (event_variables) and it cannot be a generic boolean (completed)
  if (event_variables && !event_variables?.completed) {
    Object.entries(event_variables).forEach(([, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      values.push({ key: value?.label, value: value?.value })
    })  
  }
  
  return values
}
