import React, { useMemo } from "react"
import styled, { css } from "styled-components"
import _get from "lodash.get"
import { SmallSkeleton } from "app/components"
import TableCell from "./components/TableCell/TableCell"
import TableHeader from "./components/TableHeader/TableHeader"
import TablePagination from "./components/TablePagination/TablePagination"
import devWarning from "app/utils/devWarning"
import usePagination, { DEFAULT_PAGE_SIZE } from "./hooks/usePagination"
import useSorter from "./hooks/useSorter"
import { TableType, SortingType, DESCEND } from "./types"

const Wrap = styled.div`
  position: relative;
  font-size: var(--ams-text-level-6-font-size);
`

const StyledTable = styled.table`
  border-spacing: 0px;
  width: 100%;
`

const Row = styled.tr<{ $isClickable?: boolean }>`
  ${ ({ $isClickable }) => $isClickable && css`
    cursor: pointer;
    &:hover td {
      background-color: #F5F5F5;
    }
  ` }
  td {
    border-bottom: 1px solid #E6E6E6;
  }
`

const NoValuesPlaceholder = styled(TableCell)`
  font-style: italic;
`

// Create dummydata for loading skeleton based on the columns.length and numLoadingRows property.
const createLoadingData = (numColumns: number, numRows: number): string[][] => (
  Array.from({ length: numRows }, () => Array.from({ length: numColumns }, () => ""))
)

export const Table = <R extends object = object>(props: TableType<R>) => {
  const {
    columns,
    loading = false,
    numLoadingRows = 5,
    showHeadWhenEmpty = true,
    emptyPlaceholder = "",
    onClickRow,
    data = [],
    pagination,
    onChange
  } = props

  const isEmpty = (data?.length ?? 0) === 0

  // ============================ Sorter =============================
  const onSortingTrigger = (sortingObj: SortingType) => {
    onChange?.(
      getPaginationData(),
      {
        dataIndex: sortingObj?.index !== undefined ? columns?.[sortingObj?.index].dataIndex : undefined,
        order: sortingObj?.order
      }
    )
  }

  const [mergedSorting, sorter, onChangeSorting, getSortingObj] = useSorter(
    columns,
    onSortingTrigger
  )

  const sortedDataAscend = useMemo<R[]>(() => {
    if (sorter !== undefined && typeof sorter === "function") {
      return [...data].sort(sorter)
    }
    return data
  }, [data, sorter])

  const sortedData = useMemo<R[]>(() => {
    if (sortedDataAscend !== undefined && mergedSorting?.order === DESCEND) {
      return [...sortedDataAscend].reverse()
    }
    return sortedDataAscend
  },[sortedDataAscend, mergedSorting?.order])

  // ========================== Pagination ==========================
  const onPaginationTrigger = (page: number) => {
    onChange?.({ page, pageSize: mergedPagination.pageSize, collectionSize: mergedPagination.collectionSize  }, getSortingObj())
  }

  // Set warning if pagination prop page is given but not higher than 0.
  devWarning(
    pagination !== false && pagination?.page !== undefined  && typeof pagination.page == "number" && !(pagination.page > 0),
    "Table",
    "`page` of `pagination` must be greater than 0."
  )

  const [mergedPagination] = usePagination(
    sortedData.length,
    pagination,
    onPaginationTrigger
  )

  const getPaginationData = () => ({
    page: mergedPagination.page,
    pageSize: mergedPagination.pageSize,
    collectionSize: mergedPagination.collectionSize
  })

  // Get paged data...
  const pageData = useMemo<R[]>(() => {
    if (pagination === false || !mergedPagination.pageSize) {
      return sortedData
    }

    const { page = 1, collectionSize, pageSize = DEFAULT_PAGE_SIZE } = mergedPagination

    // Dynamic table data
    if (sortedData.length < collectionSize!) {
      if (sortedData.length > pageSize) {
        devWarning(
          true,
          "Table",
          "`data` length is less than `pagination.collectionSize` but larger than `pagination.pageSize`. Please make sure your config is correct."
        )
        return sortedData.slice((page - 1) * pageSize, page * pageSize)
      }
      return sortedData
    }

    return sortedData.slice((page - 1) * pageSize, page * pageSize)
  }, [
    pagination,
    sortedData,
    mergedPagination
  ])

  // ============================ Render ============================
  return (
    <Wrap data-testid="table">
      <StyledTable>
        {(showHeadWhenEmpty || !isEmpty) && (
          <TableHeader
            columns={ columns }
            onChangeSorting={ onChangeSorting }
            sorting={ mergedSorting }
          />
        )}
        <tbody>
          {!loading && pageData?.map((rowData, index) => (
            <Row
              key={ index }
              onClick={ (event: React.MouseEvent) => onClickRow?.(rowData, index, event) }
              $isClickable={ onClickRow !== undefined }
            >
              {columns.map((column, index) => {
                const text: string = column.dataIndex ? _get(rowData, column.dataIndex) as string : ""
                const node = column.render ? column.render(text, rowData) : text
                return (
                  <TableCell key={ index } data-testid="table-cell">
                    {loading
                      ? <SmallSkeleton maxRandomWidth={ column.minWidth ?? 30 } />
                      : node
                    }
                  </TableCell>
                )
              })}
            </Row>
          ))}
          {loading && createLoadingData(columns.length, numLoadingRows).map((row, index) => (
            <Row key={ index }>
              {row.map((_, index) => (
                <TableCell data-testid="table-cell" key={ index }>
                  <SmallSkeleton maxRandomWidth={ columns[index].minWidth ?? 30 } />
                </TableCell>
              ))}
            </Row>
          ))}
          {!loading && isEmpty && (
            <tr>
              <NoValuesPlaceholder colSpan={ columns.length }>
                { emptyPlaceholder }
              </NoValuesPlaceholder>
            </tr>
          )}
        </tbody>
      </StyledTable>
      {pagination !== false && !isEmpty && <TablePagination { ...mergedPagination } />}
    </Wrap>
  )
}

export default Table
