import React from "react"
import { PaginationType } from "../../types"
import { Pagination } from "@amsterdam/design-system-react"
import styles from "./TablePagination.module.css"

const TablePagination: React.FC<PaginationType> = ({
  page = 1,
  pageSize = 10,
  collectionSize = 10,
  onPageChange
}) => {
  const totalPages = Math.ceil(collectionSize / pageSize)

  return (
    <Pagination
      className={styles.pagination}
      page={page}
      onPageChange={onPageChange}
      totalPages={totalPages}
    />
  )
}

export default TablePagination
