import { describe, it, expect } from "vitest"
import { createExcel } from "./createExcel"

describe("createExcel", () => {
  it("should create a workbook with correct columns and data", () => {
    const mockData = [
      {
        prefixed_dossier_id: "D001",
        legacy_id: 123,
        homeowner_association: { name: "VVE De Zonnebloem" },
        status: "Open",
        request_date: "2025-09-10T12:07:57.926331Z",
        end_date: "2025-12-31T23:59:59.000Z",
        updated: "2025-09-12T09:15:00.000Z",
      },
    ]

    const workbook = createExcel(mockData)
    const worksheet = workbook.getWorksheet("Zaken")

    // Controleer of worksheet bestaat
    expect(worksheet).toBeDefined()

    // Controleer kolommen
    const headers = worksheet ? worksheet.columns.map((col) => col.header) : []
    expect(headers).toEqual([
      "ID",
      "Excel ID",
      "Vve statutaire naam",
      "Status",
      "Aanvraagdatum",
      "Einddatum zaak",
      "Laatst gewijzigd",
    ])

    // Controleer eerste rij data
    if (!worksheet) {
      throw new Error("Worksheet 'Zaken' not found")
    }
    const firstRow = worksheet.getRow(2)
    expect(firstRow.getCell(1).value).toBe("D001")
    expect(firstRow.getCell(2).value).toBe(123)
    expect(firstRow.getCell(3).value).toBe("VVE De Zonnebloem")
    expect(firstRow.getCell(4).value).toBe("Open")

    // Controleer dat de datumvelden Date objecten zijn
    expect(firstRow.getCell(5).value).toBeInstanceOf(Date)
    expect(firstRow.getCell(6).value).toBeInstanceOf(Date)
    expect(firstRow.getCell(7).value).toBeInstanceOf(Date)
  })
})
