import React from "react"
import styled from "styled-components"

type StyledProps = {
  $width?: number
}

const StyledTableHeader = styled.th<StyledProps>`
  text-align: left;
  border-bottom: 1px solid #B4B4B4;
  padding: 8px 12px;
  white-space: nowrap;
  width: ${ ({ $width }) => $width ? `${ $width }px` : "auto" };
`

type Props = {
  width?: number
  children?: React.ReactNode 
}

const StyledHeader: React.FC<Props> = ({ children, width }) => (
  <StyledTableHeader $width={ width } >
    { children }
  </StyledTableHeader>
)

export default StyledHeader
