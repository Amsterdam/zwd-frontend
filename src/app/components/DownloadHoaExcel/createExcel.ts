import Excel from "exceljs"

export type ExpandedCase = Components.Schemas.Case & {
  updated?: string
  homeowner_association: Components.Schemas.HomeownerAssociation | null
  additional_fields: { header: string; value: string }[]
}

const hoaColumns = [
  { key: "name", header: "Statutaire naam" },
  { key: "number_of_apartments", header: "Aantal appartementen" },
  { key: "district", header: "Stadsdeel" },
  { key: "neighborhood", header: "Buurt" },

]

export const createExcel = (data: ExpandedCase[]) => {
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
