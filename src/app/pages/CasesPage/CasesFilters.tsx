import { useContext } from "react"
import { Button, Field, Row } from "@amsterdam/design-system-react"
import { FilterIcon } from "@amsterdam/design-system-react-icons"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  AdviceTypeFilter,
  ApplicationTypeFilter,
  DateFilter,
  DownloadExcel,
  Search,
  PageSizeFilter,
  StatusFilter,
  DistrictFilter,
  NeighborhoodFilter,
  BooleanStatusFilter,
  AdvisorFilter,
  ResetFiltersButton
} from "app/components"

const CASES = "cases"

export const CasesFilters = () => {
  const {
    createdRangeAfter,
    createdRangeBefore,
    endDateRangeAfter,
    endDateRangeBefore,
    isClosedFilter,
    isSmallHoa,
    pagination,
    showAllFilters,
    updateContextCases
  } = useContext(ContextValues)[CASES]

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
        contextName={CASES}
        onSearch={(value: string) => onChangeFilter("searchString", value)}
        placeholder="Zoek op ID, Excel ID of statutaire naam"
      />
      <PageSizeFilter contextName={CASES} onChangePageSize={onChangePageSize} />
      <StatusFilter
        contextName={CASES}
        onChangeFilter={(value: string) => onChangeFilter("status", value)}
      />
      <DistrictFilter
        contextName={CASES}
        onChangeFilter={(value: string) => onChangeFilter("district", value)}
      />
      <NeighborhoodFilter
        contextName={CASES}
        onChangeFilter={(value: string) =>
          onChangeFilter("neighborhood", value)
        }
      />
      {showAllFilters ? (
        <>
          <ApplicationTypeFilter
            contextName={CASES}
            onChangeFilter={(value: string) =>
              onChangeFilter("applicationType", value)
            }
          />
          <AdviceTypeFilter
            contextName={CASES}
            onChangeFilter={(value: string) =>
              onChangeFilter("adviceType", value)
            }
          />
          <AdvisorFilter
            contextName={CASES}
            onChangeFilter={(value: string) => onChangeFilter("advisor", value)}
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
          <BooleanStatusFilter
            label="Toon zaken"
            allLabel="Alle zaken"
            trueLabel="Gesloten zaken"
            falseLabel="Open zaken"
            onChangeFilter={(value: string) =>
              onChangeFilter("isClosedFilter", value)
            }
            value={isClosedFilter}
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

      <ResetFiltersButton contextName={CASES} />
      <Field style={{ justifyContent: "flex-end" }}>
        <DownloadExcel />
      </Field>
    </Row>
  )
}

export default CasesFilters
