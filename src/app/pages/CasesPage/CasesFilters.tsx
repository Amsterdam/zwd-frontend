import { useContext } from "react"
import { Row } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import {
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
    status,
    updateContextCases
  } = useContext(ContextValues)["cases"]

  const onChangeFilter = (key: string, item: string) => {
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
      {status === "Afgesloten" && (
        <>
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
      )}
    </Row>
  )
}

export default CasesFilters
