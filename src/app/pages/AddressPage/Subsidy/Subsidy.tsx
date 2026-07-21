import React from "react"
import { Descriptions } from "app/components"
import { Heading } from "@amsterdam/design-system-react"

type Props = {
  data?: Components.Schemas.SubsidyItem[]
}

const formatCurrency = (value?: string | null): string => {
  if (value === null || value === undefined) return "-"
  const number = parseFloat(value)
  if (isNaN(number)) return "-"
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR"
  }).format(number)
}

const formatDate = (value?: string | null): string => {
  if (!value) return "-"
  return new Date(value).toLocaleDateString("nl-NL")
}

const formatValue = (value?: string | number | null): string => {
  if (value === null || value === undefined || value === "") return "-"
  return String(value)
}

const Subsidy: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Geen subsidieaanvraag bekend</p>
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {data.map((item) => {
        const items = [
          { label: "Aanvrager", value: formatValue(item.aanvrager) },
          { label: "Regeling", value: formatValue(item.regelingnaam) },
          { label: "Beleidsterrein", value: formatValue(item.beleidsterrein) },
          {
            label: "Organisatieonderdeel",
            value: formatValue(item.organisatieonderdeel)
          },
          { label: "Projectnaam", value: formatValue(item.projectnaam) },
          {
            label: "Periodiciteit",
            value: formatValue(item.typePeriodiciteit)
          },
          { label: "Subsidiejaar", value: formatValue(item.subsidiejaar) },
          {
            label: "Bedrag aangevraagd",
            value: formatCurrency(item.bedragAangevraagd)
          },
          {
            label: "Bedrag verleend",
            value: formatCurrency(item.bedragVerleend)
          },
          {
            label: "Datum verleningsbesluit",
            value: formatDate(item.publicatiedatumVerleningsbesluit)
          },
          {
            label: "Bedrag vastgesteld",
            value: formatCurrency(item.bedragVastgesteld)
          },
          {
            label: "Datum vaststellingsbesluit",
            value: formatDate(item.publicatiedatumVaststellingsbesluit)
          },
          { label: "Datum overzicht", value: formatDate(item.datumOverzicht) }
        ]

        return (
          <div key={item.id} style={{ marginBottom: "3rem" }}>
            <Heading size="level-3" level={3} style={{ marginBottom: "1rem" }}>
              Subsidieaanvraag {item.dossiernummer}
            </Heading>
            <Descriptions items={items} />
          </div>
        )
      })}
    </div>
  )
}

export default Subsidy
