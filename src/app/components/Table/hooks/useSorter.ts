import { useState } from "react"
import { ColumnType, SortingType, Sorter, ASCEND, DESCEND, OnChangeSortingType } from "../types"

const useSorter = <T>(
  columns: ColumnType<T>[],
  onSortingTrigger: (sorting: SortingType) => void
): [
  SortingType | undefined,
  Sorter<T> | undefined,
  (sortingObj: SortingType) => void,
  () => OnChangeSortingType<T>
] => {

  const defaultSortingIndex = columns.findIndex(({ defaultSortOrder }) => defaultSortOrder === ASCEND || defaultSortOrder === DESCEND)
  const defaultSorting = defaultSortingIndex > -1 ? { index: defaultSortingIndex, order: columns[defaultSortingIndex].defaultSortOrder! } : undefined

  const [sorting, setSorting] = useState<SortingType | undefined>(defaultSorting)

  const sortOrderIndex = columns.findIndex(({ sortOrder }) => sortOrder === ASCEND || sortOrder === DESCEND)
  const sortOrderObj = sortOrderIndex > -1 ? { index: sortOrderIndex, order: columns[sortOrderIndex].sortOrder! } : undefined

  const mergedSorting = sortOrderObj ?? sorting

  const sorter = mergedSorting ? columns[mergedSorting.index]?.sorter : undefined

  const onChangeSorting = (sortingObj: SortingType) => {
    setSorting(sortingObj)
    onSortingTrigger(sortingObj)
  }

  const getSortingObj = (): OnChangeSortingType<T> => ({
    dataIndex: mergedSorting?.index !== undefined ? columns?.[mergedSorting?.index].dataIndex : undefined,
    order: mergedSorting?.order
  })

  return [
    mergedSorting,
    sorter,
    onChangeSorting,
    getSortingObj
  ]
}

export default useSorter
