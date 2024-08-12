import StyledHeader from "./StyledHeader"
import Sorter from "./Sorter"
import { ColumnType, SortingType } from "../../types"

type Props<T> = {
  columns: ColumnType<T>[]
  onChangeSorting: (sorting: SortingType) => void
  sorting?: SortingType
}

const TableHeader = <T,>({ columns, onChangeSorting, sorting }: Props<T>) => (
  <thead>
    <tr>
      { columns.map(({ header, width, sorter }, index) =>
        <StyledHeader
          key={ index }
          width={ width }
        >
          { sorter ? (
            <Sorter 
              header={ header } 
              sorting={ sorting } 
              onChangeSorting={ onChangeSorting } 
              index={ index } 
            />
          ) : (
            header
          )
          }
        </StyledHeader>
      ) }
    </tr>
  </thead>
)

export default TableHeader
