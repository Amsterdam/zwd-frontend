import { describe, expect, it } from "vitest"
import { strFromU8, unzipSync } from "fflate"
import { createWorkbook } from ".."

describe("xlsx buffer output", () => {
  it("produces a valid xlsx package with the expected parts", async () => {
    const workbook = createWorkbook()
    const worksheet = workbook.addWorksheet("Zaken")

    worksheet.columns = [
      { key: "id", header: "ID", width: 15 },
      { key: "name", header: "Naam & <special>", width: 20 },
      { key: "count", header: "Aantal" },
      { key: "date", header: "Datum" }
    ]
    worksheet.getRow(1).font = { bold: true }

    const date = new Date("2025-09-10T12:07:57.000Z")
    worksheet.addRow({ id: "D001", name: 'Foo "Bar" & co', count: 5, date })
    worksheet.addRow({ id: "D002", name: "", count: 0, date: null })

    const buffer = await workbook.xlsx.writeBuffer()
    const files = unzipSync(buffer)

    expect(Object.keys(files)).toEqual(
      expect.arrayContaining([
        "[Content_Types].xml",
        "_rels/.rels",
        "xl/workbook.xml",
        "xl/_rels/workbook.xml.rels",
        "xl/styles.xml",
        "xl/worksheets/sheet1.xml"
      ])
    )

    const workbookXml = strFromU8(files["xl/workbook.xml"])
    expect(workbookXml).toContain('name="Zaken"')

    const stylesXml = strFromU8(files["xl/styles.xml"])
    expect(stylesXml).toContain("<b/>")
    expect(stylesXml).toContain('formatCode="dd-mm-yyyy"')

    const sheetXml = strFromU8(files["xl/worksheets/sheet1.xml"])

    // column widths
    expect(sheetXml).toContain('<col min="1" max="1" width="15"')
    expect(sheetXml).toContain('<col min="3" max="3" width="10"')

    // header row uses the bold style and escapes special characters
    expect(sheetXml).toContain(
      '<c r="A1" s="1" t="inlineStr"><is><t>ID</t></is></c>'
    )
    expect(sheetXml).toContain("Naam &amp; &lt;special&gt;")

    // string cell escapes quotes
    expect(sheetXml).toContain("Foo &quot;Bar&quot; &amp; co")

    // numeric cell
    expect(sheetXml).toContain('<c r="C2"><v>5</v></c>')

    // date cell is serialized as an Excel serial number with the date style
    const expectedSerial = (date.getTime() - Date.UTC(1899, 11, 30)) / 86400000
    expect(sheetXml).toContain(`<c r="D2" s="2"><v>${expectedSerial}</v></c>`)

    // empty/null values produce no cell element at all
    expect(sheetXml).not.toMatch(/r="B3"/)
    expect(sheetXml).not.toMatch(/r="D3"/)
  })

  it("omits the cols element and stays valid when there are no columns", async () => {
    const workbook = createWorkbook()
    workbook.addWorksheet("Leeg")

    const buffer = await workbook.xlsx.writeBuffer()
    const files = unzipSync(buffer)
    const sheetXml = strFromU8(files["xl/worksheets/sheet1.xml"])

    expect(sheetXml).not.toContain("<cols>")
    expect(sheetXml).toContain("<sheetData>")
  })
})
