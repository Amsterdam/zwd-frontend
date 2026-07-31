export interface XlsxColumn {
  key: string
  header: string
  width?: number
}

export type XlsxCellValue = string | number | Date | null | undefined

export interface XlsxWorksheetModel {
  name: string
  columns: XlsxColumn[]
  rows: XlsxCellValue[][]
  headerBold: boolean
}
