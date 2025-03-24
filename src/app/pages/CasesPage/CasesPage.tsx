import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCases } from "app/state/rest"
import { Table, PageHeading, PageGrid } from "app/components"
import { ContextValues } from "app/state/context/ValueProvider"
import columns from "./columns"

export const CasesPage: React.FC = () => {
  const {
    count, pagination, results, updateContextCases
  } = useContext(ContextValues)["cases"]
  const navigate = useNavigate()
  const [dataSource, { isBusy }] = useCases(pagination)

  useEffect(() => {
    if (dataSource?.results) {
      updateContextCases({ results: dataSource?.results, count: dataSource.count })
    } else {
      updateContextCases({
        results: [],
        count: 0
      })
    }
  }, [dataSource, updateContextCases])

  // const onChangePageSize = (pageSize: string) => {
  //   updateContextCases({
  //     pagination: {
  //       ...pagination,
  //       pageSize: parseInt(pageSize),
  //       page: 1
  //     }
  //   })
  // }

  const onChangeTable = (pagination: Pagination) => {
    updateContextCases({ pagination })
  }

  return (
    <PageGrid>
      <PageHeading label={`Zakenoverzicht (${ count })`} />
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
