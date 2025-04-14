import styled, { css } from "styled-components"

const TableCell = styled.td<{ $borderLeft?: boolean }>`
  padding: 16px 12px;
  vertical-align: middle;
  ${({ $borderLeft }) =>
    $borderLeft &&
    css`
      border-left: 1px solid #b4b4b4;
    `}
`

export default TableCell
