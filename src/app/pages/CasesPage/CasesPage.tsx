import { useContext, useEffect, useMemo } from "react"
import { useCases } from "app/state/rest"
import { Table, PageHeading, PageGrid, ActiveFilters } from "app/components"
import { ContextValues } from "app/state/context/ValueProvider"
import { useNavigateWithModifier } from "app/hooks"
import getColumns from "./columns"
import CasesFilters from "./CasesFilters"

export const CasesPage: React.FC = () => {
  const {
    adviceType,
    applicationType,
    columnsVisible,
    count,
    requestDateRangeAfter,
    requestDateRangeBefore,
    district,
    endDateRangeAfter,
    endDateRangeBefore,
    isClosedFilter,
    isSmallHoa,
    neighborhood,
    advisor,
    results,
    pagination,
    searchString,
    sorting,
    status,
    wijk,
    updateContextCases
  } = useContext(ContextValues)["cases"]
  const navigateWithModifier = useNavigateWithModifier()
  const [dataSource, { isBusy }] = useCases(
    pagination,
    adviceType,
    applicationType,
    requestDateRangeAfter,
    requestDateRangeBefore,
    district,
    endDateRangeAfter,
    endDateRangeBefore,
    isClosedFilter,
    isSmallHoa,
    neighborhood,
    advisor,
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
  const columnsFiltered = useMemo(
    () =>
      columns.filter((column) => {
        const alwaysVisible = ["prefixed_dossier_id", "id"]
        if (alwaysVisible.includes(column?.dataIndex ?? "")) {
          return true
        }
        return columnsVisible.includes(column.dataIndex ?? "")
      }),
    [columns, columnsVisible]
  )

  return (
    <PageGrid>
      <PageHeading label={`Zakenoverzicht (${count})`} />
      <CasesFilters />
      <ActiveFilters contextName="cases" />
      <Table
        columns={columnsFiltered}
        data={results}
        loading={isBusy}
        onClickRow={(obj, _index, e) =>
          navigateWithModifier(e, `/zaken/${obj.id}`)
        }
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
