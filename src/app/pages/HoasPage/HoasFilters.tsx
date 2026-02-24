import { useContext } from "react"
import { Field, Row } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  DistrictFilter,
  PageSizeFilter,
  Search,
  BooleanStatusFilter,
  CountSelectFilter,
  NeighborhoodFilter,
  DownloadHoaExcel,
  ResetFiltersButton
} from "app/components"

const HOAS = "hoas"

export const HoasFilters = () => {
  const {
    pagination,
    isSmallHoa,
    participantCount,
    letterCount,
    updateContextHoas
  } = useContext(ContextValues)[HOAS]
  const onChangeFilter = (
    key: string,
    item: string | boolean | string[] | number
  ) => {
    const hoaContextItem = {
      [key]: item,
      pagination: {
        ...pagination,
        page: 1
      }
    }
    updateContextHoas(hoaContextItem)
  }

  const onChangePageSize = (pageSize: string) => {
    updateContextHoas({
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
        contextName={HOAS}
        onSearch={(value: string) => onChangeFilter("searchString", value)}
        placeholder="Zoek op ID, Excel ID of statutaire naam"
      />
      <PageSizeFilter contextName={HOAS} onChangePageSize={onChangePageSize} />
      <DistrictFilter
        contextName={HOAS}
        onChangeFilter={(value: string[]) => onChangeFilter("district", value)}
      />
      <NeighborhoodFilter
        contextName={HOAS}
        onChangeFilter={(value: string[]) =>
          onChangeFilter("neighborhood", value)
        }
      />
      <BooleanStatusFilter
        label="VvE grootte"
        allLabel="Alle VvE's"
        trueLabel="Kleine VvE's"
        falseLabel="Grote VvE's"
        onChangeFilter={(value: string) => onChangeFilter("isSmallHoa", value)}
        value={isSmallHoa}
      />
      <CountSelectFilter
        onChangeFilter={(value: number) =>
          onChangeFilter("participantCount", value)
        }
        label="Cursisten"
        value={participantCount}
      />
      <CountSelectFilter
        onChangeFilter={(value: number) => onChangeFilter("letterCount", value)}
        label="Brieven"
        value={letterCount}
      />
      <Field className="align-bottom">
        <DownloadHoaExcel />
      </Field>
      <ResetFiltersButton contextName={HOAS} />
    </Row>
  )
}

export default HoasFilters
