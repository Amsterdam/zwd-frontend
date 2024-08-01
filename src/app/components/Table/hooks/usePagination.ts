import { useState } from "react"
import { PaginationType } from "../types"

export const DEFAULT_PAGE_SIZE = 10

const extendsObject = <T extends object>(...list: T[]): T => {
  const result = {} as T

  list.forEach(obj => {
    if (obj) {
      Object.entries(obj).forEach(([key, val]) => {
        if (val !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          (result as any)[key] = val
        }
      })
    }
  })

  return result
}

const usePagination = (
  collectionSize: number,
  pagination: PaginationType | false | undefined,
  onPageChange: (page: number) => void
): [PaginationType] => {

  const { collectionSize: paginationTotal = 0, ...paginationObj }
    = pagination && typeof pagination === "object" ? pagination : {}

  const [innerPagination, setInnerPagination] = useState<{
    page?: number
    pageSize?: number
  }>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE
  })

  // extendsObject is merging the inner table props with the external input.
  const mergedPagination = extendsObject<Partial<PaginationType>>(
    innerPagination,
    paginationObj,
    {
      collectionSize: paginationTotal > 0 ? paginationTotal : collectionSize
    }
  )

  const refreshPagination = (page?: number) => {
    setInnerPagination({
      page: page ?? 1,
      pageSize: mergedPagination.pageSize
    })
  }

  const onInternalChange: PaginationType["onPageChange"] = (page: number) => {
    if (pagination) {
      pagination.onPageChange?.(page)
    }
    refreshPagination(page)
    onPageChange(page)
  }

  if (pagination === false) {
    return [{}]
  }

  return [
    {
      ...mergedPagination,
      onPageChange: onInternalChange
    }
  ]
}

export default usePagination
