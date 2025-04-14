import React from "react"
import styled from "styled-components"
import { PaginationType } from "../../types"
import { Pagination } from "@amsterdam/design-system-react"

const StyledPagination = styled(Pagination)`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`

const TablePagination: React.FC<PaginationType> = ({
  page = 1,
  pageSize = 10,
  collectionSize = 10,
  onPageChange
}) => {
  const totalPages = Math.ceil(collectionSize / pageSize)
  return (
    <StyledPagination
      page={page}
      onPageChange={onPageChange}
      totalPages={totalPages}
    />
  )
}

export default TablePagination
