import { buildXlsxBuffer } from "./buildXlsxBuffer"
import type { XlsxCellValue, XlsxColumn, XlsxWorksheetModel } from "./types"

export type { XlsxCellValue, XlsxColumn } from "./types"

export class XlsxWorksheet {
  readonly name: string
  private _columns: XlsxColumn[] = []
  // Number of columns that actually had a header written via the `columns`
  // setter. `getColumn` can extend `_columns` past this (mirroring exceljs,
  // which lazily creates column definitions for width/style purposes), but
  // those extra columns never get a header cell written into row 1.
  private _headerColumnCount = 0
  private _rows: XlsxCellValue[][] = []
  private _headerFont: { bold?: boolean } = {}

  constructor(name: string) {
    this.name = name
  }

  get columns(): XlsxColumn[] {
    return this._columns
  }

  set columns(columns: XlsxColumn[]) {
    this._columns = columns
    this._headerColumnCount = columns.length
  }

  getColumn(position: number): XlsxColumn {
    while (this._columns.length < position) {
      this._columns.push({ key: "", header: "" })
    }
    return this._columns[position - 1]
  }

  getRow(position: number) {
    const values =
      position === 1
        ? this._columns
            .slice(0, this._headerColumnCount)
            .map((column) => column.header)
        : (this._rows[position - 2] ?? [])

    const row = {
      values: [undefined, ...values] as (XlsxCellValue | undefined)[],
      getCell: (cellPosition: number) => ({ value: values[cellPosition - 1] })
    }

    return Object.defineProperty(row, "font", {
      configurable: true,
      enumerable: true,
      get: () => this._headerFont,
      set: (value: { bold?: boolean }) => {
        this._headerFont = value
      }
    }) as typeof row & { font: { bold?: boolean } }
  }

  addRow(data: Record<string, unknown>): void {
    const values = this._columns.map((column) => {
      const value = data[column.key]
      return (value === undefined ? null : value) as XlsxCellValue
    })
    this._rows.push(values)
  }

  toModel(): XlsxWorksheetModel {
    return {
      name: this.name,
      columns: this._columns,
      rows: this._rows,
      headerBold: !!this._headerFont.bold
    }
  }
}

export class XlsxWorkbook {
  private worksheets: XlsxWorksheet[] = []

  addWorksheet(name: string): XlsxWorksheet {
    const worksheet = new XlsxWorksheet(name)
    this.worksheets.push(worksheet)
    return worksheet
  }

  getWorksheet(name: string): XlsxWorksheet | undefined {
    return this.worksheets.find((worksheet) => worksheet.name === name)
  }

  xlsx = {
    writeBuffer: async (): Promise<Uint8Array<ArrayBuffer>> =>
      buildXlsxBuffer(this.worksheets.map((worksheet) => worksheet.toModel()))
  }
}

export const createWorkbook = (): XlsxWorkbook => new XlsxWorkbook()
