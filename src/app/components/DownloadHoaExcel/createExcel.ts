import Excel from "exceljs"

const hoaColumns = [
  { key: "name", header: "Statutaire naam" },
  { key: "number_of_apartments", header: "Aantal appartementen" },
  { key: "district", header: "Stadsdeel" },
  { key: "neighborhood", header: "Buurt" },
  { key: "course_participant_count", header: "Aantal cursusdeelnemers" },
  { key: "letter_count", header: "Aantal brieven" },
  { key: "cases_count", header: "Aantal zaken" }
]

export type ExpandedHoa = Components.Schemas.HomeownerAssociation & {
  cases_count: number
  letter_count: number
  course_participant_count: number
}

export const createExcel = (data: ExpandedHoa[]) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet("vve's")

  worksheet.columns = hoaColumns
  worksheet.columns.forEach((column) => {
    column.width = 15
  })
  worksheet.getColumn(10).width = 100
  worksheet.getRow(1).font = { bold: true }

  data.forEach((hoaItem) => {
    const row = {
      name: hoaItem?.name,
      number_of_apartments: hoaItem?.number_of_apartments,
      district: hoaItem?.district,
      neighborhood: hoaItem?.neighborhood,
      course_participant_count: hoaItem?.course_participant_count,
      letter_count: hoaItem?.letter_count,
      cases_count: hoaItem?.cases_count
    }
    worksheet.addRow(row)
  })

  return workbook
}
