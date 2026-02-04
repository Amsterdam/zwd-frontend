import React, { useContext } from "react"
import { Button, Field } from "@amsterdam/design-system-react"
import { CloseIcon } from "@amsterdam/design-system-react-icons"
import { ContextValues } from "app/state/context/ValueProvider"
import { initialState } from "app/state/context/initialState"

type Props = {
  contextName: "cases" | "tasks" | "hoas"
}

const EXCLUDED_KEYS = [
  "columnsVisible",
  "count",
  "results",
  "pagination",
  "showAllFilters",
  "sorting",
  "updateContextCases",
  "updateContextTasks"
]

export const ResetFiltersButton: React.FC<Props> = ({ contextName }) => {
  const { updateContextCases, ...casesFilters } =
    useContext(ContextValues)["cases"]
  const { updateContextTasks, ...tasksFilters } =
    useContext(ContextValues)["tasks"]
  const { updateContextHoas, ...hoasFilters } =
    useContext(ContextValues)["hoas"]

  const resetFilters = () => {
    if (contextName === "cases") {
      const { columnsVisible } = casesFilters
      updateContextCases({ ...initialState.cases, columnsVisible })
    } else if (contextName === "tasks") {
      const { columnsVisible } = tasksFilters
      updateContextTasks({ ...initialState.tasks, columnsVisible })
    } else if (contextName === "hoas") {
      const { columnsVisible } = hoasFilters
      updateContextHoas({ ...initialState.hoas, columnsVisible })
    }
  }

  let filters
  let initialFilters

  if (contextName === "cases") {
    filters = casesFilters
    initialFilters = initialState.cases
  } else if (contextName === "tasks") {
    filters = tasksFilters
    initialFilters = initialState.tasks
  } else {
    filters = hoasFilters
    initialFilters = initialState.hoas
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (EXCLUDED_KEYS.includes(key)) return false
    const defaultValue = initialFilters[key as keyof typeof initialFilters]
    return JSON.stringify(value) !== JSON.stringify(defaultValue)
  })

  if (!hasActiveFilters) return null

  return (
    <Field style={{ justifyContent: "flex-end" }}>
      <Button onClick={resetFilters} icon={CloseIcon} iconBefore>
        Wis alle filters
      </Button>
    </Field>
  )
}
