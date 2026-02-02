import { useContext } from "react"
import {Field, Row } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import {
  DistrictFilter,
  PageSizeFilter,
  Search,
  BooleanStatusFilter,
  CountSelectFilter,
  NeighborhoodFilter,
  DownloadHoaExcel,
  DownloadExcel
} from "app/components"

const HOA = "hoa"

export const HoaFilters = () => {
  const {
    pagination,
    isSmallHoa,
    participantCount,
    letterCount,
    updateContextHoa
  } = useContext(ContextValues)[HOA]

  const onChangeFilter = (key: string, item: string | boolean | string[] | number) => {
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
      <DistrictFilter
        contextName={HOA}
        onChangeFilter={(value: string[]) => onChangeFilter("district", value)}
      />
      <NeighborhoodFilter
        contextName={HOA}
        onChangeFilter={(value: string[]) =>
          onChangeFilter("neighborhood", value)
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
      <CountSelectFilter
        onChangeFilter={(value: number) => onChangeFilter("participantCount", value)}
        label="Cursisten" value={participantCount} 
        />
      <CountSelectFilter
        onChangeFilter={(value: number) => onChangeFilter("letterCount", value)}
        label="Brieven" value={letterCount} 
        />
      <Field style={{ justifyContent: "flex-end" }}>
          <DownloadHoaExcel />
      </Field>
    </Row>
  )
}

export default HoaFilters
