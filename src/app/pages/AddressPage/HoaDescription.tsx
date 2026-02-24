import { Descriptions, RouterLink } from "app/components"

type Props = {
  hoa: Components.Schemas.HomeownerAssociation
}

const capitalizeFirstLetterOrFallback = (
  value?: string | number | null,
  fallback: string = "-"
): string => {
  if (value !== null && value !== undefined) {
    const stringValue = String(value) // Converteer naar string
    if (stringValue.length > 0) {
      return stringValue.charAt(0).toUpperCase() + stringValue.slice(1)
    }
  }
  return fallback
}

export const HoaDescription: React.FC<Props> = ({ hoa }) => {
  if (hoa?.id) {
    const items = [
      { label: "VvE statutaire naam", value: hoa?.name },
      {
        label: "KVK-nummer",
        value: capitalizeFirstLetterOrFallback(hoa?.kvk_nummer)
      },
      { label: "Postcode", value: hoa?.zip_code },
      { label: "Stadsdeel", value: hoa?.district },
      { label: "Wijk", value: hoa?.wijk },
      { label: "Buurt", value: hoa?.neighborhood },
      {
        label: "Prioriteitsbuurt",
        value: hoa?.is_priority_neighborhood ? "Ja" : "Nee"
      },
      { label: "Bouwjaar", value: hoa?.build_year },
      {
        label: "Aantal woningen",
        value: (
          <RouterLink to={`/vve/${hoa?.id}/woningen`}>
            {hoa?.number_of_apartments} woningen
          </RouterLink>
        )
      },
      {
        label: "Monument status",
        value: capitalizeFirstLetterOrFallback(hoa?.monument_status)
      },
      {
        label: "Beschermd stadsdorpsgezicht",
        value: capitalizeFirstLetterOrFallback(hoa?.beschermd_stadsdorpsgezicht)
      },
      {
        label: "Ligt in beschermd gebied",
        value: capitalizeFirstLetterOrFallback(hoa?.ligt_in_beschermd_gebied)
      }
    ]
    return <Descriptions items={items} />
  }
  return null
}

export default HoaDescription
