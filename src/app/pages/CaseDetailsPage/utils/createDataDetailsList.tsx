import { RouterLink } from "app/components"
import { formatDate } from "app/utils"

function createDataDetailsList(data?: components["schemas"]["Case"]) {
  const dataDetailsList = [
    {
      term: "Naam",
      details: (
        <RouterLink to={`/vve/${data?.homeowner_association?.id}`}>
          {data?.homeowner_association?.name}
        </RouterLink>
      )
    },
    { term: "Zaak ID", details: data?.prefixed_dossier_id },
    ...(data?.legacy_id
      ? [{ term: "Dossiernummer (Excel)", details: `${data.legacy_id}` }]
      : []),
    { term: "Aanvraag", details: data?.application_type },
    {
      term: "Aanvraagdatum",
      details: data?.request_date ? formatDate(data?.request_date) : "-"
    }
  ]

  if (data?.application_type === "Advies" && data?.advice_type) {
    dataDetailsList.push({
      term: "Adviestype",
      details: data?.advice_type
    })
  }
  if (data?.advisor?.name) {
    dataDetailsList.push({
      term: "Adviseur",
      details: data?.advisor?.name
    })
  }
  if (data?.advisor_assigned_at) {
    dataDetailsList.push({
      term: "Adviseur toegekend op",
      details: formatDate(data.advisor_assigned_at)
    })
  }

  if (data?.activation_team && data?.activation_team?.meeting_date) {
    dataDetailsList.push({
      term: "Soort bijeenkomst",
      details: data?.activation_team.type
    })
    dataDetailsList.push({
      term: "Datum bijeenkomst",
      details: formatDate(data?.activation_team.meeting_date)
    })
  }

  if (data?.end_date) {
    dataDetailsList.push({
      term: "Einddatum",
      details: formatDate(data.end_date)
    })
  }

  if (data?.result?.reason) {
    dataDetailsList.push({
      term: "Resultaat",
      details: data?.result?.reason
    })
  }

  dataDetailsList.push({ term: "Status", details: data?.status })

  if (data?.archived_at) {
    dataDetailsList.push({
      term: "Gearchiveerd op",
      details: formatDate(data?.archived_at)
    })
  }

  return dataDetailsList
}

export default createDataDetailsList
