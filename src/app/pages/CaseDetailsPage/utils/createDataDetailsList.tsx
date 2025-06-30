import { RouterLink } from "app/components"
import { formatDate } from "app/utils/dates"

function createDataDetailsList(data?: Components.Schemas.Case) {
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
    { term: "Aanvraag", details: data?.application_type }
  ]

  if (data?.application_type === "Advies" && data?.advice_type) {
    dataDetailsList.push({
      term: "Adviestype",
      details: data?.advice_type
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

  if (data?.legacy_id) {
    dataDetailsList.push({
      term: "Dossiernummer (Excel)",
      details: `${data.legacy_id}`
    })
  }

  dataDetailsList.push({ term: "Status", details: data?.status })

  return dataDetailsList
}

export default createDataDetailsList
