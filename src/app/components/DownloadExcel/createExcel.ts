import Excel from "exceljs"

export type ExpandedCase = Components.Schemas.Case & {
  updated?: string
  homeowner_association: Components.Schemas.HomeownerAssociation | null
  additional_fields: { header: string; value: string }[]
}

const casesColumns = [
  { key: "prefixed_dossier_id", header: "ID" },
  { key: "legacy_id", header: "Excel ID" },
  { key: "status", header: "Status" },
  { key: "application_type", header: "Aanvraagtype" },
  { key: "advice_type", header: "Adviestype" },
  { key: "advisor", header: "Adviseur" },
  { key: "request_date", header: "Aanvraagdatum" },
  { key: "end_date", header: "Einddatum zaak" },
  { key: "updated", header: "Laatst gewijzigd" },
  { key: "hoa_name", header: "Vve statutaire naam" },
  { key: "hoa_zip_code", header: "Vve postcode" },
  { key: "hoa_neighborhood", header: "Vve buurt" },
  { key: "hoa_wijk", header: "Vve wijk" },
  { key: "hoa_district", header: "Vve stadsdeel" },
  {
    key: "hoa_number_of_apartments",
    header: "Vve aantal appartementen"
  },
  { key: "hoa_build_year", header: "Vve bouwjaar" },
  { key: "hoa_is_small", header: "Vve klein" },
  {
    key: "hoa_is_priority_neighborhood",
    header: "Vve prioriteitswijk"
  },
  { key: "hoa_kvk_nummer", header: "Vve kvk nummer" },
  {
    key: "hoa_monument_status",
    header: "Vve monument status"
  },
  {
    key: "hoa_ligt_in_beschermd_gebied",
    header: "Vve ligt in beschermd gebied"
  },
  {
    key: "hoa_beschermd_stadsdorpsgezicht",
    header: "Vve beschermd stads- of dorpsgezicht"
  },
  { key: "hoa_owners", header: "Vve Eigenaren" }
]

export const createExcel = (data: ExpandedCase[]) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet("Zaken")

  worksheet.columns = casesColumns
  worksheet.columns.forEach((column) => {
    column.width = 15
  })
  worksheet.getColumn(10).width = 100
  worksheet.getRow(1).font = { bold: true }
  const additional_fields = new Map<string, { header: string; key: string; width: number }>()

  data.forEach(caseItem => {
    caseItem.additional_fields.forEach((field: { header: string | undefined }) => {
      if (!field.header) return
      const exists = worksheet.columns.some(col => col.header === field.header)
      if (!exists && !additional_fields.has(field.header)) {
        additional_fields.set(field.header, {
          header: field.header,
          key: field.header,
          width: 15,
        })
      }
    })
  })
  worksheet.columns = [...worksheet.columns, ...Array.from(additional_fields.values())]

  data.forEach((caseItem) => {
    const owners =
      caseItem.homeowner_association?.owners
        ?.map(
          (owner) =>
            `${owner.type}: ${owner.name} (${owner.number_of_apartments} appartementen)`
        )
        .join("; ") || ""
    
    const additional_fields_map = Object.fromEntries(
      caseItem.additional_fields.map((f: { header: string; value: string }) => [f.header, f.value])
    )
    const row = {
      ...caseItem,
      request_date: caseItem.request_date
        ? new Date(caseItem.request_date)
        : null,
      end_date: caseItem.end_date ? new Date(caseItem.end_date) : null,
      updated: caseItem.updated ? new Date(caseItem.updated) : null,
      hoa_name: caseItem.homeowner_association?.name || "",
      hoa_zip_code: caseItem.homeowner_association?.zip_code || "",
      hoa_neighborhood: caseItem.homeowner_association?.neighborhood || "",
      hoa_wijk: caseItem.homeowner_association?.wijk || "",
      hoa_district: caseItem.homeowner_association?.district || "",
      hoa_number_of_apartments:
        caseItem.homeowner_association?.number_of_apartments || "",
      hoa_build_year: caseItem.homeowner_association?.build_year || "",
      hoa_is_small: caseItem.homeowner_association?.is_small ? "Ja" : "Nee",
      hoa_is_priority_neighborhood: caseItem.homeowner_association
        ?.is_priority_neighborhood
        ? "Ja"
        : "Nee",
      hoa_kvk_nummer: caseItem.homeowner_association?.kvk_nummer || "",
      hoa_monument_status:
        caseItem.homeowner_association?.monument_status || "",
      hoa_ligt_in_beschermd_gebied:
        caseItem.homeowner_association?.ligt_in_beschermd_gebied || "",
      hoa_beschermd_stadsdorpsgezicht:
        caseItem.homeowner_association?.beschermd_stadsdorpsgezicht || "",
      hoa_owners: owners,
      ...additional_fields_map
    }
    worksheet.addRow(row)
  })

  return workbook
}
