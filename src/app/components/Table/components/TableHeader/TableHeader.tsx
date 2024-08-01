import StyledHeader from "./StyledHeader"
import Sorter from "./Sorter"
import { ColumnType, SortingType } from "../../types"

type Props<T> = {
  lastColumnFixed?: boolean
  columns: ColumnType<T>[]
  onChangeSorting: (sorting: SortingType) => void
  sorting?: SortingType
}

const TableHeader = <T,>({ columns, lastColumnFixed, onChangeSorting, sorting }: Props<T>) => (
  <thead>
    <tr>
      { columns.map(({ header, minWidth, sorter }, index) =>
        <StyledHeader
          key={ index }
          minWidth={ minWidth }
          isFixed={ lastColumnFixed && index === columns.length - 1 }
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
