import { useContext } from "react"
import { Row } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import Search from "./Search/Search"
import PageSizeFilter from "./PageSizeFilter/PageSizeFilter"
import StatusFilter from "./StatusFilter/StatusFilter"
import DistrictFilter from "./DistrictFilter/DistrictFilter"
import WijkenFilter from "./WijkenFilter/WijkenFilter"
import NeighborhoodFilter from "./NeighborhoodFilter/NeighborhoodFilter"

export const Filters = () => {
  const { pagination, updateContextCases } = useContext(ContextValues)["cases"]

  const onChangeFilter = (key: string, item: string) => {
    console.log("onChangeFilter", key, item)
    const casesContextItem = {
      [key]: item,
      pagination: {
        ...pagination,
        page: 1
      }
    }
    updateContextCases(casesContextItem)
  }

  return (
    <Row wrap>
      <Search
        onSearch={(value: string) => onChangeFilter("searchString", value)}
      />
      <PageSizeFilter />
      <StatusFilter
        onChangeFilter={(value: string) => onChangeFilter("status", value)}
      />
      <DistrictFilter
        onChangeFilter={(value: string) => onChangeFilter("district", value)}
      />
      <WijkenFilter
        onChangeFilter={(value: string) => onChangeFilter("wijk", value)}
      />
      <NeighborhoodFilter
        onChangeFilter={(value: string) =>
          onChangeFilter("neighborhood", value)
        }
      />
    </Row>
  )
}

export default Filters
