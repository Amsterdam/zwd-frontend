import { useContext } from "react"
import {Row } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  PageSizeFilter,
  Search
} from "app/components"

const HOA = "hoa"

export const HoaFilters = () => {
  const {
    pagination,
    updateContextHoa
  } = useContext(ContextValues)[HOA]

  const onChangeFilter = (key: string, item: string | boolean | string[]) => {
    const hoaContextItem = {
      [key]: item,
      pagination: {
        ...pagination,
        page: 1
      }
    }
    updateContextHoa(hoaContextItem)
  }

  const onChangePageSize = (pageSize: string) => {
    updateContextHoa({
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
        contextName={HOA}
        onSearch={(value: string) => onChangeFilter("searchString", value)}
        placeholder="Zoek op ID, Excel ID of statutaire naam"
      />
      <PageSizeFilter contextName={HOA} onChangePageSize={onChangePageSize} />
    </Row>
  )
}

export default HoaFilters
