import { Descriptions } from "app/components"


type Props = {
  hoa: Components.Schemas.HomeownerAssociation
}

export const HoaDescription: React.FC<Props> = ({ hoa }) => {
  if (hoa?.id) {
    const items = [
      { label: "Vve statutaire naam", value: hoa?.name },
      { label: "Postcode", value: hoa?.zip_code },
      { label: "Wijk", value: hoa?.wijk },
      { label: "Buurt", value: hoa?.neighborhood },
      { label: "Stadsdeel", value: hoa?.district },
      { label: "Bouwjaar", value: hoa?.build_year },
      { label: "Aantal woningen", value: hoa?.number_of_appartments },
      { label: "Monument status", value: hoa?.monument_status ?? "-" },
      { label: "Beschermd stadsdorpsgezicht", value: hoa?.beschermd_stadsdorpsgezicht ?? "-" },
      { label: "Ligt in beschermd gebied", value: hoa?.ligt_in_beschermd_gebied ?? "-" }
    ]
    return (
      <Descriptions items={ items } />
    )
  }
  return null
}

export default HoaDescription
    