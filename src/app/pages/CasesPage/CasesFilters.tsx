import { useContext } from "react"
import { Button, Field, Row } from "@amsterdam/design-system-react"
import { FilterIcon } from "@amsterdam/design-system-react-icons"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  AdviceTypeFilter,
  ApplicationTypeFilter,
  ClosedCasesFilter,
  DateFilter,
  Search,
  PageSizeFilter,
  StatusFilter,
  DistrictFilter,
  NeighborhoodFilter
} from "app/components"

export const CasesFilters = () => {
  const {
    createdRangeAfter,
    createdRangeBefore,
    endDateRangeAfter,
    endDateRangeBefore,
    pagination,
    showAllFilters,
    updateContextCases
  } = useContext(ContextValues)["cases"]

  const onChangeFilter = (key: string, item: string | boolean) => {
    const casesContextItem = {
      [key]: item,
      pagination: {
        ...pagination,
        page: 1
      }
    }
    updateContextCases(casesContextItem)
  }

  const onChangePageSize = (pageSize: string) => {
    updateContextCases({
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
        onSearch={(value: string) => onChangeFilter("searchString", value)}
        placeholder="Zoek op ID, Excel ID of statutaire naam"
      />
      <PageSizeFilter contextName="cases" onChangePageSize={onChangePageSize} />
      <StatusFilter
        contextName="cases"
        onChangeFilter={(value: string) => onChangeFilter("status", value)}
      />
      <DistrictFilter
        contextName="cases"
        onChangeFilter={(value: string) => onChangeFilter("district", value)}
      />
      <NeighborhoodFilter
        contextName="cases"
        onChangeFilter={(value: string) =>
          onChangeFilter("neighborhood", value)
        }
      />
      {showAllFilters ? (
        <>
          <ApplicationTypeFilter
            onChangeFilter={(value: string) =>
              onChangeFilter("applicationType", value)
            }
          />
          <AdviceTypeFilter
            onChangeFilter={(value: string) =>
              onChangeFilter("adviceType", value)
            }
          />
          <DateFilter
            value={createdRangeAfter}
            label="Startdatum na"
            onChangeFilter={(value: string) =>
              onChangeFilter("createdRangeAfter", value)
            }
          />
          <DateFilter
            value={createdRangeBefore}
            label="Startdatum voor"
            onChangeFilter={(value: string) =>
              onChangeFilter("createdRangeBefore", value)
            }
          />
          <ClosedCasesFilter
            contextName="cases"
            onChangeFilter={(value: string) =>
              onChangeFilter("isClosedFilter", value)
            }
          />
          <DateFilter
            value={endDateRangeAfter}
            label="Einddatum na"
            onChangeFilter={(value: string) =>
              onChangeFilter("endDateRangeAfter", value)
            }
          />
          <DateFilter
            value={endDateRangeBefore}
            label="Einddatum voor"
            onChangeFilter={(value: string) =>
              onChangeFilter("endDateRangeBefore", value)
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
    </Row>
  )
}

export default CasesFilters
