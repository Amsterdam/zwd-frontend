import { useContext, useMemo } from "react"
import { Row } from "@amsterdam/design-system-react"
import { CloseIcon } from "@amsterdam/design-system-react-icons"
import { ContextValues } from "app/state/context/ValueProvider"
import { useAdvisorsList } from "app/state/rest"
import { FILTER_CONFIGS } from "./filterConfigs"
import { FilterValue, FilterChip } from "./types"
import styles from "./ActiveFilters.module.css"

type Props = {
  contextName: "cases" | "tasks"
}

const getFilterValueFromContext = (
  context: Record<string, unknown>,
  key: string
): FilterValue => context[key] as FilterValue

export const ActiveFilters: React.FC<Props> = ({ contextName }) => {
  const fullContext = useContext(ContextValues)
  const context = fullContext[contextName]
  const updateContext = contextName === "cases"
    ? fullContext.cases.updateContextCases
    : fullContext.tasks.updateContextTasks

  const [advisors] = useAdvisorsList()

  const removeFilter = (key: string, valueToRemove?: string) => {
    const config = FILTER_CONFIGS[key]
    const update: Record<string, string | string[]> = {}

    switch (config?.type) {
      case "array": {
        const currentValue = getFilterValueFromContext(context, key)
        update[key] = Array.isArray(currentValue)
          ? currentValue.filter(v => v !== valueToRemove)
          : []
        break
      }
      default:
        update[key] = ""
        break
    }

    updateContext(update)
  }

  const activeFilterChips = useMemo(() => {
    const chips: FilterChip[] = []

    Object.entries(FILTER_CONFIGS).forEach(([key, config]) => {
      if (!config.contexts.includes(contextName)) {
        return
      }

      const value = getFilterValueFromContext(context, key)

      if (!value || value === "") {
        return
      }

      // Handle array filters
      if (config.type === "array") {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach(v => {
            chips.push({
              key,
              label: config.getLabel(v, advisors),
              value: v,
            })
          })
        }
      // Handle single-value filters
      } else {
        chips.push({
          key,
          label: config.getLabel(value as string, advisors),
          value: value as string,
        })
      }
    })

    return chips
  }, [context, advisors, contextName])

  if (activeFilterChips.length === 0) {
    return null
  }

  return (
    <Row className={styles.activeFilters} wrap gap="small">
      {activeFilterChips.map((filter, index) => (
        <button
          key={`${filter.key}-${filter.value}-${index}`}
          className={styles.filterChip}
          onClick={() => removeFilter(filter.key, filter.value)}
          type="button"
          aria-label={`Verwijder filter: ${filter.label}`}
        >
          <span>{filter.label}</span>
          <CloseIcon className={styles.closeIcon} />
        </button>
      ))}
    </Row>
  )
}

export default ActiveFilters

