import { Descriptions } from "app/components"


type Props = {
  hoa: Components.Schemas.HomeownerAssociation
}

const capitalizeFirstLetter = (value?: string | null, fallback: string = "-"): string => {
  if (typeof value === "string" && value.length > 0) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  return fallback
}

export const HoaDescription: React.FC<Props> = ({ hoa }) => {
  if (hoa?.id) {
    const items = [
      { label: "Vve statutaire naam", value: hoa?.name },
      { label: "Postcode", value: hoa?.zip_code },
      { label: "Wijk", value: hoa?.wijk },
      { label: "Buurt", value: hoa?.neighborhood },
      { label: "Prioriteitsbuurt", value: hoa?.is_priority_neighborhood ? "Ja" : "Nee" },
      { label: "Stadsdeel", value: hoa?.district },
      { label: "Bouwjaar", value: hoa?.build_year },
      { label: "Aantal woningen", value: hoa?.number_of_appartments },
      { label: "Monument status", value: capitalizeFirstLetter(hoa?.monument_status) },
      { label: "Beschermd stadsdorpsgezicht", value: capitalizeFirstLetter(hoa?.beschermd_stadsdorpsgezicht) },
      { label: "Ligt in beschermd gebied", value: capitalizeFirstLetter(hoa?.ligt_in_beschermd_gebied) }
    ]
    return (
      <Descriptions items={items} />
    )
  }
  return null
}

export default HoaDescription
