import { useContext, useEffect, useMemo } from "react"
import { Table, PageHeading, PageGrid, ActiveFilters } from "app/components"
import { ContextValues } from "app/state/context/ValueProvider"
import { useNavigateWithModifier } from "app/hooks"
import getColumns from "./columns"
import { useHomeownerAssociations } from "app/state/rest"
import HoaFilters from "./HoaFilter"

export const HoaPage: React.FC = () => {
  const {
    count,
    results,
    pagination,
    sorting,
    searchString,
    district,
    isSmallHoa,
    participantCount,
    letterCount,
    neighborhood,
    updateContextHoa
  } = useContext(ContextValues)["hoa"]
  const navigateWithModifier = useNavigateWithModifier()
  const [dataSource, { isBusy }] = useHomeownerAssociations(
    pagination,
    sorting,
    searchString,
    district,
    isSmallHoa,
    participantCount,
    letterCount,
    neighborhood,
  )

  useEffect(() => {
    if (dataSource?.results) {
      updateContextHoa({
        results: dataSource?.results,
        count: dataSource.count
      })
    } else {
      updateContextHoa({
        results: [],
        count: 0
      })
    }
  }, [dataSource, updateContextHoa])

  const onChangeTable = (
    pagination: TABLE.Pagination,
    sorting: TABLE.Sorting,
  ) => {
    updateContextHoa({ pagination, sorting })
  }

  const columns = useMemo(() => getColumns(sorting), [sorting])

  return (
    <PageGrid>
      <PageHeading label={`VvE-overzicht (${count})`} />
      <HoaFilters />
      <ActiveFilters contextName="hoa" />
      <Table
        columns={columns}
        data={results}
        loading={isBusy}
        onClickRow={(obj, _index, e) => navigateWithModifier(e, `/vve/${obj.id}`)}
        onChange={onChangeTable}
        pagination={{
          page: pagination.page,
          pageSize: pagination.pageSize,
          collectionSize: count || 1
        }}
      />
    </PageGrid>
  )
}

export default HoaPage
