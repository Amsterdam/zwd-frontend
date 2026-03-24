export function sortEvents(events: CaseEvent[]) {
  return [...events].sort((a, b) => {
    const aIsNote = a.event_values?.description === "Notitie toevoegen"
    const bIsNote = b.event_values?.description === "Notitie toevoegen"

    if (aIsNote && !bIsNote) return -1
    if (!aIsNote && bIsNote) return 1

    return b.id - a.id
  })
}
