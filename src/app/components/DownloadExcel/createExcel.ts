import { createWorkbook } from "app/utils/xlsx"

type ExpandedCaseWorkflow = {
  workflow_type?: string | null
  workflow_version?: string | null
}

export type ExpandedCase = Omit<components["schemas"]["Case"], "workflows"> & {
  updated?: string
  homeowner_association: components["schemas"]["HomeownerAssociation"] | null
  additional_fields: { header: string; value: string }[]
  workflows?: ExpandedCaseWorkflow[]
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
  { key: "hoa_name", header: "VvE statutaire naam" },
  { key: "hoa_zip_code", header: "VvE postcode" },
  { key: "hoa_neighborhood", header: "VvE buurt" },
  { key: "hoa_wijk", header: "VvE wijk" },
  { key: "hoa_district", header: "VvE stadsdeel" },
  {
    key: "hoa_number_of_apartments",
    header: "VvE aantal appartementen"
  },
  { key: "hoa_build_year", header: "VvE bouwjaar" },
  { key: "hoa_is_small", header: "VvE klein" },
  {
    key: "hoa_is_priority_neighborhood",
    header: "VvE prioriteitswijk"
  },
  { key: "hoa_kvk_nummer", header: "VvE kvk nummer" },
  {
    key: "hoa_monument_status",
    header: "VvE monument status"
  },
  {
    key: "hoa_ligt_in_beschermd_gebied",
    header: "VvE ligt in beschermd gebied"
  },
  {
    key: "hoa_beschermd_stadsdorpsgezicht",
    header: "VvE beschermd stads- of dorpsgezicht"
  },
  { key: "hoa_owners", header: "VvE Eigenaren" },
  {
    key: "hoa_course_participant_count",
    header: "VvE aantal cursusdeelnemers"
  }
]

export const createExcel = (data: ExpandedCase[]) => {
  const workbook = createWorkbook()
  const worksheet = workbook.addWorksheet("Zaken")
  worksheet.columns = casesColumns
  worksheet.columns.forEach((column) => {
    column.width = 15
  })
  worksheet.getColumn(10).width = 100
  worksheet.getRow(1).font = { bold: true }
  const workflow_fields = new Map<
    string,
    { header: string; key: string; width: number }
  >()
  const additional_fields = new Map<
    string,
    { header: string; key: string; width: number }
  >()

  data.forEach((caseItem) => {
    ;(caseItem.workflows ?? []).forEach((workflow) => {
      if (!workflow.workflow_type) return

      const header = `${workflow.workflow_type} versie`
      const key = `workflow_${workflow.workflow_type}_version`

      if (!workflow_fields.has(key)) {
        workflow_fields.set(key, {
          header,
          key,
          width: 15
        })
      }
    })

    caseItem.additional_fields.forEach(
      (field: { header: string | undefined }) => {
        if (!field.header) return
        const exists = worksheet.columns.some(
          (col) => col.header === field.header
        )
        if (!exists && !additional_fields.has(field.header)) {
          additional_fields.set(field.header, {
            header: field.header,
            key: field.header,
            width: 15
          })
        }
      }
    )
  })
  worksheet.columns = [
    ...worksheet.columns,
    ...Array.from(workflow_fields.values()),
    ...Array.from(additional_fields.values())
  ]

  data.forEach((caseItem) => {
    const owners =
      caseItem.homeowner_association?.owners
        ?.map(
          (owner) =>
            `${owner.type}: ${owner.name} (${owner.number_of_apartments} appartementen)`
        )
        .join("; ") || ""

    const workflow_fields_map = Object.entries(
      (caseItem.workflows ?? []).reduce<Record<string, string[]>>(
        (accumulator, workflow) => {
          if (!workflow.workflow_type || !workflow.workflow_version) {
            return accumulator
          }

          const key = `workflow_${workflow.workflow_type}_version`

          if (!accumulator[key]) {
            accumulator[key] = []
          }

          accumulator[key].push(workflow.workflow_version)
          return accumulator
        },
        {}
      )
    ).reduce<Record<string, string>>((accumulator, [key, versions]) => {
      accumulator[key] = versions.join("; ")
      return accumulator
    }, {})

    const additional_fields_map = Object.fromEntries(
      caseItem.additional_fields.map((f: { header: string; value: string }) => [
        f.header,
        f.value
      ])
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
      hoa_course_participant_count:
        caseItem.homeowner_association?.course_participant_count || 0,
      ...workflow_fields_map,
      ...additional_fields_map
    }
    worksheet.addRow(row)
  })

  return workbook
}
