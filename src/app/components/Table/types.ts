export type PaginationType = {
  page?: number
  pageSize?: number
  collectionSize?: number
  paginationLength?: number
  onPageChange?: (page: number) => void
}

export const ASCEND = "ASCEND"
export const DESCEND = "DESCEND"

export type SortOrder = typeof ASCEND | typeof DESCEND

export type SortingType = {
  index: number
  order: SortOrder
}

// export type Value = string | number | boolean | null | undefined | { [key: string]: Value } | object

// export type Sorter = (a: Value, b: Value) => number
export type Sorter<T> = (a: T, b: T) => number

export type ColumnType<T> = {
  header?: React.ReactNode
  dataIndex?: string
  sorter?: Sorter<T>
  sortOrder?: SortOrder
  defaultSortOrder?: SortOrder
  minWidth?: number
  render?: (text: string, record: T) => React.ReactNode
}

export type OnChangeSortingType<T> = {
  dataIndex: ColumnType<T>["dataIndex"]
  order?: SortOrder
}

export type TableType<T> = {
  numLoadingRows?: number
  loading?: boolean
  lastColumnFixed?: boolean
  columns: ColumnType<T>[]
  data?: T[]
  emptyPlaceholder?: React.ReactNode
  showHeadWhenEmpty?: boolean
  onClickRow?: (record: T, index: number, event: React.MouseEvent) => void
  pagination?: false | PaginationType
  onChange?: (pagination: PaginationType, sorting: OnChangeSortingType<T>) => void
}
