import Excel from "exceljs"

const casesColumns = [
  { key: "prefixed_dossier_id", header: "ID" },
  { key: "legacy_id", header: "Excel ID" },
  { key: "homeowner_association_name", header: "Vve statutaire naam" },
  { key: "status", header: "Status" },
  { key: "created", header: "Startdatum zaak" },
  { key: "updated", header: "Laatst gewijzigd" },
  { key: "end_date", header: "Einddatum zaak" },
]

export const createExcel = (data: Components.Schemas.CaseList[]) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet("Zaken")

  worksheet.columns = casesColumns

  worksheet.getColumn(1).width = 10
  worksheet.getColumn(2).width = 12
  worksheet.getColumn(3).width = 100
  worksheet.getColumn(4).width = 25
  worksheet.getColumn(5).width = 15
  worksheet.getColumn(6).width = 15
  worksheet.getColumn(7).width = 15

  worksheet.getRow(1).font = { bold: true }

  data.forEach((caseItem) => {
    const row = {
      ...caseItem,
      homeowner_association_name: caseItem.homeowner_association?.name || "",
      created: caseItem.created ? new Date(caseItem.created) : null,
      updated: caseItem.updated ? new Date(caseItem.updated) : null,
      end_date: caseItem.end_date ? new Date(caseItem.end_date) : null,
    }
    worksheet.addRow(row)
  })

  return workbook
}
