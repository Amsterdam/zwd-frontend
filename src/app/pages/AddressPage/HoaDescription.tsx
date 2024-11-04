import { Descriptions } from "app/components"


type Props = {
  hoa: Components.Schemas.HomeownerAssociation
}

export const HoaDescription: React.FC<Props> = ({ hoa }) => {
  if (hoa?.id) {
    const items = [
      { label: "VVE statutaire naam", children: hoa?.name },
      { label: "Postcode", children: hoa?.zip_code },
      { label: "Buurt", children: hoa?.neighborhood },
      { label: "Stadsdeel", children: hoa?.district },
      { label: "Bouwjaar", children: hoa?.build_year },
      { label: "Aantal woningen", children: hoa?.number_of_appartments }
    ]
    return (
      <Descriptions items={ items } />
    )
  }
  return null
}

export default HoaDescription
    