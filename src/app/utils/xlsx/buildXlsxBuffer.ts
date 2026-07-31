import { strToU8, zipSync } from "fflate"
import type { XlsxCellValue, XlsxColumn, XlsxWorksheetModel } from "./types"

const RELATIONSHIP_NS =
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
const DATE_NUM_FMT_ID = 164
const DEFAULT_COLUMN_WIDTH = 10
const HEADER_STYLE_ID = 1
const DATE_STYLE_ID = 2

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

// Converts a 1-based column index to its spreadsheet letter (1 -> A, 27 -> AA).
const columnLetter = (index: number): string => {
  let n = index
  let letters = ""
  while (n > 0) {
    const remainder = (n - 1) % 26
    letters = String.fromCharCode(65 + remainder) + letters
    n = Math.floor((n - 1) / 26)
  }
  return letters
}

const EXCEL_EPOCH_MS = Date.UTC(1899, 11, 30)
const MS_PER_DAY = 24 * 60 * 60 * 1000

// Excel stores dates as a serial number of days since 1899-12-30. We read the
// UTC calendar fields of the JS Date so the displayed date/time is stable
// regardless of the timezone of the machine generating the file.
const dateToExcelSerial = (date: Date): number => {
  const utcMs = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  )
  return (utcMs - EXCEL_EPOCH_MS) / MS_PER_DAY
}

const buildContentTypesXml = (worksheets: XlsxWorksheetModel[]): string => {
  const sheetOverrides = worksheets
    .map(
      (_, i) =>
        `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
    )
    .join("")
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
${sheetOverrides}
</Types>`
}

const PACKAGE_RELS_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="${RELATIONSHIP_NS}/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`

const buildWorkbookXml = (worksheets: XlsxWorksheetModel[]): string => {
  const sheets = worksheets
    .map(
      (ws, i) =>
        `<sheet name="${escapeXml(ws.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`
    )
    .join("")
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="${RELATIONSHIP_NS}">
<sheets>${sheets}</sheets>
</workbook>`
}

const buildWorkbookRelsXml = (worksheets: XlsxWorksheetModel[]): string => {
  const sheetRels = worksheets
    .map(
      (_, i) =>
        `<Relationship Id="rId${i + 1}" Type="${RELATIONSHIP_NS}/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`
    )
    .join("")
  const stylesRelId = worksheets.length + 1
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${sheetRels}
<Relationship Id="rId${stylesRelId}" Type="${RELATIONSHIP_NS}/styles" Target="styles.xml"/>
</Relationships>`
}

const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1">
<numFmt numFmtId="${DATE_NUM_FMT_ID}" formatCode="dd-mm-yyyy"/>
</numFmts>
<fonts count="2">
<font><sz val="11"/><name val="Calibri"/></font>
<font><b/><sz val="11"/><name val="Calibri"/></font>
</fonts>
<fills count="2">
<fill><patternFill patternType="none"/></fill>
<fill><patternFill patternType="gray125"/></fill>
</fills>
<borders count="1">
<border><left/><right/><top/><bottom/><diagonal/></border>
</borders>
<cellStyleXfs count="1">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
</cellStyleXfs>
<cellXfs count="3">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="${DATE_NUM_FMT_ID}" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
</cellXfs>
<cellStyles count="1">
<cellStyle name="Normal" xfId="0" builtinId="0"/>
</cellStyles>
</styleSheet>`

const buildColsXml = (columns: XlsxColumn[]): string => {
  if (columns.length === 0) return ""
  const cols = columns
    .map(
      (col, i) =>
        `<col min="${i + 1}" max="${i + 1}" width="${col.width ?? DEFAULT_COLUMN_WIDTH}" customWidth="1"/>`
    )
    .join("")
  return `<cols>${cols}</cols>`
}

const buildCellXml = (
  value: XlsxCellValue,
  cellRef: string,
  styleId?: number
): string => {
  if (value === null || value === undefined || value === "") return ""

  if (value instanceof Date) {
    return `<c r="${cellRef}" s="${DATE_STYLE_ID}"><v>${dateToExcelSerial(value)}</v></c>`
  }

  const styleAttr = styleId ? ` s="${styleId}"` : ""

  if (typeof value === "number") {
    return `<c r="${cellRef}"${styleAttr}><v>${value}</v></c>`
  }

  const text = escapeXml(String(value))
  const preserveSpace = /^\s|\s$|\n/.test(text) ? ' xml:space="preserve"' : ""
  return `<c r="${cellRef}"${styleAttr} t="inlineStr"><is><t${preserveSpace}>${text}</t></is></c>`
}

const buildSheetXml = (worksheet: XlsxWorksheetModel): string => {
  const headerStyleId = worksheet.headerBold ? HEADER_STYLE_ID : undefined
  const headerCells = worksheet.columns
    .map((col, i) =>
      buildCellXml(col.header, `${columnLetter(i + 1)}1`, headerStyleId)
    )
    .join("")
  const headerRow = `<row r="1">${headerCells}</row>`

  const dataRows = worksheet.rows
    .map((row, rowIndex) => {
      const rowNumber = rowIndex + 2
      const cells = row
        .map((value, colIndex) =>
          buildCellXml(value, `${columnLetter(colIndex + 1)}${rowNumber}`)
        )
        .join("")
      return `<row r="${rowNumber}">${cells}</row>`
    })
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
${buildColsXml(worksheet.columns)}
<sheetData>${headerRow}${dataRows}</sheetData>
</worksheet>`
}

export const buildXlsxBuffer = (
  worksheets: XlsxWorksheetModel[]
): Uint8Array<ArrayBuffer> => {
  const files: Record<string, Uint8Array> = {
    "[Content_Types].xml": strToU8(buildContentTypesXml(worksheets)),
    "_rels/.rels": strToU8(PACKAGE_RELS_XML),
    "xl/workbook.xml": strToU8(buildWorkbookXml(worksheets)),
    "xl/_rels/workbook.xml.rels": strToU8(buildWorkbookRelsXml(worksheets)),
    "xl/styles.xml": strToU8(STYLES_XML)
  }
  worksheets.forEach((ws, i) => {
    files[`xl/worksheets/sheet${i + 1}.xml`] = strToU8(buildSheetXml(ws))
  })
  return zipSync(files)
}
