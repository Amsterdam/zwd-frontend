namespace TABLE {
  export type Pagination = {
    page?: number
    pageSize?: number
    collectionSize?: number
  }

  const ASCEND = "ASCEND"
  const DESCEND = "DESCEND"

  export type SortOrder = typeof ASCEND | typeof DESCEND

  export type Sorting = {
    dataIndex?: string
    order?: SortOrder
  }
}
