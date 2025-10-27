import { useContext } from "react"
import { Button, Field, Row } from "@amsterdam/design-system-react"
import { FilterIcon } from "@amsterdam/design-system-react-icons"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  Search,
  PageSizeFilter,
  StatusFilter,
  TaskNameFilter,
  DistrictFilter,
  NeighborhoodFilter,
  ResetFiltersButton,
  ApplicationTypeFilter,
  AdviceTypeFilter,
  AdvisorFilter,
  BooleanStatusFilter,
  DateFilter,
  ColumnSettings,
} from "app/components"

const TASKS = "tasks"

export const TasksFilters = () => {
  const {
    requestDateRangeAfter,
    requestDateRangeBefore,
    isSmallHoa,
    pagination,
    showAllFilters,
    updateContextTasks
  } = useContext(ContextValues)[TASKS]

  const onChangeFilter = (key: string, item: string | boolean | string[]) => {
    const tasksContextItem = {
      [key]: item,
      pagination: {
        ...pagination,
        page: 1
      }
    }
    updateContextTasks(tasksContextItem)
  }

  const onChangePageSize = (pageSize: string) => {
    updateContextTasks({
      pagination: {
        ...pagination,
        pageSize: parseInt(pageSize),
        page: 1
      }
    })
  }

  return (
    <Row wrap>
      <Search
        contextName={TASKS}
        onSearch={(value: string) => onChangeFilter("searchString", value)}
        placeholder="Zoek op zaak ID of statutaire naam"
      />
      <PageSizeFilter contextName={TASKS} onChangePageSize={onChangePageSize} />
      <TaskNameFilter
        onChangeFilter={(value: string) => onChangeFilter("taskName", value)}
      />
      <StatusFilter
        contextName={TASKS}
        onChangeFilter={(value: string[]) => onChangeFilter("status", value)}
      />
      <DistrictFilter
        contextName={TASKS}
        onChangeFilter={(value: string[]) => onChangeFilter("district", value)}
      />
      {showAllFilters ? (
        <>
          <NeighborhoodFilter
            contextName={TASKS}
            onChangeFilter={(value: string[]) =>
              onChangeFilter("neighborhood", value)
            }
          />
          <ApplicationTypeFilter
            contextName={TASKS}
            onChangeFilter={(value: string) =>
              onChangeFilter("applicationType", value)
            }
          />
          <AdviceTypeFilter
            contextName={TASKS}
            onChangeFilter={(value: string) =>
              onChangeFilter("adviceType", value)
            }
          />
          <AdvisorFilter
            contextName={TASKS}
            onChangeFilter={(value: string[]) =>
              onChangeFilter("advisor", value)
            }
          />
          <BooleanStatusFilter
            label="Vve grootte"
            allLabel="Alle vve's"
            trueLabel="Kleine vve's"
            falseLabel="Grote vve's"
            onChangeFilter={(value: string) =>
              onChangeFilter("isSmallHoa", value)
            }
            value={isSmallHoa}
          />
          <DateFilter
            value={requestDateRangeAfter}
            label="Aanvraagdatum na"
            onChangeFilter={(value: string) =>
              onChangeFilter("requestDateRangeAfter", value)
            }
          />
          <DateFilter
            value={requestDateRangeBefore}
            label="Aanvraagdatum voor"
            onChangeFilter={(value: string) =>
              onChangeFilter("requestDateRangeBefore", value)
            }
          />
        </>
      ) : (
        <Field style={{ justifyContent: "flex-end" }}>
          <Button
            id="filter-button"
            icon={FilterIcon}
            iconBefore
            onClick={() => onChangeFilter("showAllFilters", true)}
          >
            Alle filters
          </Button>
        </Field>
      )}

      <ResetFiltersButton contextName={TASKS} />

      <Field style={{ justifyContent: "flex-end" }}>
        <ColumnSettings contextName={TASKS} />
      </Field>

    </Row>
  )
}

export default TasksFilters
