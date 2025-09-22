import React from "react"
import styles from "./TableCell.module.css"

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  borderLeft?: boolean
}

const TableCell: React.FC<TableCellProps> = ({
  borderLeft,
  className,
  ...props
}) => (
  <td
    className={`${styles.cell} ${borderLeft ? styles.borderLeft : ""} ${className || ""}`}
    {...props}
  />
)

export default TableCell
