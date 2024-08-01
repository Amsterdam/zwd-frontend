import React from "react"
import styled from "styled-components"
import { Icon } from "@amsterdam/design-system-react"
import { SortingType, ASCEND, DESCEND, SortOrder } from "../../types"
import { ArrowDownward, ArrowUpward } from "./icons"

type Props = {
  header?: React.ReactNode
  sorting?: SortingType
  onChangeSorting: (sorting: SortingType) => void
  index: number
}

const StyledLabel = styled.div<{ $isSelected: boolean, $sortOrder: SortOrder }>`
  display: flex;
  cursor: pointer;
  ${ ({ $isSelected }) => !$isSelected
    ? `&:hover {
      opacity: 0.5;
    }
      &:hover span {
      visibility: visible;
    }`
    : ""
}
  &:active span {
    ${ ({ $isSelected, $sortOrder }) => $isSelected && (
    `animation: ${ $sortOrder === "DESCEND" ? "rotate-back" : "rotate" } 0.3s ease 0s;`
  )
}
  }
  @-webkit-keyframes rotate {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(180deg); }
  }
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
  }
  @-webkit-keyframes rotate-back {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(-180deg); }
  }
  @keyframes rotate-back {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-180deg); }
  }
`

const StyledIcon = styled(Icon)<{ $isSelected: boolean }>`
  margin: -5px 8px 0 8px;
  visibility: ${ ({ $isSelected }) => $isSelected ? "visible" : "hidden" };

`

const Sorter: React.FC<Props> = ({ header, index, sorting, onChangeSorting }) => {
  const isSelected = sorting?.index === index
  // Only show arrow down icon when order is DESCEND and sorting is already selected.
  const iconSvg = isSelected && sorting?.order === DESCEND ? ArrowDownward : ArrowUpward

  const onSorterClick = () => {
    const newOrder = isSelected && sorting?.order === ASCEND ? DESCEND : ASCEND
    onChangeSorting({ index: index, order: newOrder })
  }

  return (
    <StyledLabel $isSelected={ isSelected } $sortOrder={ sorting?.order ?? ASCEND } onClick={ onSorterClick }>
      { header ?? <>&nbsp;</> }
      <StyledIcon $isSelected={ isSelected } svg={ iconSvg } size="level-5" />
    </StyledLabel>
  )
}

export default Sorter
