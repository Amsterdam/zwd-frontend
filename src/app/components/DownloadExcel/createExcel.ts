import Excel from "exceljs"

const casesColumns = [
  { key: "prefixed_dossier_id", header: "ID" },
  { key: "legacy_id", header: "Excel ID" },
  { key: "homeowner_association_name", header: "Vve statutaire naam" },
  { key: "status", header: "Status" },
  { key: "request_date", header: "Aanvraagdatum" },
  { key: "end_date", header: "Einddatum zaak" },
  { key: "updated", header: "Laatst gewijzigd" },
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
      request_date: caseItem.request_date ? new Date(caseItem.request_date) : null,
      end_date: caseItem.end_date ? new Date(caseItem.end_date) : null,
      updated: caseItem.updated ? new Date(caseItem.updated) : null,
    }
    worksheet.addRow(row)
  })

  return workbook
}
