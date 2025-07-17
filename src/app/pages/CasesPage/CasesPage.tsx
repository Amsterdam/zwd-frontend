import { useContext, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useCases } from "app/state/rest"
import { Table, PageHeading, PageGrid } from "app/components"
import { ContextValues } from "app/state/context/ValueProvider"
import getColumns from "./columns"
import CasesFilters from "./CasesFilters"

export const CasesPage: React.FC = () => {
  const {
    count,
    createdRangeAfter,
    createdRangeBefore,
    district,
    endDateRangeAfter,
    endDateRangeBefore,
    neighborhood,
    results,
    pagination,
    searchString,
    sorting,
    status,
    wijk,
    updateContextCases
  } = useContext(ContextValues)["cases"]
  const navigate = useNavigate()
  const [dataSource, { isBusy }] = useCases(
    pagination,
    createdRangeAfter,
    createdRangeBefore,
    district,
    endDateRangeAfter,
    endDateRangeBefore,
    neighborhood,
    searchString,
    sorting,
    status,
    wijk
  )

  useEffect(() => {
    if (dataSource?.results) {
      updateContextCases({
        results: dataSource?.results,
        count: dataSource.count
      })
    } else {
      updateContextCases({
        results: [],
        count: 0
      })
    }
  }, [dataSource, updateContextCases])

  const onChangeTable = (
    pagination: TABLE.Pagination,
    sorting: TABLE.Sorting
  ) => {
    updateContextCases({ pagination, sorting })
  }

  const columns = useMemo(() => getColumns(sorting), [sorting])

  return (
    <PageGrid>
      <PageHeading label={`Zakenoverzicht (${count})`} />
      <CasesFilters />
      <Table
        columns={columns}
        data={results}
        loading={isBusy}
        onClickRow={(obj) => void navigate(`/zaken/${obj.id}`)}
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

export default CasesPage
