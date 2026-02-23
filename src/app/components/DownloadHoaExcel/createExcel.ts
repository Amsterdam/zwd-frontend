import Excel from "exceljs"

const hoaColumns = [
  { key: "name", header: "Statutaire naam" },
  { key: "number_of_apartments", header: "Aantal appartementen" },
  { key: "district", header: "Stadsdeel" },
  { key: "neighborhood", header: "Buurt" },
  { key: "course_participant_count", header: "Aantal cursusdeelnemers" },
  { key: "letter_count", header: "Aantal brieven" },
  { key: "advice_cases_count", header: "Aantal advieszaken" },
  { key: "activationteam_cases_count", header: "Aantal activeringsteamszaken" }
]

export type ExpandedHoa = Components.Schemas.HomeownerAssociation & {
  advice_cases_count: number
  activationteam_cases_count: number
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
      advice_cases_count: hoaItem?.advice_cases_count,
      activationteam_cases_count: hoaItem?.activationteam_cases_count
    }
    worksheet.addRow(row)
  })

  return workbook
}
