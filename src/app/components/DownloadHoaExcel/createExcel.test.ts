import { describe, it, expect } from "vitest"
import { createExcel } from "./createExcel"

describe("createExcel", () => {
  it("should create a workbook with correct columns and data", () => {
    const mockData = [
      {
        name: "VVE De Zonnebloem",
        number_of_apartments: 10,
        district: "Stadsdeel A",
        neighborhood: "Centrum",
        course_participant_count: 3,
        letter_count: 5,
        cases_count: 2
      }
    ]

    const workbook = createExcel(mockData)
    const worksheet = workbook.getWorksheet("vve's")

    // Controleer of worksheet bestaat
    expect(worksheet).toBeDefined()

    // Controleer kolommen
    const headerRow = worksheet?.getRow(1)
    const headerValues = Array.isArray(headerRow?.values) ? headerRow!.values.slice(1) : []
    expect(headerValues).toEqual([
      "Statutaire naam",
      "Aantal appartementen",
      "Stadsdeel",
      "Buurt",
      "Aantal cursusdeelnemers",
      "Aantal brieven",
      "Aantal zaken"
    ])

    // Controleer eerste rij data
    if (!worksheet) {
      throw new Error("Worksheet \"vve's\" not found")
    }
    const firstRow = worksheet.getRow(2)
    expect(firstRow.getCell(1).value).toBe("VVE De Zonnebloem")
    expect(firstRow.getCell(2).value).toBe(10)
    expect(firstRow.getCell(3).value).toBe("Stadsdeel A")
    expect(firstRow.getCell(4).value).toBe("Centrum")
    expect(firstRow.getCell(5).value).toBe(3)
    expect(firstRow.getCell(6).value).toBe(5)
    expect(firstRow.getCell(7).value).toBe(2)
  })
})
