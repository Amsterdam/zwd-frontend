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

export const createExcel = (data: Components.Schemas.HomeownerAssociation[]) => {
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
      ...hoaItem
    }
    worksheet.addRow(row)
  })

  return workbook
}
