import { isValidDate, formatDate } from "app/utils/dates"
import { EVENT_TYPES, getEventValueName } from "./dictionaries"

type Value = {
  label: string
  value: string | number
}

// Helper function to process date values
const getFormattedValue = (
  value: unknown,
  includeTime = false
): string | number =>
  isValidDate(String(value))
    ? formatDate(String(value), includeTime)
    : String(value)

export const useValues = (event: CaseEvent) => {
  const { event_values = {}, event_variables } = event
  const values: Value[] = []

  // Always start with Datum
  if (event_values.date_added) {
    values.push({
      label: getEventValueName("date_added"),
      value: getFormattedValue(event_values.date_added, true)
    })
  }

  // Uitvoerder (author) is always second
  if (event_values.author) {
    values.push({
      label: getEventValueName("author"),
      value: event_values.author
    })
  }

  // Map event_values
  Object.entries(event_values).forEach(([key, value]) => {
    // Don't return the description of a GENERIC_TASK because this field is used as event title.
    if (event.type === EVENT_TYPES["GENERIC_TASK"] && key === "description") {
      return
    }
    // Don't return date_added and author because they are already added.
    if (key === "date_added" || key === "author") {
      return
    }
    // Translate the key and the value to readable dutch.
    const label = getEventValueName(key)
    const keyValue = getFormattedValue(value)
    values.push({ label, value: keyValue })
  })

  // Map event_variables if applicable
  if (event_variables && !event_variables?.completed) {
    Object.entries(event_variables).forEach(([, event]) => {
      values.push({
        label: String(event?.label ?? ""),
        value: getFormattedValue(event.value)
      })
    })
  }

  return values
}
