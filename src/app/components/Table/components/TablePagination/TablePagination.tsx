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

  const CustomLinkComponent: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
    const href = props.href || ""
    const match = href.match(/page=(\d+)/)
    const targetPage = match ? Number(match[1]) : undefined

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      if (typeof targetPage === "number") {
        onPageChange?.(targetPage)
      }
    }

    return (
      <a {...props} onClick={handleClick} />
    )
  }

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      linkTemplate={(page) => `zaken?page=${page}`} // required :(
      linkComponent={CustomLinkComponent}
      className={styles.pagination}
    />
  )
}

export default TablePagination
