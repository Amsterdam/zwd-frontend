import { describe, it, expect } from "vitest"
import { createExcel } from "./createExcel"

describe("createExcel", () => {
  it("should create a workbook with correct columns and data", () => {
    const mockData = [
      {
        prefixed_dossier_id: "D001",
        legacy_id: 123,
        status: "Open",
        application_type: "Type A",
        advice_type: "Type B",
        advisor: "John Doe",
        request_date: "2025-09-10T12:07:57.926331Z",
        end_date: "2025-12-31T23:59:59.000Z",
        updated: "2025-09-12T09:15:00.000Z",
        homeowner_association: {
          name: "VVE De Zonnebloem",
          zip_code: "1234AB",
          neighborhood: "Centrum",
          wijk: "Wijk 1",
          district: "Stadsdeel A",
          number_of_apartments: 10,
          build_year: 1990,
          is_small: true,
          is_priority_neighborhood: false,
          kvk_nummer: "12345678",
          monument_status: "Geen",
          ligt_in_beschermd_gebied: "Nee",
          beschermd_stadsdorpsgezicht: "Nee",
          course_participant_count: 3,
          owners: [
            {
              type: "Onderneming",
              name: "Bedrijf A",
              number_of_apartments: 5
            },
            {
              type: "Particulier",
              name: "Persoon B",
              number_of_apartments: 5
            }
          ]
        },
        additional_fields: [
          { header: "Extra Field 1", value: "Value 1" },
          { header: "Extra Field 2", value: "Value 2" }
        ]
      }
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
      "Status",
      "Aanvraagtype",
      "Adviestype",
      "Adviseur",
      "Aanvraagdatum",
      "Einddatum zaak",
      "Laatst gewijzigd",
      "VvE statutaire naam",
      "VvE postcode",
      "VvE buurt",
      "VvE wijk",
      "VvE stadsdeel",
      "VvE aantal appartementen",
      "VvE bouwjaar",
      "VvE klein",
      "VvE prioriteitswijk",
      "VvE kvk nummer",
      "VvE monument status",
      "VvE ligt in beschermd gebied",
      "VvE beschermd stads- of dorpsgezicht",
      "VvE Eigenaren",
      "VvE aantal cursusdeelnemers",
      "Extra Field 1",
      "Extra Field 2"
    ])

    // Controleer eerste rij data
    if (!worksheet) {
      throw new Error("Worksheet 'Zaken' not found")
    }
    const firstRow = worksheet.getRow(2)
    expect(firstRow.getCell(1).value).toBe("D001") // ID
    expect(firstRow.getCell(2).value).toBe(123) // Excel ID
    expect(firstRow.getCell(3).value).toBe("Open") // Status
    expect(firstRow.getCell(4).value).toBe("Type A") // Aanvraagtype
    expect(firstRow.getCell(5).value).toBe("Type B") // Adviestype
    expect(firstRow.getCell(6).value).toBe("John Doe") // Adviseur

    // Controleer dat de datumvelden correct zijn
    expect(firstRow.getCell(7).value).toEqual(
      new Date("2025-09-10T12:07:57.926331Z")
    ) // Aanvraagdatum
    expect(firstRow.getCell(8).value).toEqual(
      new Date("2025-12-31T23:59:59.000Z")
    ) // Einddatum zaak
    expect(firstRow.getCell(9).value).toEqual(
      new Date("2025-09-12T09:15:00.000Z")
    ) // Laatst gewijzigd

    // Controleer VVE gegevens
    expect(firstRow.getCell(10).value).toBe("VVE De Zonnebloem") // VvE statutaire naam
    expect(firstRow.getCell(11).value).toBe("1234AB") // VvE postcode
    expect(firstRow.getCell(12).value).toBe("Centrum") // VvE buurt
    expect(firstRow.getCell(13).value).toBe("Wijk 1") // VvE wijk
    expect(firstRow.getCell(14).value).toBe("Stadsdeel A") // VvE stadsdeel
    expect(firstRow.getCell(15).value).toBe(10) // VvE aantal appartementen
    expect(firstRow.getCell(16).value).toBe(1990) // VvE bouwjaar
    expect(firstRow.getCell(17).value).toBe("Ja") // VvE klein
    expect(firstRow.getCell(18).value).toBe("Nee") // VvE prioriteitswijk
    expect(firstRow.getCell(19).value).toBe("12345678") // VvE kvk nummer
    expect(firstRow.getCell(20).value).toBe("Geen") // VvE monument status
    expect(firstRow.getCell(21).value).toBe("Nee") // VvE ligt in beschermd gebied
    expect(firstRow.getCell(22).value).toBe("Nee") // VvE beschermd stads- of dorpsgezicht

    // Controleer eigenaren
    expect(firstRow.getCell(23).value).toBe(
      "Onderneming: Bedrijf A (5 appartementen); Particulier: Persoon B (5 appartementen)"
    ) // VvE Eigenaren

    // Controleer cursusdeelnemers
    expect(firstRow.getCell(24).value).toBe(3) // VvE aantal cursusdeelnemers

    // Controleer extra velden
    expect(firstRow.getCell(25).value).toBe("Value 1") // Extra Field 1
    expect(firstRow.getCell(26).value).toBe("Value 2") // Extra Field 2
  })
})
