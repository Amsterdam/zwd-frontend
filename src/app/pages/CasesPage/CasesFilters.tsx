import { useContext } from "react"
import { Row } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  Search,
  PageSizeFilter,
  StatusFilter,
  DistrictFilter,
  NeighborhoodFilter
} from "app/components"

export const CasesFilters = () => {
  const { pagination, updateContextCases } = useContext(ContextValues)["cases"]

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
    </Row>
  )
}

export default CasesFilters
